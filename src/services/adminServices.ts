import { Product } from "../models/productModel";
import { Customer } from "../models/customerModel";
import { Supplier } from "../models/supplierModel";
import { Incomeexpense } from "../models/incomeExpenses";
import { Order } from "../models";
import { IProduct, ISupplier } from "../types";

interface QueryParams {
  name?: string;
  page?: number;
  limit?: number;
}

// PAGINATION FEATURE =============================
const pagination = (dbQuery: any, query: QueryParams) => {
  const limit = 5;

  const paginationPage = query.page ? +query.page : 1;
  const paginationLimit = query.limit ? +query.limit : limit;
  const docsToSkip = (paginationPage - 1) * paginationLimit;
  dbQuery.skip(docsToSkip).limit(paginationLimit);
};

const getData = async (query: QueryParams) => {
  // INIT DB QUERY ================================
  const productsQuery = Product.find();
  const customersQuery = Customer.find().sort({ id: -1 });
  const suppliersQuery = Supplier.find();
  const incomeExpensesQuery = Incomeexpense.find().sort({ id: -1 });

  const products = await productsQuery;

  const totalProducts = await Product.countDocuments();

  const customers = await customersQuery;

  const totalCustomers = await Customer.countDocuments();

  const suppliers = await suppliersQuery;

  const totalSuppliers = await Supplier.countDocuments();

  const incomeExpenses = await incomeExpensesQuery;

  return {
    products,
    totalProducts,
    customers,
    totalCustomers,
    suppliers,
    totalSuppliers,
    incomeExpenses,
  };
};

const getOrders = async (query: QueryParams) => {
  // SEARCH FEATURE =====================================

  const findOptions =
    typeof query.name === "string" && query.name.trim() !== ""
      ? {
          name: new RegExp(query.name, "i"), // Case-insensitive partial search
        }
      : {};

  const ordersQuery = Order.find(findOptions).sort({ id: -1 });

  pagination(ordersQuery, query);

  const orders = await ordersQuery;

  const total = await Order.countDocuments(findOptions);

  return {
    orders,
    total,
  };
};

const getProducts = async (query: QueryParams) => {
  // SEARCH FEATURE =====================================

  const findOptions =
    typeof query.name === "string" && query.name.trim() !== ""
      ? {
          name: new RegExp(query.name, "i"), // Case-insensitive partial search
        }
      : {};

  const productsQuery = Product.find(findOptions).sort({ id: -1 });

  pagination(productsQuery, query);

  const products = await productsQuery;

  const total = await Product.countDocuments(findOptions);

  return {
    products,
    total,
  };
};

const getSuppliers = async (query: QueryParams) => {
  // SEARCH FEATURE =====================================

  const findOptions =
    typeof query.name === "string" && query.name.trim() !== ""
      ? {
          name: new RegExp(query.name, "i"), // Case-insensitive partial search
        }
      : {};

  const suppliersQuery = Supplier.find(findOptions).sort({ id: -1 });

  pagination(suppliersQuery, query);

  const suppliers = await suppliersQuery;

  const total = await Supplier.countDocuments(findOptions);

  return {
    suppliers,
    total,
  };
};

const getCustomers = async (query: QueryParams) => {
  // SEARCH FEATURE =====================================

  const findOptions =
    typeof query.name === "string" && query.name.trim() !== ""
      ? {
          name: new RegExp(query.name, "i"), // Case-insensitive partial search
        }
      : {};

  const customersQuery = Customer.find(findOptions).sort({ id: -1 });

  pagination(customersQuery, query);

  const customers = await customersQuery;

  const total = await Customer.countDocuments(findOptions);

  return {
    customers,
    total,
  };
};

const createProduct = async (productData: IProduct) => {
  return Product.create({
    ...productData,
  });
};

const createSupplier = (supplierData: ISupplier) => {
  return Supplier.create({
    ...supplierData,
  });
};

export default {
  getData,
  getOrders,
  getProducts,
  getSuppliers,
  getCustomers,
  createProduct,
  createSupplier,
};
