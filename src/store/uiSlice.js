import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	navScrolled: false,
	menuOpen: false,
	activeSection: 'home',
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setNavScrolled: (state, action) => {
			state.navScrolled = action.payload;
		},
		setMenuOpen: (state, action) => {
			state.menuOpen = action.payload;
		},
		setActiveSection: (state, action) => {
			state.activeSection = action.payload;
		},
	},
});

export const { setNavScrolled, setMenuOpen, setActiveSection } = uiSlice.actions;
export default uiSlice.reducer;
