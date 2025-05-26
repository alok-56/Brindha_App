import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingIndex = state.cartItems.findIndex(i => i._id === item._id);

            if (existingIndex >= 0) {
                state.cartItems[existingIndex].quantity += 1;
            } else {
                state.cartItems.push({ ...item, quantity: 1 });
            }
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(i => i._id !== action.payload);
        },

        updateQuantity: (state, action) => {
            const { _id, quantity } = action.payload;
            const itemIndex = state.cartItems.findIndex(i => i._id === _id);
            if (itemIndex >= 0 && quantity >= 1) {
                state.cartItems[itemIndex].quantity = quantity;
            }
        },

        clearCart: (state) => {
            state.cartItems = [];
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
