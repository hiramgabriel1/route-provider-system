import mongoose from "mongoose";

const productsMark = new mongoose.Schema({
  productName: {
    type: String,
    require: true,
  },

  productDescription: {
    type: String,
    require: true,
  },

  productPrice: {
    type: Number,
    require: true,
  },

  productIsSold: {
    type: Boolean,
    require: true,
  },
});

export const productMarks = mongoose.model("productos-marcados", productsMark);
// import mongoose from "mongoose";

// const productsSchema = new mongoose.Schema({
//     nombre: {
//         type: String,
//         required: true,
//     },

//     descripcion: {
//         type: String,
//         required: true,
//     },

//     precio: {
//         type: Number,
//         required: true,
//     },

// });

// const productsModel = mongoose.model("productos", productsSchema);

// export default productsModel
