
export class UserInfo{

  constructor(){
    this.id = '';
  }

  //if user is logged in
  get isLoggedIn(){
    return this.id != ''
  }

  //clears the logged in info
  clear(){
    this.id = '';
  }
}
