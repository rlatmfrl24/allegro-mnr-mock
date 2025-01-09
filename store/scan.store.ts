import { create } from "zustand";

interface ScanImageState {
  scanImage: string | ImageData | null;
  createdAt: Date | null;
  location: {
    latitude: number | null;
    longitude: number | null;
  };
  setScanImage: (image: string | ImageData) => void;
  setLocation: (latitude: number, longitude: number) => void;
  setCreatedAt: (date: Date) => void;
  resetScanImage: () => void;
}

interface UploadImageListState {
  uploadImageList: string[];
  setUploadImageList: (imageList: string[]) => void;
  resetUploadImageList: () => void;
}

const useScanImageState = create<ScanImageState>((set) => ({
  scanImage: null,
  createdAt: null,
  location: {
    latitude: null,
    longitude: null,
  },
  setLocation: (latitude, longitude) =>
    set({ location: { latitude, longitude } }),
  setCreatedAt: (date) => set({ createdAt: date }),
  setScanImage: (image) => set({ scanImage: image }),
  resetScanImage: () => set({ scanImage: null }),
}));

const useUploadImageListState = create<UploadImageListState>((set) => ({
  uploadImageList: [],
  setUploadImageList: (imageList) => set({ uploadImageList: imageList }),
  resetUploadImageList: () => set({ uploadImageList: [] }),
}));

export { useScanImageState, useUploadImageListState };
