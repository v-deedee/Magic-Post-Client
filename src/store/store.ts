import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import CtPTransactionReducer from "./slices/CtPTransactionSlide"


const store = configureStore({
    reducer: {
        counter: counterReducer,
        CtPTransaction: CtPTransactionReducer
    }
})

export default store