export interface RequestProductsInterface {
  _id: string;
  state: string;
  dateTime: string;
  route: string;
  products: Product[];
  __v: number;
  assignedQuantity?: number;
}

export interface ProductInRequestProductsInterface {
  assignedQuantity: number;
  product: string;
  amount: number;
  amountCurrent: number;
  unitPrice: number, 
  priceSold: number 
  _id: string;
}
