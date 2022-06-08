import axios from "axios";
const API_URL = "http://localhost:3000/"

class AuthService {
  login(userData){
    return axios.post(API_URL+'auth/login', {email: userData.email, password: userData.password}).then(resp=>{
      if(resp.statusText === 'OK' && resp.data.token){
        localStorage.setItem('token', resp.data.token);
        localStorage.setItem('user', JSON.stringify(resp.data.user))
      }
      return resp
    }).catch((error)=>console.log(error));
  }
  register(userData){
    var user = userData;
    return axios.post(API_URL+'users', {user}).then(resp=>{
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