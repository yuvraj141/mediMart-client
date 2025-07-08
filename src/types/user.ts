export interface IUser {
    userId: string;
    name: string;
    email: string;
    isActive?: boolean;
    role: "customer" | "admin"|'superAdmin';
    iat?: number;
    exp?: number;
  }
  