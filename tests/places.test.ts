import {
  activatePhase,
  closeBuilding,
  closePlace,
  closeUnit,
  createBuilding,
  createPhase,
  createPlace,
  createUnit,
} from "../places";

describe("places domain", () => {
  it("creates a place", () => {
    const place = createPlace({ id: "site-1", placeType: "SITE", name: "Tsavo" });
    expect(place.status).toBe("ACTIVE");
  });

  it("creates and activates a phase", () => {
    const phase = createPhase({ id: "phase-1", placeId: "site-1", name: "Phase 1", sequence: 1 });
    expect(activatePhase(phase).status).toBe("ACTIVE");
  });

  it("creates a building within a phase", () => {
    const building = createBuilding({
      id: "building-1",
      placeId: "site-1",
      phaseId: "phase-1",
      name: "Building A",
    });
    expect(building.phaseId).toBe("phase-1");
  });

  it("creates a unit without making it a participant", () => {
    const unit = createUnit({
      id: "unit-42",
      placeId: "site-1",
      buildingId: "building-1",
      phaseId: "phase-1",
      name: "Unit 42",
    });
    expect(unit.status).toBe("PLANNED");
  });

  it("preserves identity when physical entities close", () => {
    const place = createPlace({ id: "site-1", placeType: "SITE", name: "Tsavo" });
    const building = createBuilding({ id: "building-1", placeId: "site-1", name: "Building A" });
    const unit = createUnit({ id: "unit-42", placeId: "site-1", buildingId: "building-1", name: "Unit 42" });

    expect(closePlace(place).id).toBe("site-1");
    expect(closeBuilding(building).id).toBe("building-1");
    expect(closeUnit(unit).id).toBe("unit-42");
  });

  it("rejects invalid phase sequencing", () => {
    expect(() =>
      createPhase({ id: "phase-1", placeId: "site-1", name: "Phase 1", sequence: 0 }),
    ).toThrow();
  });
});
