interface IProduct extends Document {
  id: number;
  photo: string;
  name: string;
  suppliers: string;
  stock: string;
  price: string;
  category: string;
}

export { IProduct };
