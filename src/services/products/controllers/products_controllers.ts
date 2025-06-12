import { NextFunction, Response, Request } from "express";
import Products from "../models/products_models";
// import { v2 as cloudinary } from "cloudinary";

class Products_controllers {
  allProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await Products.findAll();

      const CLOUDINARY_BASE_URL =
        "https://res.cloudinary.com/djupk6o9s/image/upload/";

      // const Url =`${req.protocol}://${req.get("host")}/public/`;

      const productsWithFullImageUrl = products.map((product) => ({
        ...product.toJSON(),
        image: `${CLOUDINARY_BASE_URL}${product.image}`,
      }));

      res
        .status(200)
        .json({ message: "All Products", products: productsWithFullImageUrl });
      next();
    } catch (e) {
      console.log(e as Error);
      res.status(400).json({
        message: "Failed to get products",
        error: (e as Error).message,
      });
    }
  };

  getProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const id = req.params.id;
      const productId = await Products.findOne({ where: { id: id } });

      const CLOUDINARY_BASE_URL =
        "https://res.cloudinary.com/djupk6o9s/image/upload/";

      // const Url =`${req.protocol}://${req.get("host")}/public/`;

      if (!productId) {
        return res
          .status(404)
          .json({ message: `Product with ID ${id} not found` });
      }

      const productsWithFullImageUrl = {
        ...productId.toJSON(),
        image: `${CLOUDINARY_BASE_URL}${productId.image}`,
      };
      res.status(200).json({
        message: `Products ${id} fetched`,
        productId: productsWithFullImageUrl,
      });
      next();
    } catch (e) {
      console.log(e as Error);
      res.status(400).json({
        message: "Product doesn't exist",
        error: (e as Error).message,
      });
    }
  };

  createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { name, image, price, description, category, use, size } = req.body;

      // const imageWithCategoryPrefix = `${category}/${image}`;

      // const existingBlock = await Products.findOne({
      //   where: { name: name, image: image },
      // });

      // if (existingBlock) {
      //   return res
      //     .status(400)
      //     .json({ message: `Product already exist ${name} and ${image}` });
      // }

      const product = await Products.create({
        name,
        image,
        price,
        description,
        category,
        use,
        size,
      });

      res
        .status(201)
        .json({ message: `Product created successfully`, product });
      next();
    } catch (e) {
      console.log(e as Error);
      res.status(400).json({
        message: "Failed to create product",
        error: (e as Error).message,
      });
    }
  };

  getProductsByCategory = async (req: Request, res: Response) => {
    try {
      const { category } = req.params; // solid or hollow

      if (!["solid", "hollow"].includes(category)) {
        res.status(400).json({ message: "Product doesn't exist" });
      }

      const products = await Products.findAll({ where: { category } });

      const CLOUDINARY_BASE_URL =
        "https://res.cloudinary.com/djupk6o9s/image/upload/";

      const productsWithFullImageUrl = products.map((product) => ({
        ...product.toJSON(),
        image: `${CLOUDINARY_BASE_URL}${product.image}`,
      }));

      res.status(200).json({
        message: `${category} Products`,
        products: productsWithFullImageUrl,
      });
    } catch (e) {
      res.status(400).json({
        message: "Failed to fetch category products",
        error: (e as Error).message,
      });
    }
  };
}

export default new Products_controllers();
