import { Request, Response } from "express";
import tienda from "../models/tienda.model";
import mercanciaModel from "../models/mercancia.model";
import efectivoModel from "../models/efectivo.model";

class tiendaController {
  async getTiendas(req: Request, res: Response) {
    try {
      const tiendas = await tienda.find();

      tiendas
        ? res.status(200).json({ message: tiendas, details: true })
        : res
          .status(404)
          .json({ message: "no existen tiendas", details: false });
    } catch (error) {
      console.error(error);
    }
  }

  async getTiendasById(req: Request, res: Response) {
    try {
      const { idTienda } = req.params;

      const existTienda = await tienda.findById(idTienda);

      existTienda
        ? res.status(200).json({ message: existTienda, details: true })
        : res.status(404).json({ message: "tienda not found", details: false });
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: "tienda not found", details: false });
    }
  }

  async createTienda(req: Request, res: Response) {
    try {
      const { nombre, coordinador, coordenadas, direccion } = req.body;

      const existTienda = await tienda.findOne({
        nombre: nombre,
        coordenadas: direccion,
      });

      if (existTienda) {
        return res
          .status(404)
          .json({ message: "la tienda ya existe", details: false });
      }
      const data = {
        nombre,
        coordinador,
        coordenadas,
        direccion,
      };

      const createdTienda = await tienda.create(data);

      createdTienda
        ? res.status(200).json({ message: createdTienda, details: true })
        : res
          .status(400)
          .json({ messga: "intenral server error", details: false });
    } catch (error) {
      console.log(error);
    }
  }

  async editTienda(req: Request, res: Response) {
    try {
      const { idTienda } = req.params;
      const { nombre, coordinador, coordenadas, direccion } = req.body;

      const data = {
        nombre,
        coordinador,
        coordenadas,
        direccion,
      };

      const existTienda = await tienda.findOneAndUpdate(
        { _id: idTienda },
        { $set: data },
        { new: true }
      );

      existTienda
        ? res.status(200).json({ message: existTienda, details: true })
        : res
          .status(404)
          .json({ message: "la tienda no existe", details: false });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTienda(req: Request, res: Response) {
    try {
      const { idTienda } = req.params;

      const deleted = await tienda.findByIdAndDelete(idTienda);

      deleted
        ? res.status(200).json({ message: "tienda deleted", details: true })
        : res.status(404).json({ message: "tienda not found", details: false });
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToTienda(req: Request, res: Response) {
    try {
      const { idTienda } = req.params;
      const { productId, price } = req.body;

      const data = {
        productId,
        price,
      };

      // Encuentra la tienda por su ID
      const tiendaToAdd = await tienda.findById(idTienda);

      if (!tiendaToAdd) {
        return res.status(404).json({ message: "Tienda no encontrada." });
      }

      // Agrega el ID del producto al array de productos de la tienda
      tiendaToAdd.productos.push(data);

      // Guarda la tienda actualizada en la base de datos
      await tiendaToAdd.save();

      // Envía una respuesta al cliente
      return res
        .status(200)
        .json({ message: "Producto agregado a la tienda exitosamente." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error interno del servidor." });
    }
  }

  // utilidades
  async rempleaceProducts(req: Request, res: Response) {
    try {
      const { idTienda } = req.params;
      const products = req.body;

      const tiendaToUpdate = await tienda.findById(idTienda);

      if (!tiendaToUpdate) return res.status(404).json({ message: "Tienda no encontrada." });

      const Update = tiendaToUpdate.productos = products;

      console.log(Update)

      await tiendaToUpdate.save();

      return res
        .status(200)
        .json({ message: "Productos rempleazadon en la tienda exitosamente." });
    } catch (error) {
      return res.status(500).json({ message: "Error interno del servidor." });
    }
  }

  async editProductTienda(req: Request, res: Response) {
    try {
      const { idTienda, idProduct } = req.params;
      const { price } = req.body;

      const tiendaToUpdate = await tienda.findById(idTienda);

      if (!tiendaToUpdate) {
        return res
          .status(400)
          .json({ message: "Tienda not found", details: false });
      }

      const products = tiendaToUpdate.productos;
      const productIndex = products.findIndex((product) => {
        if (product.product) {
          return product.product.toString() === idProduct;
        }
        return false;
      });

      if (productIndex === -1) {
        return res.status(404).json({
          message: "Product not found in this tienda",
          details: false,
        });
      }

      // Update the price of the product
      products[productIndex].price = price;

      // Save the changes
      await tiendaToUpdate.save();

      res
        .status(200)
        .json({ message: "Precio de producto actualizado", details: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal server error", details: false });
    }
  }

  async createMercancia(req: Request, res: Response) {
    try {
      const { mercancia } = req.body;

      const save = await mercanciaModel.create(mercancia);

      if (!save) throw new Error("error en back");

      return {
        message: "guardado",
        details: save,
      };
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", details: false });
    }
  }

  async getMercancia(req: Request, res: Response) {
    try {
      const mercancias = await tienda.find();
      res.json(mercancias);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", details: false });
    }
  }

  async createEfectivo(req: Request, res: Response) {
    try {
      const { efectivo } = req.body;

      const save = await efectivoModel.create(efectivo);

      if (!save) throw new Error("error en back");

      return {
        message: "guardado",
        details: save,
      };
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", details: false });
    }
  }

  async getEfectivo(req: Request, res: Response) {
    try {
      const efectivo = await efectivoModel.find();
      res.json(efectivo);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", details: false });
    }
  }

  async utilsStoreProducts(req: Request, res: Response) {
    try {
      const { tiendaId, utils } = req.body;
      const searchStore = await tienda.findByIdAndUpdate(tiendaId, {
        $set: { "productos.$[].utils": utils },
      });

      res.json(searchStore);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", details: false });
    }
  }
}

export default tiendaController;
