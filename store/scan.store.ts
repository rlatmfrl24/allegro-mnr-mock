import { create } from "zustand";

interface ScanImageState {
  scanImage: string | ImageData | null;
  setScanImage: (image: string | ImageData) => void;
  resetScanImage: () => void;
}

interface UploadImageListState {
  uploadImageList: string[];
  setUploadImageList: (imageList: string[]) => void;
  resetUploadImageList: () => void;
}

const useScanImageState = create<ScanImageState>((set) => ({
  scanImage: null,
  setScanImage: (image) => set({ scanImage: image }),
  resetScanImage: () => set({ scanImage: null }),
}));

const useUploadImageListState = create<UploadImageListState>((set) => ({
  uploadImageList: [],
  setUploadImageList: (imageList) => set({ uploadImageList: imageList }),
  resetUploadImageList: () => set({ uploadImageList: [] }),
}));

export { useScanImageState, useUploadImageListState };
