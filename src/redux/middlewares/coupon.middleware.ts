import {Store,Dispatch,Action} from '@reduxjs/toolkit'
import { addProduct, decrementOrderQuantity, fetchCoupon, incrementOrderQuantity, removeProduct, subTotalSelector } from '../features/cartSlice'
import { RootState } from '../store'
//updating coupons when new product is added.it will be used in store   
export const couponMiddleware=(store:Store)=>(next:Dispatch)=>(action:Action)=>{
    //while adding new products it will recalculate the price for coupon
if(action.type===addProduct.type ||
    action.type===incrementOrderQuantity.type||
    action.type===decrementOrderQuantity.type||
    action.type===removeProduct.type
){
    next(action)
    const state:RootState=store.getState()
    const subTotal=subTotalSelector(state)
    store.dispatch(fetchCoupon({ couponCode: state.cart.coupon.code,
     subTotal: subTotal}) as unknown as Action)
}else{
    next(action)
}
// console.log(action);
  // next(action)
}