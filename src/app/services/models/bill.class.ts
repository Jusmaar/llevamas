export class Bill {
  id: string;
  total: number;
  province: string;
  district: string;
  address: string;
  email: string;
  productos: any[];
  constructor(obj?: any) {
    this.id = obj && obj.id || null;
    this.total = obj && obj.total || null;
    this.province = obj && obj.province || null;
    this.district = obj && obj.district || null;
    this.address = obj && obj.address || null;
    this.email = obj && obj.email || null;
    this.productos = obj && obj.productos || null;
  }
}
