
export class UserModule { 
  private id = '';
  private username = 'sharan@gmail.com';
  private password = 'Sharan@123';

  constructor(username: string, password: string) {
      this.username = username;
      this.password = password;
  }

  getUserName() {
      return this.username;
  }
   
  getPassword() {
      return this.password;
  }
  
  setId(id: string ) {
      this.id = id;
  }

  getId() {
      return this.id;
  } 
}
