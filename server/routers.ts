import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createLead, updateLeadGhlStatus } from "./db";
import { ENV } from "./_core/env";

// GHL Configuration
const GHL_LOCATION_ID = "sAdThi71k3Nkr8LGM8P9";
const GHL_API_ENDPOINT = "https://services.leadconnectorhq.com/contacts/";
const GHL_API_VERSION = "2021-07-28";

/**
 * Submit contact to GHL
 * Returns the contact ID if successful, null if failed
 */
async function submitToGHL(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  primaryChallenge: string;
  preferredLanguage?: string;
}): Promise<string | null> {
  console.log("[GHL] ========== SUBMIT TO GHL ==========");
  console.log("[GHL] Contact:", { firstName: data.firstName, email: data.email });

  // Verify token exists
  if (!ENV.ghlPitToken) {
    console.error("[GHL] ❌ ERROR: GHL_PIT_TOKEN not configured in environment");
    return null;
  }

  console.log("[GHL] ✅ Token found, preparing request...");

  try {
    // Build payload
    const payload = {
      locationId: GHL_LOCATION_ID,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      source: "Dipriva High-Fidelity Web Portal",
      tags: [
        "Lead",
        "High-End UX",
        "2026_Campaign",
        data.preferredLanguage === "es" ? "Spanish" : "English",
      ],
    };

    console.log("[GHL] Payload:", JSON.stringify(payload, null, 2));

    // Make request
    console.log("[GHL] Sending POST to:", GHL_API_ENDPOINT);
    const response = await fetch(GHL_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ENV.ghlPitToken}`,
        Version: GHL_API_VERSION,
      },
      body: JSON.stringify(payload),
    });

    console.log("[GHL] Response status:", response.status);

    // Handle response
    const responseText = await response.text();
    console.log("[GHL] Response body:", responseText);

    if (!response.ok) {
      try {
        const errorData = JSON.parse(responseText);
        console.error("[GHL] ❌ API Error:", errorData);
      } catch {
        console.error("[GHL] ❌ API Error (non-JSON):", responseText);
      }
      return null;
    }

    // Parse success response
    const result = JSON.parse(responseText);
    console.log("[GHL] Full response:", JSON.stringify(result, null, 2));

    // Extract contact ID
    const contactId = result?.contact?.id;
    if (contactId) {
      console.log("[GHL] ✅ SUCCESS! Contact ID:", contactId);
      return contactId;
    } else {
      console.error("[GHL] ❌ ERROR: No contact ID in response");
      return null;
    }
  } catch (error) {
    console.error("[GHL] ❌ Exception:", error);
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
          preferredLanguage: z.enum(["en", "es"]).optional(),
        })
      )
      .mutation(async ({ input }) => {
        console.log("[LEADS] ========== FORM SUBMISSION ==========");
        console.log("[LEADS] Input:", {
          firstName: input.firstName,
          email: input.email,
          language: input.preferredLanguage,
        });

        try {
          // Step 1: Create lead in database
          console.log("[LEADS] Step 1: Creating lead in database...");
          const leadResult = await createLead({
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            phone: input.phone,
            primaryChallenge: input.primaryChallenge,
            preferredLanguage: input.preferredLanguage || "en",
            ghlStatus: "pending",
          });

          const leadId = (leadResult as any).insertId || 0;
          console.log("[LEADS] ✅ Lead created with ID:", leadId);

          // Step 2: Submit to GHL
          console.log("[LEADS] Step 2: Submitting to GHL...");
          const ghlContactId = await submitToGHL({
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            phone: input.phone,
            primaryChallenge: input.primaryChallenge,
            preferredLanguage: input.preferredLanguage || "en",
          });

          // Step 3: Update lead with GHL status
          console.log("[LEADS] Step 3: Updating lead status...");
          if (ghlContactId && leadId) {
            console.log("[LEADS] ✅ GHL submission successful, updating lead...");
            await updateLeadGhlStatus(leadId, ghlContactId, "success");
          } else if (leadId) {
            console.log("[LEADS] ⚠️  GHL submission failed, marking as fallback...");
            await updateLeadGhlStatus(leadId, "", "fallback");
          }

          // Step 4: Return response
          const response = {
            success: true,
            leadId,
            ghlContactId: ghlContactId || null,
            message: ghlContactId
              ? "Lead submitted successfully to GHL"
              : "Lead saved locally (GHL submission failed)",
          };

          console.log("[LEADS] ✅ FINAL RESPONSE:", response);
          return response;
        } catch (error) {
          console.error("[LEADS] ❌ Form submission error:", error);
          throw new Error("Failed to process form submission");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
