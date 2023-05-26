import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Checklist, Checklists } from "core/types";

import checklistsData from "./checklists.json";

export type CoreState = {
	sidebarVisibility: boolean;
	checklistsData: Checklists;
	currentChecklist: Checklist | null;
}

const initialState: CoreState = {
	sidebarVisibility: false,
	checklistsData: checklistsData,
	currentChecklist: null,
};

export const coreSlice = createSlice({
	name: "core",
	initialState,
	reducers: {
		toggleSidebarVisibility: (state) => {
			state.sidebarVisibility = !state.sidebarVisibility;
		},
		setCurrentChecklist: (state, action: PayloadAction<Checklist>) => {
			state.currentChecklist = action.payload;
		},
	},
});

export const {
	toggleSidebarVisibility,
	setCurrentChecklist,
} = coreSlice.actions;
export default coreSlice.reducer;
