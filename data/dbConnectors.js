import mongoose from 'mongoose';

// Mongo connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/products', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const expendSchema = new mongoose.Schema({
  expendName: {
    type: String,
  },
  expendValue: {
    type: Number,
  },
  expendDate: {
    type: Date,
    default: Date.now,
  },
  expendType: {
    type: String,
  },
  description: {
    type: String,
  },
});

const productSchema = new mongoose.Schema({
  barCode: {
    type: String,
  },
  productName: {
    type: String,
  },
  productPrice: {
    type: Number,
  },
  capitalPrice: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  unit: {
    type: String,
  },
  purcaseDate: {
    type: Date,
    default: Date.now,
  },
  imgSource: {
    type: String,
  },
});

const rentSchema = new mongoose.Schema({
  rentName: {
    type: String,
  },
  rentPrice: {
    type: Number,
  },
  rentUserName: {
    type: String,
  },
  rentDownPayment: {
    type: Number,
  },
  rentStatus: {
    type: Boolean,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  rentDate: {
    type: Date,
  },
  rentDateEnd: {
    type: Date,
  },
  cashier: {
    type: String,
  },
});

const purcaseSchema = new mongoose.Schema({
  barCode: {
    type: String,
  },
  productName: {
    type: String,
  },
  productPrice: {
    type: Number,
  },
  capitalPrice: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  unit: {
    type: String,
  },
  purcaseDate: {
    type: Date,
    default: Date.now,
  },
  imgSource: {
    type: String,
  },
});

const authSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  passwordHash: {
    type: String,
  },
  loginType: {
    type: String,
  },
  salt: {
    type: String,
  },
  token: {
    type: String,
  },
});

const imageSchema = new mongoose.Schema({
  imgName: {
    type: String,
  },
});

const sellingSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  cash: { type: Number },
  casier: { type: String },
  change: { type: Number },
  sellProduct: [
    {
      id: {
        type: Number,
      },
      productId: {
        type: String,
      },
      amountItems: {
        type: Number,
      },
      barCode: {
        type: String,
      },
      productName: {
        type: String,
      },
      productPrice: {
        type: Number,
      },
      capitalPrice: {
        type: Number,
      },
      imgProduct: {
        type: String,
      },
      unit: {
        type: String,
      },
      itemProfit: {
        type: Number,
      },
      transactionProfit: {
        type: Number,
      },
      transactionTotalPriceItem: {
        type: Number,
      },
    },
  ],
  total: { type: Number },
  totalItem: { type: Number },
  totalProfit: { type: Number },
  totalQty: { type: Number },
});

const Products = mongoose.model('products', productSchema);
const Sellings = mongoose.model('Sellings', sellingSchema);
const Purcases = mongoose.model('Purcases', purcaseSchema);
const Rents = mongoose.model('Rents', rentSchema);
const Expends = mongoose.model('Expends', expendSchema);
const Authentication = mongoose.model('Authentication', authSchema);
const Images = mongoose.model('Images', imageSchema);

export { Products, Sellings, Purcases, Rents, Expends, Authentication, Images };
