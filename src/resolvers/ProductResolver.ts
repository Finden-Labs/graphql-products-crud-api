import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Product } from "../entities/Product";

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return await Product.find();
  }

  @Query(() => Product!, { nullable: true })
  async findProductByID(
    @Arg("productID") productID: string
  ): Promise<Product | undefined | null> {
    return await Product.findOne(productID);
  }

  @Mutation(() => Product!)
  async addProduct(
    @Arg('productName') productName: string,
    @Arg('description') description: string,
    @Arg('price') price: number,
    @Arg('numberInStock') numberInStock: number
  ): Promise<Product> {
    const product = Product.create({
      productName,
      description,
      price,
      numberInStock
    });
    return await product.save();
  }

  @Mutation(() => Product!)
  async updateProduct(
    @Arg("productID") productID: string,
    @Arg('productName') productName: string,
    @Arg('description') description: string,
    @Arg('price') price: number,
    @Arg('numberInStock') numberInStock: number,
  ): Promise<Product | null> {
    let product = await Product.findOne(productID);
    if (product) {
      product.productName = productName;
      product.description = description;
      product.price = price;
      product.numberInStock = numberInStock;
      await getRepository(Product).update(
        productID,
        product
      )
      return product
    }
    return null;
  }

  @Mutation(() => Product!, { nullable: true })
  async deleteProductByID(
    @Arg("productID") productID: string
  ): Promise<Product | undefined | null> {
    const allProduct = await getRepository(Product);
    const product = await allProduct.findOne(productID);
    if (product) {
      await allProduct.delete(productID);
      return product;
    }
    return null;
  }
}
