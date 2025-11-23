import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connection",
    initialState: [],
    reducers: {
        addConnections: (state, action) => action.payload,
        removeConnections: (state, action) => {
            const newConnection = state.filter(user => user._id !== action.payload);
            return newConnection;
        }
    }
});

export const { addConnections, removeConnections } = connectionSlice.actions;
export default connectionSlice.reducer;