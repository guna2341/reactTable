import { create } from "zustand";
import { contentUnits } from "../../utils/admin";

export const useContentStore = create((set, get) => ({
    content: contentUnits,
}));