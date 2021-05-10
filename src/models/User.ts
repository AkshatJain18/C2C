export class User {
  
  id:string;
  firstName: string;
  lastName: string;
  emailId: string;
  address: string;
  phone: string;
  pinCode: number;
  password: string;
  picture: string;
  rating : number;

  constructor(user:any) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.emailId = user.emailId;
    this.address = user.address;
    this.phone = user.state;
    this.pinCode = user.pinCode;
    this.password = user.password;
    this.picture = user.picture;
    this.rating = user.rating;
  }
}
