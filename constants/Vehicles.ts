export const USER_PLATE = "ABC1234"; // hard-coded demo plate for the owner

export type VehicleRecord = {
  plate: string;
  vehicleId?: string;
  owner?: string;
  coverage: "personal" | "commercial" | "unknown";
  verified: boolean;
};

export const DUMMY_VEHICLES: VehicleRecord[] = [
  { plate: USER_PLATE, vehicleId: "VIN-DEMO-0001", owner: "You", coverage: "personal", verified: true },
  { plate: "JFK1029", vehicleId: "VIN-XYZ-9102", owner: "Alex", coverage: "commercial", verified: true },
  { plate: "SUN7777", vehicleId: "VIN-AAA-2222", owner: "Jordan", coverage: "personal", verified: false },
  { plate: "CITY123", vehicleId: "VIN-BBB-3333", owner: "Transit Co.", coverage: "commercial", verified: true },
];

export function findVehicleByPlate(plate: string): VehicleRecord | undefined {
  const normalized = (plate || "").trim().toUpperCase();
  return DUMMY_VEHICLES.find(v => v.plate.toUpperCase() === normalized);
}


