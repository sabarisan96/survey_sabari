import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewChecked, AfterViewInit, ElementRef } from '@angular/core';
import { EditAppService } from '../edit-app/services/edit-app.service';
import { MatTableDataSource, MatPaginator, MatSnackBar, MatSort, MatDialog } from '@angular/material';
import { Form } from '../edit-app/models/form';
import { remove } from 'lodash';
import { of as observableOf } from 'rxjs/observable/of';
import { merge } from 'rxjs';
import { switchMap, startWith, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import * as XLSX from 'xlsx';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-list-forms',
  templateUrl: './list-forms.component.html',
  styleUrls: ['./list-forms.component.scss']
})


export class ListFormsComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('TABLE', { static: true }) table: ElementRef;
  // api_url = '';
  app_url = `${environment.app_url}`;
  exportExcel() {
    const workSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Form List');
    XLSX.writeFile(workBook, 'master_form_list.xlsx');
  }
  _timeout: any = null;
  dta = [];
  constructor(
    private formService: EditAppService,
    private router: Router,
    private snackBar: MatSnackBar,
    private ref: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  displayedColumns = ['sno', 'unique_form_name', 'description', 'date', 'form_action', 'form_data', 'data_count', 'active_inactive', 'link'];
  dataSource = new MatTableDataSource<Form>();

  resultsLength = 0;
  isResultsLoading = false;
  // api_url: `${environment.api_url}`;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  confirmDialog(id): void {
    const message = `Are you sure you want to delete this Form ?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteFormBtnHandler(id);
      }
    });
  }

  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }


  // delete Action
  deleteFormBtnHandler(id) {
    this.formService.deleteForm(id)
      .subscribe((data) => {
        this.ngAfterViewInit();

        this.dataSource.data = [...this.dataSource.data];
        this.snackBar.open('Form Deleted Successfully', 'Success', {
          duration: 2000,
          verticalPosition: 'top'
        })
      }, err => {
        this.errorHandler(err, 'Failed to fetch forms');
      })
  }

  setValue(id, e) {
    var form_active_status: any;
    if (e.checked) {
      form_active_status = true
    } else {
      form_active_status = false
    }

    this.formService.updateFormStatus(id, { form_active_status: form_active_status })
      .subscribe(data => {
        this.snackBar.open('Form Active Status Updated', 'Success', {
          duration: 2000,
          verticalPosition: 'top'
        })
      }, err => {
        this.errorHandler(err, 'Failed to fetch forms');
      });
    // console.log(id + 'Status :' + form_active_status);
  }

  setPublicPrivateValue(id, e) {
    var form_public_link: any;
    if (e.checked) {
      form_public_link = true
    } else {
      form_public_link = false
    }

    this.formService.updatePrivatePublicStatus(id, { form_public_link: form_public_link })
      .subscribe(data => {
        this.snackBar.open('Form Public/Private Status Updated', 'Success', {
          duration: 2000,
          verticalPosition: 'top'
        })
      }, err => {
        this.errorHandler(err, 'Failed to fetch forms');
      });
    // console.log(id + 'Status :' + form_active_status);
  }

  editFormHandler(id) {
    this.router.navigate(['home', id]);
  }

  viewFormBtnHandler(id) {
    // debugger;
    this.router.navigate(['previewForm', id]);
  }

  viewFormResponse(id) {
    this.router.navigate(['formResponse', id]);
  }

  ngOnInit() {
  }
  // Object.keys(obj).length;

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

  ngAfterViewChecked() {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this.ref.detectChanges();
  }

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
        // if()
        for (const i in data) {
          // if()
          console.log(data[i]);
          this.formService.findFormData(data[i]._id).subscribe((value) => {
            this.dta["data_count"] = value.length;
            Object.assign(this.dataSource.data[i], { data_count: value.length });
          })

        }
        // console.log(data)
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

