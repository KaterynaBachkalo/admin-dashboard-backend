interface IProduct extends Document {
  id: number;
  photo: string;
  name: string;
  suppliers: string;
  stock: string;
  price: string;
  category: string;
}

interface ISupplier {
  name: string;
  address: string;
  suppliers: string;
  date: string;
  amount: string;
  status: string;
}

export { IProduct, ISupplier };
