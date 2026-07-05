import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { register } from '../Dto/Register';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

baseurl=''

  constructor(private client:HttpClient) {
    this.baseurl=environment.apiUrl
   }

  register(user:register):Observable<any>{
    return this.client.post(`${this.baseurl}/api/Account/SignUp`,user)
  }

  Login(loginUser:any):Observable<any>{
    return this.client.post(`${this.baseurl}/api/Account/Login`,loginUser)
  }



  getLoggedInUserInfo(username:string):Observable<any>{
    return this.client.get(`${this.baseurl}/api/Account/finduser?username=${username}`)
  }

  updateProfile(updateProfileDto: any,id:string): Observable<any> {
    return this.client.put(`${this.baseurl}/api/Account?id=${id}`, updateProfileDto);
  }

  getUserInfo(id:string):Observable<any>{
    return this.client.get(`${this.baseurl}/api/Account/userInfo?id=${id}`)
  }

  getAllUsers():Observable<any>{
    return this.client.get(`${this.baseurl}/api/Account/AllUsers`)
  }

  assignRole(userId:string, role:string):Observable<any>{
    return this.client.post(`${this.baseurl}/api/Account/AssignRole`, { userId, role })
  }
}
