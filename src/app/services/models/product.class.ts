export class Product {
  name: string;
  username: string;
  rating: number;
  stock: number;
  description: string;
  images: string[];
  priceNow: number;
  priceOld: number;
  priceId: string;
  category: any;
  subcategory: any;
  subsubcategory: any;
  rutaCategory: string;
  rutaSubcategory: string;
  rutaSubsubcategory: string;
  rutaProducto: string;
  constructor(obj?: any) {
    this.name = obj && obj.name || null;
    this.username = obj && obj.username || null;
    this.rating = obj && obj.rating || null;
    this.stock = obj && obj.stock || null;
    this.description = obj && obj.description || null;
    this.images = obj && obj.images || [];
    this.priceNow = obj && obj.priceNow || null;
    this.priceOld = obj && obj.priceOld || null;
    this.priceId = obj && obj.priceId || null;
    this.category = obj && obj.category || null;
    this.subcategory = obj && obj.subcategory || null;
    this.subsubcategory = obj && obj.subsubcategory || null;
    if (this.category) {
      this.rutaCategory = `/shop/${this.category.username}`;
      if (this.subcategory) {
        this.rutaSubcategory = `/shop/${this.category.username}/${this.subcategory.username}`;
        if (this.subsubcategory) {
          this.rutaSubsubcategory = `/shop/${this.category.username}/${this.subcategory.username}/${this.subsubcategory.username}`;
        } else {
          this.rutaSubsubcategory = null;
        }
      } else {
        this.rutaSubcategory = null;
      }
    } else {
      this.rutaCategory = null;
    }
  }
}
