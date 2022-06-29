import axios from "axios";

class AuthService {
  getBaseUrl(){
    var url = window.location.href;
    if(url.includes('127.0.0.1') || url.includes('localhost')){
      return "http://127.0.0.1:3000/"
    }else{
      return "https://damp-caverns-74991.herokuapp.com/"
    }
  }
  login(userData){
    var url = this.getBaseUrl();
    return axios.post(url+'auth/login', {email: userData.email, password: userData.password}).then(resp=>{
      if(resp.data.loggedIn){
        localStorage.setItem('user', JSON.stringify(resp.data.user));
      }
      return resp
    }).catch((error)=>console.log(error));
  }
  register(userData){
    var url = this.getBaseUrl();
    var user = userData;
    return axios.post(url+'users', {user}).then(resp=>{
      return resp;
    }).catch((error)=>console.log(error));
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  getCurrentUser(){
    var user = localStorage.getItem('user');
    if(user){
      return JSON.parse(user);
    }else{
      return "no user found"
    }
  }
}

export default new AuthService();