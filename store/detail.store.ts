import { DamageRequestProps } from "@/util/typeDefs";
import { create } from "zustand";

interface CurrentRequestState {
  current: DamageRequestProps;
  setCurrent: (request: DamageRequestProps) => void;
}

const useCurrentRequestState = create<CurrentRequestState>()((set) => ({
  current: {
    state: "edit",
    containerNumber: "",
    vendorShop: "",
    estimatedPeriod: "",
    location: { latitude: 0, longitude: 0 },
    createdAt: new Date(),
    images: [],
  },
  setCurrent: (request) => set({ current: request }),
}));

export { useCurrentRequestState };
