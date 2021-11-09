import {
  Products,
  Sellings,
  Purcases,
  Rents,
  Expends,
  Authentication,
  Images,
} from './dbConnectors';
import { GraphQLScalarType, Kind } from 'graphql';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { GraphQLUpload } from 'graphql-upload';
import path from 'path';
import fs from 'fs';
const { UserInputError } = require('apollo-server');

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

// resolver map
export const resolvers = {
  Date: dateScalar,
  Upload: GraphQLUpload,
  Query: {
    getOneProduct: (root, { id }) => {
      return new Promise((resolve, object) => {
        Products.findById(id, (err, product) => {
          if (err) reject(err);
          else resolve(product);
        });
      });
    },
    getAuth: (root, { userName }) => {
      return new Promise((resolve, object) => {
        Authentication.findOne({ userName: userName }, (err, auth) => {
          if (err) reject(err);
          else resolve(auth);
        });
      });
    },
    getOneSelling: (root, { id }) => {
      return new Promise((resolve, object) => {
        Sellings.findById(id, (err, selling) => {
          if (err) reject(err);
          else resolve(selling);
        });
      });
    },
    getOneRent: (root, { id }) => {
      return new Promise((resolve, object) => {
        Rents.findById(id, (err, rent) => {
          if (err) reject(err);
          else resolve(rent);
        });
      });
    },
    getOneExpend: (root, { id }) => {
      return new Promise((resolve, object) => {
        Expends.findById(id, (err, expend) => {
          if (err) reject(err);
          else resolve(expend);
        });
      });
    },
    getOnePurcase: (root, { id }) => {
      return new Promise((resolve, object) => {
        Purcases.findById(id, (err, purcase) => {
          if (err) reject(err);
          else resolve(purcase);
        });
      });
    },
    getOneAuth: (root, { id }) => {
      return new Promise((resolve, object) => {
        Authentication.findById(id, (err, auth) => {
          if (err) reject(err);
          else resolve(auth);
        });
      });
    },

    getAllProducts: () => {
      return new Promise((resolve, object) => {
        Products.find((err, product) => {
          if (err) reject(err);
          else resolve(product);
        });
      });
    },
    getAllPurcases: () => {
      return new Promise((resolve, object) => {
        Purcases.find((err, purcase) => {
          if (err) reject(err);
          else resolve(purcase);
        });
      });
    },
    getAllSellings: () => {
      return new Promise((resolve, object) => {
        Sellings.find((err, selling) => {
          if (err) reject(err);
          else resolve(selling);
        });
      });
    },
    getAllExpends: () => {
      return new Promise((resolve, object) => {
        Expends.find((err, expend) => {
          if (err) reject(err);
          else resolve(expend);
        });
      });
    },
    getAllAuth: () => {
      return new Promise((resolve, object) => {
        Authentication.find((err, auth) => {
          if (err) reject(err);
          else resolve(auth);
        });
      });
    },
    getAllImg: () => {
      return new Promise((resolve, object) => {
        Images.find((err, image) => {
          if (err) reject(err);
          else resolve(image);
        });
      });
    },

    getFilteredSellings: (root, { input }) => {
      return new Promise((resolve, object) => {
        Sellings.find((err, data) => {
          if (err) reject(err);
          else
            resolve(
              data.filter((item) => {
                return (
                  item.date.getMonth() === input.month &&
                  item.date.getFullYear() === input.year
                );
              })
            );
        });
      });
    },
    getFilteredRentReport: (root, { input }) => {
      return new Promise((resolve, object) => {
        Rents.find((err, data) => {
          if (err) reject(err);
          else
            resolve(
              data.filter((item) => {
                return (
                  item.rentDate.getMonth() === input.month &&
                  item.rentDate.getFullYear() === input.year &&
                  item.rentDate.getDate() === input.day
                );
              })
            );
        });
      });
    },
    getFilteredRentReport2: (root, { input }) => {
      return new Promise((resolve, object) => {
        Rents.find((err, data) => {
          if (err) reject(err);
          else
            resolve(
              data.filter((item) => {
                return (
                  item.rentDate.getMonth() === input.month &&
                  item.rentDate.getFullYear() === input.year
                );
              })
            );
        });
      });
    },
    getFilteredPurcase: (root, { input }) => {
      return new Promise((resolve, object) => {
        Purcases.find((err, data) => {
          if (err) reject(err);
          else
            resolve(
              data.filter((item) => {
                return (
                  item.purcaseDate.getMonth() === input.month &&
                  item.purcaseDate.getFullYear() === input.year
                );
              })
            );
        });
      });
    },

    getFilteredExpend: (root, { input }) => {
      return new Promise((resolve, object) => {
        Expends.find((err, data) => {
          if (err) reject(err);
          else
            resolve(
              data.filter((item) => {
                return (
                  item.expendDate.getMonth() === input.month &&
                  item.expendDate.getFullYear() === input.year &&
                  item.expendType.toLowerCase() ===
                    input.expendType.toLowerCase()
                );
              })
            );
        });
      });
    },
    getFilteredExpend2: (root, { input }) => {
      return new Promise((resolve, object) => {
        Expends.find((err, data) => {
          if (err) reject(err);
          else
            resolve(
              data.filter((item) => {
                return (
                  item.expendDate.getMonth() === input.month &&
                  item.expendDate.getFullYear() === input.year
                );
              })
            );
        });
      });
    },
    // getAuth: async (root, { input }, { res }) => {
    //   const { userName, password } = input;
    //   const user = await Authentication.findOne({ userName });
    //   if (!user) return null;
    //   if (!user.passwordHash) return null;
    //   const { _id: id, passwordHash, loginType, salt } = user;
    //   const pepper = process.env.PEPPER_STRING;

    //   const isCorrect = await bcrypt.compare(
    //     salt + password + pepper,
    //     passwordHash
    //   );

    //   if (isCorrect) {
    //     const token = jwt.sign(
    //       {
    //         id: id,
    //         userName: userName,
    //         loginType: loginType,
    //       },
    //       process.env.JWT_SECRET,
    //       {
    //         expiresIn: '2d',
    //       }
    //     );

    //     return new Promise((resolve, object) => {
    //       try {
    //         resolve(user);
    //       } catch (error) {
    //         reject(error);
    //       }
    //     });
    //   }
    // },
  },

  Mutation: {
    uploadImg: async (parent, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;

      // Invoking the `createReadStream` will return a Readable Stream.
      // See https://nodejs.org/api/stream.html#stream_readable_streams
      const stream = createReadStream();
      const pathName = path.join(__dirname, `../public/images/${filename}`);
      await stream.pipe(fs.createWriteStream(pathName));

      return { imgName: filename };
    },
    addAuth: async (root, { input }, { res }) => {
      const { userName, passwordHash, loginType } = input;
      const user = await Authentication.findOne({ userName });
      if (user)
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken',
          },
        });
      const salt = uuidv4();
      const pepper = process.env.PEPPER_STRING;
      const encryptPasswordHash = await bcrypt.hash(
        salt + passwordHash + pepper,
        10
      );
      const id = Authentication._id;
      const token = jwt.sign(
        {
          id: id,
          userName: userName,
          loginType: loginType,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '2d',
        }
      );

      const newAuth = new Authentication({
        id: id,
        userName: userName,
        passwordHash: encryptPasswordHash,
        loginType: loginType,
        salt: salt,
        token: token,
      });

      // newAuth.id = newAuth._id;

      // const { id } = newAuth;

      return new Promise((resolve, object) => {
        newAuth.save((err) => {
          if (err) reject(err);
          else resolve(newAuth);
        });
      });
    },

    createProduct: (root, { input }) => {
      const newProduct = new Products({
        barCode: input.barCode,
        productName: input.productName,
        productPrice: input.productPrice,
        capitalPrice: input.capitalPrice,
        stock: input.stock,
        unit: input.unit,
        imgSource: input.imgSource,
      });

      newProduct.id = newProduct._id;

      return new Promise((resolve, object) => {
        newProduct.save((err) => {
          if (err) reject(err);
          else resolve(newProduct);
        });
      });
    },

    addRent: (root, { input }) => {
      const newRent = new Rents({
        rentName: input.rentName,
        rentPrice: input.rentPrice,
        rentUserName: input.rentUserName,
        rentDownPayment: input.rentDownPayment,
        rentStatus: input.rentStatus,
        rentDate: input.rentDate,
        rentDateEnd: input.rentDateEnd,
        cashier: input.cashier,
      });

      newRent.id = newRent._id;

      return new Promise((resolve, object) => {
        newRent.save((err) => {
          if (err) reject(err);
          else resolve(newRent);
        });
      });
    },

    addImg: (root, { imgName }) => {
      const newImg = new Images({
        imgName: imgName,
      });

      newImg.id = newImg._id;

      return new Promise((resolve, object) => {
        newImg.save((err) => {
          if (err) reject(err);
          else resolve(newImg);
        });
      });
    },

    addExpend: (root, { input }) => {
      const newExpend = new Expends({
        expendName: input.expendName,
        expendValue: input.expendValue,
        expendType: input.expendType,
        description: input.description,
      });

      newExpend.id = newExpend._id;

      return new Promise((resolve, object) => {
        newExpend.save((err) => {
          if (err) reject(err);
          else resolve(newExpend);
        });
      });
    },

    addPurcase: (root, { input }) => {
      const newPurcase = new Purcases({
        barCode: input.barCode,
        productName: input.productName,
        productPrice: input.productPrice,
        capitalPrice: input.capitalPrice,
        stock: input.stock,
        unit: input.unit,
        imgSource: input.imgSource,
      });

      newPurcase.id = newPurcase._id;

      return new Promise((resolve, object) => {
        newPurcase.save((err) => {
          if (err) reject(err);
          else resolve(newPurcase);
        });
      });
    },

    addSelling: (root, { input }) => {
      const newSelling = new Sellings({
        cash: input.cash,
        casier: input.casier,
        change: input.change,
        sellProduct: input.sellProduct,
        total: input.total,
        totalItem: input.totalItem,
        totalProfit: input.totalProfit,
        totalQty: input.totalQty,
      });

      newSelling.id = newSelling._id;

      return new Promise((resolve, object) => {
        newSelling.save((err) => {
          if (err) reject(err);
          else resolve(newSelling);
        });
      });
    },
    updateProduct: (root, { input }) => {
      return new Promise((resolve, object) => {
        Products.findOneAndUpdate(
          { _id: input.id },
          input,
          { new: true },
          (err, product) => {
            if (err) reject(err);
            else resolve(product);
          }
        );
      });
    },

    updateStatusRent: (root, { input }) => {
      return new Promise((resolve, object) => {
        Rents.findOneAndUpdate(
          { _id: input.id },
          input,
          { new: true },
          (err, rent) => {
            if (err) reject(err);
            else resolve(rent);
          }
        );
      });
    },

    updateToken: async (root, { input }, { res }) => {
      const { userName, password } = input;
      const user = await Authentication.findOne({ userName });
      if (!user) return null;
      if (!user.passwordHash) return null;
      const { _id: id, passwordHash, loginType, salt } = user;
      const pepper = process.env.PEPPER_STRING;

      const isCorrect = await bcrypt.compare(
        salt + password + pepper,
        passwordHash
      );

      if (isCorrect) {
        const token = jwt.sign(
          {
            id: id,
            userName: userName,
            loginType: loginType,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '2d',
          }
        );
        return new Promise((resolve, object) => {
          Authentication.findOneAndUpdate(
            { _id: user.id },
            { token: token },
            { new: true },
            (err, auth) => {
              if (err) reject(err);
              else resolve(auth);
            }
          );
        });
      }
    },

    deleteProduct: (root, { id }) => {
      return new Promise((resolve, object) => {
        Products.deleteOne({ _id: id }, (err) => {
          if (err) reject(err);
          else resolve('Successfully deleted product');
        });
      });
    },

    deleteAuth: (root, { id }) => {
      return new Promise((resolve, object) => {
        Authentication.deleteOne({ _id: id }, (err) => {
          if (err) reject(err);
          else resolve('Successfully deleted User');
        });
      });
    },

    deleteImg: (root, { id }) => {
      return new Promise((resolve, object) => {
        Images.deleteOne({ _id: id }, (err) => {
          if (err) reject(err);
          else resolve('Successfully deleted Image');
        });
      });
    },
  },
};
