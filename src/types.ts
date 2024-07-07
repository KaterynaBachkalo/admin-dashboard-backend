interface IProduct extends Document {
  id: number;
  photo: string;
  name: string;
  suppliers: string;
  stock: string;
  price: string;
  category: string;
}

interface ICustomer extends Document {
  id: number;
  photo: string;
  name: string;
  email: string;
  spent: string;
  phone: string;
  address: string;
  register_date: string;
}

interface ISupplier extends Document {
  name: string;
  address: string;
  suppliers: string;
  date: string;
  amount: string;
  status: string;
  id: number;
}

interface IIncomeExpense extends Document {
  id: number;
  name: string;
  amount: string;
  type: string;
}

interface IOrder extends Document {
  id: number;
  photo: string;
  name: string;
  address: string;
  products: string;
  price: string;
  status: string;
  order_date: string;
}

export { IProduct, ICustomer, IOrder, IIncomeExpense, ISupplier };
