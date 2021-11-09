import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Date
  scalar Upload

  type Product {
    id: ID!
    barCode: String!
    productName: String!
    productPrice: Int!
    capitalPrice: Int!
    stock: Int!
    unit: String!
    purcaseDate: Date!
    imgSource: String!
  }

  type Rent {
    id: ID!
    rentName: String!
    rentPrice: Int!
    rentUserName: String!
    rentDownPayment: Int!
    rentStatus: Boolean!
    bookingDate: Date!
    rentDate: Date!
    rentDateEnd: Date!
    cashier: String!
  }

  type Purcase {
    id: ID!
    barCode: String!
    productName: String!
    productPrice: Int!
    capitalPrice: Int!
    stock: Int!
    unit: String!
    purcaseDate: Date!
    imgSource: String!
  }

  type ProductSelling {
    id: Int!
    productId: String!
    amountItems: Int!
    barCode: String!
    productName: String!
    productPrice: Int!
    capitalPrice: Int!
    imgProduct: String!
    unit: String!
    itemProfit: Int!
    transactionProfit: Int!
    transactionTotalPriceItem: Int!
  }

  type Selling {
    id: ID!
    date: Date!
    cash: Int!
    casier: String!
    change: Int!
    sellProduct: [ProductSelling!]!
    total: Int!
    totalItem: Int!
    totalProfit: Int!
    totalQty: Int!
  }

  type Expend {
    id: ID!
    expendName: String!
    expendValue: Int!
    expendDate: Date!
    expendType: String!
    description: String!
  }

  type Auth {
    id: ID!
    userName: String!
    passwordHash: String!
    loginType: String!
    salt: String!
    token: String
  }

  type Image {
    id: ID!
    imgName: String!
  }

  type File {
    imgName: String!
  }

  input SellingsInput {
    month: Int!
    year: Int!
  }

  input PurcaseReportInput {
    month: Int!
    year: Int!
  }

  input RentReportInput {
    month: Int!
    year: Int!
    day: Int!
  }
  input RentReportInput2 {
    month: Int!
    year: Int!
  }

  input ExpendReportInput {
    expendType: String!
    month: Int!
    year: Int!
  }

  input ExpendReportInput2 {
    month: Int!
    year: Int!
  }

  input UserPassInput {
    userName: String!
    password: String!
  }

  type Query {
    getAuth(userName: String!): Auth!
    getOneAuth(id: ID): Auth!
    getOneSelling(id: ID): Selling!
    getOneProduct(id: ID): Product!
    getOneRent(id: ID): Rent!
    getOneExpend(id: ID): Expend!
    getOnePurcase(id: ID): Purcase!
    getAllAuth: [Auth!]!
    getAllImg: [Image!]!
    getAllProducts: [Product!]!
    getAllSellings: [Selling!]!
    getAllPurcases: [Purcase!]!
    getAllExpends: [Expend!]!
    getFilteredSellings(input: SellingsInput): [Selling!]!
    getFilteredRentReport(input: RentReportInput): [Rent!]!
    getFilteredRentReport2(input: RentReportInput2): [Rent!]!
    getFilteredExpend(input: ExpendReportInput): [Expend!]!
    getFilteredExpend2(input: ExpendReportInput2): [Expend!]!
    getFilteredPurcase(input: PurcaseReportInput): [Purcase!]!
  }

  input PurcaseInput {
    id: ID
    barCode: String!
    productName: String!
    productPrice: Int!
    capitalPrice: Int!
    stock: Int!
    unit: String!
    imgSource: String!
  }

  input ProductInput {
    id: ID
    barCode: String!
    productName: String!
    productPrice: Int!
    capitalPrice: Int!
    stock: Int!
    unit: String!
    imgSource: String!
  }

  input Stock {
    id: ID
    stock: Int!
  }

  input ProductSellingInput {
    id: Int!
    productId: String!
    amountItems: Int!
    barCode: String!
    productName: String!
    productPrice: Int!
    capitalPrice: Int!
    imgProduct: String!
    unit: String!
    itemProfit: Int!
    transactionProfit: Int!
    transactionTotalPriceItem: Int!
  }

  input SellingInput {
    id: ID
    cash: Int!
    casier: String!
    change: Int!
    sellProduct: [ProductSellingInput!]!
    total: Int!
    totalItem: Int!
    totalProfit: Int!
    totalQty: Int!
  }

  input RentDataInput {
    rentName: String!
    rentPrice: Int!
    rentUserName: String!
    rentDownPayment: Int!
    rentStatus: Boolean!
    rentDate: Date!
    rentDateEnd: Date!
    cashier: String!
  }

  input ExpendDataInput {
    expendName: String!
    expendValue: Int!
    expendType: String!
    description: String!
  }

  input Status {
    id: ID
    rentStatus: Boolean!
    rentDownPayment: Int!
  }
  input AuthInput {
    userName: String!
    passwordHash: String!
    loginType: String!
  }

  type Mutation {
    uploadImg(file: Upload!): File!
    addImg(imgName: String!): Image!
    deleteImg(id: ID!): String!
    addAuth(input: AuthInput): Auth!
    deleteAuth(id: ID!): String!
    createProduct(input: ProductInput): Product!
    updateProduct(input: Stock): Product!
    addSelling(input: SellingInput): Selling!
    addPurcase(input: PurcaseInput): Purcase!
    addExpend(input: ExpendDataInput): Expend!
    deleteProduct(id: ID!): String!
    addRent(input: RentDataInput): Rent!
    updateStatusRent(input: Status): Rent!
    updateToken(input: UserPassInput): Auth!
  }
`;
