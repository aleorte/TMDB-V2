import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getFavorites = createAsyncThunk(
  "GET_FAVORITES",
  async (userId) => {
    const favorites = await axios.get(
      `http://localhost:3001/api/favorite/${userId}`
    );
    return favorites;
  }
);

export const addFavorites = createAsyncThunk("ADD_FAVORITES", async (fav) => {
  const favorites = await axios.post(
    `http://localhost:3001/api/favorite/add`,
    fav
  );
  return favorites;
});

export const deleteFavorites = createAsyncThunk(
  "DELETE_FAVORITES",
  async (remove) => {
    await axios.delete(
      `http://localhost:3001/api/favorite/remove/${remove.userId}/${remove.movieId}`,
    );
  }
);

const favoriteReducer = createReducer([], {
  [getFavorites.fulfilled]: (state, action) => {return action.payload.data},
  [addFavorites.fulfilled]: (state, action) => state,
  [deleteFavorites.fulfilled]: (state, action) => state,
});

export default favoriteReducer;
