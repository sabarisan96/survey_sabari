import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { Form } from '../edit-app/models/form';
import { EditAppService } from '../edit-app/services/edit-app.service';
import { of as observableOf } from 'rxjs/observable/of';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import { FormAccessRightsService } from '../services/form-access-rights.service';

@Component({
  selector: 'app-user-access-rights',
  templateUrl: './user-access-rights.component.html',
  styleUrls: ['./user-access-rights.component.scss']
})
export class UserAccessRightsComponent implements OnInit {
  _timeout: any = null;
  dta = [];
  usersList: any[] = [];
  constructor(private formService: EditAppService, private router: Router,
    private snackBar: MatSnackBar,
    private ref: ChangeDetectorRef,
    private dialog: MatDialog, private userService: UsersService, private formAccessRightsServices: FormAccessRightsService) { }

  ngOnInit() {
    if (window.localStorage.getItem('user_typeid') === '1') {

    } else {
      this.router.navigate(['listForms']);
    }
  }

  displayedColumns = ['sno', 'unique_form_name', 'description', 'date', 'data_count', 'edit_rights'];
  dataSource = new MatTableDataSource<Form>();

  resultsLength = 0;
  isResultsLoading = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0)
    merge(this.paginator.page, this.sort.sortChange)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isResultsLoading = true;
          return this.formService.findForm({
            page: this.paginator.pageIndex,
            perPage: this.paginator.pageSize,
            sortField: this.sort.active,
            sortDir: this.sort.direction,
            filter: ''
          })

        }),
        map(data => {
          this.isResultsLoading = false;
          this.resultsLength = data.total;
          return data.docs;
        }),
        catchError(() => {
          this.isResultsLoading = false;
          this.errorHandler('Failed to fetch invoices', 'Error');
          return observableOf([])
        })
      )
      .subscribe(data => {
        this.dataSource.data = data;
        for (const i in data) {
          this.formService.findFormData(data[i]._id).subscribe((value) => {
            this.dta["data_count"] = value.length;
            Object.assign(this.dataSource.data[i], { data_count: value.length });
          })

          this.userService.findAllUsers().subscribe((resp) => {

            this.formAccessRightsServices.findUserAccessRightByFormId(data[i]._id).subscribe((existAccessRights) => {
              for (const j in existAccessRights) {
                Object.assign(this.dataSource.data[i], { access_rights: existAccessRights[j].users });
              }
              // this.selectedValue = existAccessRights[0].users;
              // console.log(existAccessRights[0].users);
            })

            Object.assign(this.dataSource.data[i], { usersList: resp });
          });


        }
        console.log(this.dataSource)

      })
  }
  filterText(filterValue: string) {
    this._timeout = null;
    if (this._timeout) { //if there is already a timeout in process cancel it
      window.clearTimeout(this._timeout);
    }
    // console.log(filterValue);
    this._timeout = window.setTimeout(() => {
      this.isResultsLoading = true;
      filterValue = filterValue.trim()
      this.paginator.pageIndex = 0;
      this.formService.findForm({
        page: this.paginator.pageIndex,
        perPage: this.paginator.pageSize,
        sortField: this.sort.active,
        sortDir: this.sort.direction,
        filter: filterValue
      })
        .subscribe(data => {
          this.dataSource.data = data.docs;
          this.resultsLength = data.total;
          this.isResultsLoading = false;
          this.dta = data.docs;
          for (const i in data.docs) {
            // var dta = data.docs[i]._id;
            this.formService.findFormData(this.dta[i]._id).subscribe((value) => {
              //   this.dta["data_count"] = value.length;
              Object.assign(this.dataSource.data[i], { data_count: value.length });
            })

          }


        }, err => this.errorHandler(err, 'Failed to filter forms'))
    }, 1000);
  }

  editUserAccessRightsHandler(id) {
    this.router.navigate(['editUserAccessRights', id]);
    // console.log(id);
    // debugger;
  }

  private errorHandler(error, message) {
    this.isResultsLoading = false;
    this.snackBar.open(message, 'Error', {
      duration: 2000,
      verticalPosition: 'top'
    })
  }

}
