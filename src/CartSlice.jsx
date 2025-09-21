// CartSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // [{ id, name, image, cost, quantity }]
  },
  reducers: {
    addItem: (state, action) => {
      const { id, name, image, cost } = action.payload;
      const identifier = id ?? name;
      const existingItem = state.items.find(
        (item) => (item.id ?? item.name) === identifier
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ id, name, image, cost, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      // action.payload puede traer { id } o { name }
      const { id, name } = action.payload;
      if (id !== undefined) {
        state.items = state.items.filter((item) => item.id !== id);
      } else if (name !== undefined) {
        state.items = state.items.filter((item) => item.name !== name);
      }
    },
    updateQuantity: (state, action) => {
      const { name, quantity, id } = action.payload;
      const identifier = id ?? name;
      const itemToUpdate = state.items.find(
        (item) => (item.id ?? item.name) === identifier
      );
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        if (itemToUpdate.quantity < 1) itemToUpdate.quantity = 1;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;