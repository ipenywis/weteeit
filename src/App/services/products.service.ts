import { IProduct } from "../typings/product";

class ProductService {
  private loadedProducts: IProduct[];

  constructor() {
    this.loadedProducts = [];
  }

  setLoadedProducts(products: IProduct[]) {
    this.loadedProducts = products;
  }

  addLoadedProduct(product: IProduct) {
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
