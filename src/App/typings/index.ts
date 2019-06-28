export interface NewProductInput {
  name: string;
  type: string;
  available?: boolean | null;
  price: number;
  imageUrl: string;
}
export interface NewOrderInput {
  productId: string;
  email: string;
  address: string;
  phone: string;
  facebook_profile: string;
  firstName: string;
  lastName: string;
  wilaya: string;
  city: string;
  quantity: number;
}