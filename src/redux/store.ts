import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import {persistReducer,
   FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from './storage';
import { couponMiddleware } from './middlewares/coupon.middleware';


const persistedOptions={
  key:'cart',
  storage
}
const persistedCart = persistReducer(persistedOptions, cartReducer)
export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: persistedCart,
    },
    middleware:(getDefaultMiddlewares:any)=>getDefaultMiddlewares({serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },}).concat(couponMiddleware)
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']