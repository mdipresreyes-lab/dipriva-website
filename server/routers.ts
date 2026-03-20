import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createLead, updateLeadGhlStatus } from "./db";
import { ENV } from "./_core/env";

// GHL API integration
const GHL_LOCATION_ID = "sAdThi71k3Nkr8LGM8P9";
const GHL_API_ENDPOINT = "https://rest.gohighlevel.com/v2/contacts";

async function submitToGHL(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  primaryChallenge: string;
}) {
  if (!ENV.ghlPitToken) {
    console.warn("[GHL] PIT token not configured");
    return null;
  }

  try {
    const payload = {
      locationId: GHL_LOCATION_ID,
      contact: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        customField: {
          primary_challenge: data.primaryChallenge,
          brand_interest: "Dipriva Consulting Group",
        },
      },
      source: "Dipriva High-Fidelity Web Portal",
      tags: ["Lead", "High-End UX", "2026_Campaign"],
    };

    const response = await fetch(GHL_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ENV.ghlPitToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[GHL] API error:", errorData);
      return null;
    }

    const result = await response.json();
    return result.contact?.id || null;
  } catch (error) {
    console.error("[GHL] Submission failed:", error);
    return null;
  }
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  leads: router({
    submitForm: publicProcedure
      .input(
        z.object({
          firstName: z.string().min(1, "First name is required"),
          lastName: z.string().min(1, "Last name is required"),
          email: z.string().email("Invalid email address"),
          phone: z.string().min(1, "Phone is required"),
          primaryChallenge: z.string().min(1, "Primary challenge is required"),
        })
      )
      .mutation(async ({ input }) => {
        try {
          // Create lead in database first (Supabase fallback)
          const leadResult = await createLead({
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            phone: input.phone,
            primaryChallenge: input.primaryChallenge,
            ghlStatus: "pending",
          });

          const leadId = (leadResult as any).insertId || 0;

          // Attempt GHL submission
          const ghlContactId = await submitToGHL(input);

          // Update lead with GHL status
          if (ghlContactId && leadId) {
            await updateLeadGhlStatus(leadId, ghlContactId, "success");
          } else if (leadId) {
            await updateLeadGhlStatus(leadId, "", "fallback");
          }

          return {
            success: true,
            leadId,
            ghlContactId: ghlContactId || null,
            message: ghlContactId
              ? "Lead submitted successfully to GHL"
              : "Lead saved locally (GHL submission failed)",
          };
        } catch (error) {
          console.error("[Leads] Form submission error:", error);
          throw new Error("Failed to process form submission");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
