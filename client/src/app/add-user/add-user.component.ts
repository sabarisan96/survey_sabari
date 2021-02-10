import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UsersService } from '../services/users.service';
import { ManageUserComponent } from '../manage-user/manage-user.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  isResultsLoading = false;
  public breakpoint: number;
  public addUserForm: FormGroup;
  hide = true;
  wasFormChanged = false;
  constructor(private fb: FormBuilder,public dialog: MatDialog, private userService:UsersService, private snackBar:MatSnackBar) { }

  ngOnInit():void {
    this.addUserForm = this.fb.group({
      name: [null,[Validators.required]],
      email: [null,[Validators.required, Validators.email]],
      password: [null,[Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      user_type_id:[null,[Validators.required]]
    });
    
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }
  
  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  onAddUser() {
    this.isResultsLoading = true;
    if(this.addUserForm){
        this.userService.addUsers(this.addUserForm.value).subscribe((data)=>{
          const resp = JSON.stringify(data);
          const mesg = JSON.parse(resp);
          this.msgHandler(mesg.message);
          this.dialog.closeAll();
          this.isResultsLoading = false;
        }, err => {
          this.errorHandler(err, err.error);
          this.isResultsLoading = false;
    
        });
    }
  }

  private errorHandler(error, message) {
    this.snackBar.open(message, 'Error', {
      duration: 2000,
      verticalPosition: 'top'
    })
  }

  private msgHandler(message) {
    this.snackBar.open(message, 'Success', {
      duration: 2000,
      verticalPosition: 'top'
    })
  }

  openDialog(): void {
    console.log(this.wasFormChanged);
    if(this.addUserForm.dirty) {
      // const dialogRef = this.dialog.open(DeleteComponent, {
      //   width: '340px',
      // });
    } else {
      this.dialog.closeAll();
    }
  }

  

  formChanged() {
    this.wasFormChanged = true;
  }


}
