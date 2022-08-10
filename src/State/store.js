import {configureStore} from "@reduxjs/toolkit"
import logger from "redux-logger"
import favoriteReducer from "./favorite"
import userReducer from "./user"


const store=configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(logger),
    reducer:{
        user: userReducer,
        favorite:favoriteReducer
    }
})

export default store