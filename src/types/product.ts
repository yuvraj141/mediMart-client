export type TProduct={
  _id:string
  name: string;
  brand: {
      _id: string;
      name: string;
    };
  category: {
      _id: string;
      name: string;
    };
  description: string;
  price: number;
  offerPrice: number;
  stock: number;
  images: string[]; 
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
};