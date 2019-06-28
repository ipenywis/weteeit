import { GetProducts_products } from "../typings/graphql-types";

class ProductService {
  private loadedProducts: GetProducts_products[];

  constructor() {
    this.loadedProducts = [];
  }

  setLoadedProducts(products: GetProducts_products[]) {
    this.loadedProducts = products;
  }

  addLoadedProduct(product: GetProducts_products) {
    this.loadedProducts && this.loadedProducts.push(product);
  }

  clearLoadedProducts() {
    this.loadedProducts = [];
  }

  getLoadedProducts() {
    return this.loadedProducts;
  }
}
//Single Instance
export default new ProductService();
