import { TProduct } from "@/types";
import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { addCoupon } from "@/services/cart";

export interface CartProduct extends TProduct {
  orderQuantity: number;
}

interface InitialState {
  products: CartProduct[];
  city: string;
  shippingAddress: string;
  coupon:{
    code:string,
    discountAmount:number,
    isLoading:boolean,
    error:string
  }
}

const initialState: InitialState = {
  products: [],
  city: "",
  shippingAddress: "",
   coupon:{
    code:'',
    discountAmount:0,
    isLoading:false,
    error:''
  }
};
// First, create the thunk
export const fetchCoupon = createAsyncThunk(
  'cart/fetchCoupon',
  async ({
    couponCode,
    subTotal,
  }: {
    couponCode: string;
    subTotal: number;
   
  }) => {
   try {
    const res=await addCoupon(couponCode,subTotal)
    if(!res.success){
      throw new Error(res.message)
    }
    return res
   } catch (error:any) {
    throw new Error(error.message)
   }
  },
)
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      //checking if the product is already in cart
      const productToAdd = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (productToAdd) {
        productToAdd.orderQuantity += 1;
        return;
      }

      state.products.push({ ...action.payload, orderQuantity: 1 });
    },


    incrementOrderQuantity: (state, action) => {
      const productToIncrement = state.products.find(
        (product) => product._id === action.payload
      );

      if (productToIncrement) {
        productToIncrement.orderQuantity += 1;
        return;
      }
    },
    decrementOrderQuantity: (state, action) => {
      const productToIncrement = state.products.find(
        (product) => product._id === action.payload
      );

      if (productToIncrement && productToIncrement.orderQuantity > 1) {
        productToIncrement.orderQuantity -= 1;
        return;
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    updateCity: (state, action) => {
      state.city = action.payload;
    },
    updateShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    clearCart: (state) => {
      state.products = [];
      state.city = "";
      state.shippingAddress = "";
    },
  },
    extraReducers: (builder) => {
      // /pending
    builder.addCase(fetchCoupon.pending, (state, action) => {
 state.coupon.isLoading=true
      state.coupon.error=''
console.log('for pending :',action);
    })
//rejected
    builder.addCase(fetchCoupon.rejected, (state, action) => {
 state.coupon.isLoading=false
      state.coupon.error=action.error.message as string
state.coupon.code=''
state.coupon.discountAmount=0
console.log('for rejected :',action);
    })
   //fulfilled 
    builder.addCase(fetchCoupon.fulfilled, (state, action) => {
      state.coupon.isLoading=false
      state.coupon.error=''
state.coupon.code=action.payload.data.coupon.code
state.coupon.discountAmount=action.payload.data.discountAmount
console.log('for fulfilled :',action);
    })
  },
});

//* Products

export const orderedProductsSelector = (state: RootState) => {
  return state.cart.products
};

export const orderSelector = (state: RootState) => {
  return {
    //returning object
    orderedProducts: state.cart.products.map((product) => ({
      product: product._id,
      quantity: product.orderQuantity,
    })),
   
    shippingAddress: `${state.cart.shippingAddress} - ${state.cart.city}`,
    paymentMethod: "Online",
  };
};

//* Payment

export const subTotalSelector = (state: RootState) => {
  return state.cart.products.reduce((acc, product) => {
    if (product.offerPrice) {
      //console.log(product.offerPrice);
      return acc + product.offerPrice * product.orderQuantity;
    } else {
      //console.log(product.price, "Price");
      return acc + product.price * product.orderQuantity;
    }
  }, 0);
};

export const shippingCostSelector = (state: RootState) => {
  if (
    state.cart.city &&
    state.cart.city === "Dhaka" &&
    state.cart.products.length > 0
  ) {
    return 60;
  } else if (
    state.cart.city &&
    state.cart.city !== "Dhaka" &&
    state.cart.products.length > 0
  ) {
    return 120;
  } else {
    return 0;
  }
};

export const grandTotalSelector = (state: RootState) => {
  const subTotal = subTotalSelector(state);
  const shippingCost = shippingCostSelector(state);
 const discountAmount=discountAmountSelector(state)
  return subTotal-discountAmount + shippingCost;
};

//couponSelector
export const couponSelector=(state:RootState)=>{
  return state.cart.coupon
}
//discountSelector
export const discountAmountSelector=(state:RootState)=>{
  return state.cart.coupon.discountAmount
}

//* Address

export const citySelector = (state: RootState) => {
  return state.cart.city;
};

export const shippingAddressSelector = (state: RootState) => {
  return state.cart.shippingAddress;
};

export const {
  addProduct,
  incrementOrderQuantity,
  decrementOrderQuantity,
  removeProduct,
  updateCity,
  updateShippingAddress,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
