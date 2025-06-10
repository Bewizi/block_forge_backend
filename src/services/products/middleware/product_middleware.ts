import { Request, Response, NextFunction } from "express";
import Products from "../models/products_models";

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = req.params.id;
    const product = await Products.findOne({ where: { id } });
    if (!product) res.status(404).json({ message: "Product not found" });
    next();
  } catch (e) {
    console.log(e as Error);
    res.status(500).json({
      message: "Failed to fetch booking",
      error: (e as Error).message,
    });
  }
};

export const createProducts =async (req:Request,res:Response,next:NextFunction)=>{
  try{
    
  }catch (e) {
    
  }
}