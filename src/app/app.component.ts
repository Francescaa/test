import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from './model/user';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h4>Users</h4>
      <hr>
      <div class="alert alert-danger" *ngIf="error">
        Server side error
      </div>

      <form
        class="card card-body mt-2"
        #f="ngForm"
        (submit)="saveHandler(f)"
        [ngClass]="{
          'female':f.value.gender==='F',
          'male':f.value.gender==='M'
        }">

        <input
          type="text"
          [ngModel]
          name="label"
          placehlder="Add user name"
          class="form-control"
          required
          #labelInput="ngModel"
          [ngClass]="{'is-invalid':labelInput.invalid && f.dirty}">

        <select
          [ngModel]
          name="gender"
          class="form-control"
          required
          #genderInput="ngModel"
          [ngClass]="{'is-invalid':genderInput.invalid && f.dirty}">

          <option [ngValue]="null">Select option</option>
          <option value="F">Female</option>
          <option value="M">Male</option>

        </select>

        <button
          class="btn"
          [disabled]="f.invalid"
          [ngClass]="{
            'btn-dark':f.valid,
            'btn-warning':f.invalid
          }">Save</button>
      </form>

      <div
        *ngFor="let u of usersService.users" class="list-group-item"
        [ngClass]="{
          'male': u.gender === 'M',
          'female': u.gender === 'F'
        }"
      >

        <i
          class="fa fa-3x"
          [ngClass]="{
            'fa-mars': u.gender === 'M',
            'fa-venus': u.gender === 'F'
          }"
        ></i>
        {{u.label}}
        <i class="fa fa-trash fa-2x pull-right" (click)="usersService.deleteHandler(u)"></i>
      </div>
    </div>
`,
  styles: [`
  .male { background-color: #36caff; }
  .female { background-color: pink; }
`]
})

export class AppComponent {
  error:boolean;
  constructor(public usersService:UsersService){
    usersService.init();
  }

  saveHandler(form:NgForm){
    this.usersService.saveHandler(form.value as User)
      .then(()=>{
        form.reset();
        this.error=false;
      })
      .catch(()=>this.error=true);
  }
}
