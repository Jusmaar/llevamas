export class Category {
  name: string;
  description: string;
  username: string;
  icon:string;
  constructor(obj?: any) {
    this.name = obj && obj.name || null;
    this.description = obj && obj.description || null;
    this.username = obj && obj.username || null;
    this.icon = obj && obj.icon || null;
  }
}
