export class Banner {
  name: string;
  image: string;
  description: string;
  username: string;
  constructor(obj?: any) {
    this.name = obj && obj.name || null;
    this.image = obj && obj.image || null;
    this.description = obj && obj.description || null;
    this.username = obj && obj.username || null;
  }
}
