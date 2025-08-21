export interface IOrder {
  orderedProducts: IOrderProduct[];
  coupon?: string;
  shippingAddress: string;
  paymentMethod: string;
}

export interface IOrderProduct {
  product: string;
  quantity: number;
}

export interface ICoupon{
  couponCode: string,
  subTotal: number
}
