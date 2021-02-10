import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormAccessRightsService } from '../services/form-access-rights.service';
import { EditAppService } from '../edit-app/services/edit-app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { MatTableDataSource, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-user-access-rights',
  templateUrl: './edit-user-access-rights.component.html',
  styleUrls: ['./edit-user-access-rights.component.scss']
})
export class EditUserAccessRightsComponent implements OnInit {
  @ViewChild('TABLE', { static: true }) table: ElementRef;
  formData: any[] = [];
  formid: any;
  formDataid: any;
  constructor(private formService: EditAppService, private route: ActivatedRoute, private userService: UsersService, private fb: FormBuilder, private formAccessRightsServices: FormAccessRightsService, private snackBar: MatSnackBar, private router: Router) { }
  public addUserAccessRights: FormGroup;
  ngOnInit(): void {
    this.addUserAccessRights = this.fb.group({
      users: [null],
      form_id: this.formid
    });
    this.route.params.subscribe(params => {
      this.newAccessRighs.form_id = params.id;
    });
  }

  users = new FormControl();
  usersList: any[] = [];

  displayedColumns = ['sno', 'username', 'AccessRights'];
  dataSource = new MatTableDataSource<any>();

  selectedValue = [];

  isUpdate = false;
  isInsert = true;
  // AccessRightsusers: Array<any> = [];
  newAccessRighs: any = {
    form_id: null,
    users: []
  };
  accesstype = '';

  ngAfterViewInit() {

    this.route.params.subscribe(params => {
      let id = params['id'];
      this.formService.findFormById(id).subscribe((data) => {
        this.formData = data;

      });

      this.formid = id;

      this.userService.findAllUsers().subscribe((resp) => {
        this.dataSource.data = resp;
        this.usersList = resp;
      });

      this.formAccessRightsServices.findUserAccessRightByFormId(id).subscribe((existAccessRights) => {

        // console.log(existAccessRights.length);
        if (existAccessRights == 0) {
          this.isUpdate = false;
          this.isInsert = true;
          this.newAccessRighs.users = [];
          // this.newAccessRighs.users = existAccessRights[0].users;
        } else {
          this.newAccessRighs.users = existAccessRights[0].users;
          this.isUpdate = true;
          this.isInsert = false;
        }
        // this.selectedValue = existAccessRights[0].users;
        // console.log(existAccessRights[0].users);
        // this.formid = existAccessRights[0].users.form_id;
        // this.AccessRightsusers = existAccessRights[0].users;
        // console.log(this.AccessRightsusers);
        // this.newAccessRighs.form_id = existAccessRights[0].form_id;
        // console.log(existAccessRights[0].users);
        // let newdata = Object.assign({}, ...existAccessRights[0].users)

        // console.log(this.dataSource.data);
        // this.dataSource.data = data;

        for (const i in this.dataSource.data) {
          Object.assign(this.dataSource.data[i], { access_type: '' });
          // console.log(this.newAccessRighs.users[i]);
          for (const j in this.newAccessRighs.users) {
            if (this.newAccessRighs.users[j].user_id == this.dataSource.data[i]._id) {
              this.accesstype = this.newAccessRighs.users[j].access_type;
              Object.assign(this.dataSource.data[i], { access_type: this.accesstype });
            } else {
              this.accesstype = '';

            }
            // console.log(this.newAccessRighs.users[j])

          }


        }
      })


    });

    // console.log(this.dataSource)
    // this.users.setValue(this.selectedLevelCustomCompare);
  }


  updateNewAccessRights(userid, e) {
    // console.log(userid);
    const index = this.newAccessRighs.users.findIndex((dta) => dta.user_id === userid);
    // console.log(this.newAccessRighs.users[index]);
    if (index === -1) {
      this.newAccessRighs.users.push({ 'user_id': userid, 'access_type': e.value });
    } else {
      this.newAccessRighs.users[index] = { 'user_id': userid, 'access_type': e.value }
    }
  }

  createAccessrights() {
    this.formAccessRightsServices.createAccessRights(this.newAccessRighs).subscribe((data) => {
      // console.log(data);
      this.snackBar.open('Access Rights Created Successfully', 'Success', {
        duration: 2000,
        verticalPosition: 'top'
      });
      // this.ngAfterViewInit();
      this.router.navigate(['userAccessRights']);
    })
  }

  updateAccessrights() {
    this.addUserAccessRights.value.form_id = this.formid;
    // console.log(this.addUserAccessRights.value);
    this.formAccessRightsServices.updateAccessRights(this.formid, this.newAccessRighs).subscribe((data) => {
      this.snackBar.open('Access Rights Updated Successfully', 'Success', {
        duration: 2000,
        verticalPosition: 'top'
      });
      // this.ngAfterViewInit();
      this.router.navigate(['userAccessRights']);
    })
  }

}
