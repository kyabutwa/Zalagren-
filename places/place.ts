export type PlaceType =
  | "SITE"
  | "PROPERTY"
  | "ESTATE"
  | "CAMPUS"
  | "BUILDING"
  | "UNIT"
  | "PUBLIC_SPACE"
  | "SERVICE_LOCATION"
  | "OTHER";

export type PlaceStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "CLOSED";

export interface Place {
  id: string;
  placeType: PlaceType;
  name: string;
  status: PlaceStatus;
  parentPlaceId?: string;
  communityId?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePlaceInput {
  id: string;
  placeType: PlaceType;
  name: string;
  parentPlaceId?: string;
  communityId?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  createdAt?: string;
}

export function createPlace(input: CreatePlaceInput): Place {
  if (!input.id.trim()) throw new Error("Place id is required");
  if (!input.name.trim()) throw new Error("Place name is required");
  if (!Number.isFinite(input.latitude ?? 0) && input.latitude !== undefined)
    throw new Error("Place latitude must be finite");
  if (!Number.isFinite(input.longitude ?? 0) && input.longitude !== undefined)
    throw new Error("Place longitude must be finite");

  const now = input.createdAt ?? new Date().toISOString();
  return { ...input, status: "ACTIVE", createdAt: now, updatedAt: now };
}

export function closePlace(place: Place, at = new Date().toISOString()): Place {
  return { ...place, status: "CLOSED", updatedAt: at };
}
