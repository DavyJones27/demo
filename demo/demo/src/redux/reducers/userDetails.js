import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    details: {},
    error: false,
    loading: true,
};

const detailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {
        add(state, action) {
            state.details = action.payload;
            state.loading = false;
            state.error = false;
            state.isUpdated = true;
        },
        setLoading(state) {
            state.loading = true;
        },
        setError(state) {
            state.error = true;
            state.loading = false;
        },
        clear() {
            return initialState;
        },
    }
});

export const { add,
    setLoading,
    setError,
    clear } = detailsSlice.actions;
export default detailsSlice.reducer;
