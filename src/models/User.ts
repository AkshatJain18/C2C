export class User {
  firstName: string;
  lastName: string;
  emailId: string;
  address: string;
  state: string;
  pinCode: number;
  password: string;

  constructor(user:any) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.emailId = user.emailId;
    this.address = user.address;
    this.state = user.state;
    this.pinCode = user.pinCode;
    this.password = user.password;
  }
}
