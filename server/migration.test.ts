import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";
import { ENV } from "./_core/env";

describe("GHL CRM Removal - Phase 21 Migration", () => {
  it("should NOT have ghlPitToken in ENV schema", () => {
    expect("ghlPitToken" in ENV).toBe(false);
  });

  it("should NOT have a leads router on appRouter", () => {
    // The appRouter should only have system and auth
    const routerKeys = Object.keys((appRouter as any)._def.procedures);
    const hasLeads = routerKeys.some((key) => key.startsWith("leads"));
    expect(hasLeads).toBe(false);
  });

  it("should still have auth.me and auth.logout procedures", () => {
    const routerKeys = Object.keys((appRouter as any)._def.procedures);
    expect(routerKeys).toContain("auth.me");
    expect(routerKeys).toContain("auth.logout");
  });

  it("should still have system router procedures", () => {
    const routerKeys = Object.keys((appRouter as any)._def.procedures);
    const hasSystem = routerKeys.some((key) => key.startsWith("system"));
    expect(hasSystem).toBe(true);
  });
});
