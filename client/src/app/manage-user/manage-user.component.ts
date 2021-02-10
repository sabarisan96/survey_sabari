import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { EditAppService } from '../edit-app/services/edit-app.service';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';
import { AddUserComponent } from '../add-user/add-user.component';
import { merge } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit, AfterViewInit {
  isResultsLoading = false;
  _timeout: any = null;
  resultsLength = 0;
  constructor(private userService: UsersService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  displayedColumns = ['sno','name', 'email', 'createdTime'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
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
      this.userService.findUsers({
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
       
        }, err => this.errorHandler(err, 'Failed to filter forms'))
    }, 1000);
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0)
    merge(this.paginator.page, this.sort.sortChange)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isResultsLoading = true;
          return this.userService.findUsers({
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
        // console.log(data)
      })
    // this.userService.findUsers().subscribe(data => {
    //   // console.log(data);
    //   this.dataSource.data = data;
    // });

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent,{
      width: '550px',disableClose: true 
    });
    dialogRef.afterClosed().subscribe(()=>{
      this.ngAfterViewInit();
    })
}

private errorHandler(error, message) {
  this.isResultsLoading = false;
  this.snackBar.open(message, 'Error', {
    duration: 2000,
    verticalPosition: 'top'
  })
}

}
