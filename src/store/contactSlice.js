import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	name: '',
	email: '',
	phone: '',
	projectType: 'website',
	message: '',
	status: 'idle', // 'idle' | 'pending' | 'success' | 'error'
};

const contactSlice = createSlice({
	name: 'contact',
	initialState,
	reducers: {
		setField: (state, action) => {
			const { field, value } = action.payload;
			if (field !== 'status') {
				state[field] = value;
			}
		},
		setStatus: (state, action) => {
			state.status = action.payload;
		},
		resetForm: () => {
			return initialState;
		},
	},
});

export const { setField, setStatus, resetForm } = contactSlice.actions;
export default contactSlice.reducer;
