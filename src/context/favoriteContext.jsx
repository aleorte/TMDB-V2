import { createContext, useState } from 'react';
import React from "react"


const favoriteContextdefault = [];

  export const favoriteContext = createContext(favoriteContextdefault);

  const FavoriteContextProvider = ({ children }) => {
    const [favoriteMovies,setFavoriteMovies] = useState([])
  
      return (
        <favoriteContext.Provider value={{ favoriteMovies, setFavoriteMovies }}>
          {children}
        </favoriteContext.Provider>
      );
  };
        

export default FavoriteContextProvider