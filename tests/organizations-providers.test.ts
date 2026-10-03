import {
  closeOrganization,
  createOrganization,
} from "../organizations";
import {
  activateProvider,
  createProvider,
  suspendProvider,
} from "../providers";

describe("organizations and providers domains", () => {
  it("creates an active organization", () => {
    const organization = createOrganization({
      id: "org-1",
      name: "Provider Organization",
      organizationType: "COMPANY",
    });
    expect(organization.status).toBe("ACTIVE");
  });

  it("preserves organization identity when closed", () => {
    const organization = createOrganization({
      id: "org-1",
      name: "Provider Organization",
      organizationType: "COMPANY",
    });
    expect(closeOrganization(organization).id).toBe("org-1");
  });

  it("requires a backing participant or organization for a provider", () => {
    expect(() =>
      createProvider({
        id: "provider-1",
        name: "Unbacked Provider",
        providerType: "INDIVIDUAL",
      }),
    ).toThrow();
  });

  it("supports an individual provider lifecycle", () => {
    const provider = createProvider({
      id: "provider-1",
      name: "Individual Provider",
      providerType: "INDIVIDUAL",
      participantId: "participant-1",
    });
    expect(provider.status).toBe("ONBOARDING");
    expect(activateProvider(provider).status).toBe("ACTIVE");
    expect(suspendProvider(activateProvider(provider)).status).toBe("SUSPENDED");
  });

  it("supports an organization-backed provider", () => {
    const provider = createProvider({
      id: "provider-2",
      name: "Organization Provider",
      providerType: "ORGANIZATION",
      organizationId: "org-1",
    });
    expect(provider.organizationId).toBe("org-1");
  });
});
