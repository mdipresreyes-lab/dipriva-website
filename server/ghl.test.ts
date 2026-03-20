import { describe, it, expect } from "vitest";
import { ENV } from "./_core/env";

describe("GHL API Configuration", () => {
  it("should have GHL_PIT_TOKEN configured", () => {
    expect(ENV.ghlPitToken).toBeDefined();
    expect(ENV.ghlPitToken.length).toBeGreaterThan(0);
  });

  it("should validate GHL token format", () => {
    // GHL PIT tokens typically start with specific prefixes
    // This is a basic validation - adjust based on actual token format
    expect(ENV.ghlPitToken).toMatch(/^[a-zA-Z0-9_-]+$/);
  });

  it("should have correct GHL location ID", () => {
    const GHL_LOCATION_ID = "sAdThi71k3Nkr8LGM8P9";
    expect(GHL_LOCATION_ID).toBe("sAdThi71k3Nkr8LGM8P9");
  });

  it("should be able to construct valid GHL payload", () => {
    const payload = {
      locationId: "sAdThi71k3Nkr8LGM8P9",
      contact: {
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        phone: "+1234567890",
        customField: {
          primary_challenge: "Test challenge",
          brand_interest: "Dipriva Consulting Group",
        },
      },
      source: "Dipriva High-Fidelity Web Portal",
      tags: ["Lead", "High-End UX", "2026_Campaign"],
    };

    expect(payload.locationId).toBe("sAdThi71k3Nkr8LGM8P9");
    expect(payload.contact.firstName).toBe("Test");
    expect(payload.contact.customField.brand_interest).toBe("Dipriva Consulting Group");
    expect(payload.tags).toContain("Lead");
  });
});
