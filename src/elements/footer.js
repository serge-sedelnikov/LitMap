import {UserInfo} from './userInfo';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import _ from "lodash";

@inject(UserInfo, Router)
export class Footer{

  constructor(UserInfo, Router){
    this.user = UserInfo;
    this.router = Router;
    //me and dmitry
    this.admins = ["206209973", "30248483"];
  }

  attached(){
    VK.Auth.getLoginStatus((response)=>{
      this.onLogin(response);
    });
  }

  //sign user in
  signIn(){
    if(this.user.isLoggedIn){
      //go to admin
      this.router.navigate('adm');
    }
    else{
      //login user
      VK.Auth.login((response)=>{
        this.onLogin(response, true);
      });
    }
  }

  //log user out
  signOut(){
    //logout
    VK.Auth.logout((response)=>{
      this.onLogout(response);
    });
  }

  //on logout callback
  onLogout(response){
    this.user.clear();
    //navigate to main if was on login
    if(this.router.currentInstruction.fragment == '/adm')
      this.router.navigate('');
  }

  //on login callback
  onLogin(response, goToAdmin){
    if (response.session) {

        //user is not an admin
        if(this.admins.indexOf(response.session.mid) == -1){
            this.onLogout();
            return;
        }

        this.user.id = response.session.mid
        if(goToAdmin){
          this.router.navigate('adm');
        }
      } else {
        console.log(this.user.id);
        this.user.clear();
      }
  }
}
