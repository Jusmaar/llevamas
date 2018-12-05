export class Client {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateRegister: Date;
  constructor(obj?: any) {
    this.email = obj && obj.email || null;
    this.firstName = obj && obj.firstName || null;
    this.lastName = obj && obj.lastName || null;
    this.phone = obj && obj.phone || null;
    this.dateRegister = obj && obj.dateRegister || null;
  }
}

export class AuthClient {
  token: string;
  client: Client;
  constructor(obj?: any) {
    this.token = obj && obj.token || null;
    this.client = obj && obj.client || null;
  }
}
