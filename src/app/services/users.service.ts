import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({providedIn: 'root'})
export class UsersService{
  users: User[];
  URL='http://localhost:3000'; /* server url */

  constructor(private http: HttpClient){}

  init(){
    this.http.get<User[]>(this.URL+'/users')
      .subscribe(res =>{
        this.users=res;
      });
  }

  deleteHandler(userToRemove:User):void{
    this.http.delete(`${this.URL}/users/${userToRemove.id}`)
      .subscribe(()=>{
        this.users=this.users.filter(u=>u.id!==userToRemove.id);
      })
  }

  saveHandler(user:User):Promise<void>{
    return new Promise((resolve,reject)=>{
      this.http.post<User>(`${this.URL}/users`,user)
        .subscribe(
          (dbUser)=>{
            this.users=[...this.users,dbUser];
            resolve();
          },
          ()=>reject()
        );
    });
  }
}
