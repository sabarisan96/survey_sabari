import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditAppService } from '../edit-app/services/edit-app.service';
import { MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-form-response',
  templateUrl: './form-response.component.html',
  styleUrls: ['./form-response.component.scss']
})
export class FormResponseComponent implements OnInit {
  formData: any[] = [];
  toppings = new FormControl();
  constructor(private route: ActivatedRoute, private formService: EditAppService, public router: Router, private _location: Location, private dialog: MatDialog, private snackBar: MatSnackBar) { }
  dwa = [];
  ngOnInit() {

  }
  detailedFormData(id) {
    this.router.navigate(['detailReport', id]);
  }

  backClicked() {
    this._location.back();
  }


  result = [];
  dta: any;
  formName = '';
  tableCoulmnOption = [];
  dtaheader = Array();


  getFormValue() {

    this.route.params.subscribe(params => {
      let id = params['id'];
      if (!id) {
        return;
      }
      var self = this;
      this.formService.findFormData(id)
        .subscribe(form => {

          this.tableCoulmnOption = form[0]['data'].attributes.name;
          this.dtaheader = form[0]['data'].attributes;
          // console.log(this.dtaheader);
          // console.log(form[0]['data']['attributes']);
          for (var i in this.dtaheader) {
            this.dtaheader[i]['display'] = true;

            if (this.dtaheader[i]['type'] != "button") {
              this.result.push(this.dtaheader[i]['name'])
              // console.log(this.dtaheader[i]['name']);
            }
          }
          this.dtaheader.push(this.dtaheader);

          // console.log(this.dtaheader)
          this.formName = form[0]['data']['unique_form_name'];
          this.formData = form;
        });

    })
    this.toppings.setValue(this.result);
  }

  confirmDialog(id): void {
    const message = `Are you sure you want to delete this Record ?`;

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

  editFormData(form_id, id) {
    this.router.navigate(['editFormData', form_id, id]);
    // console.log(id);
  }

  deleteFormBtnHandler(id) {

    this.formService.deleteFormData(id)
      .subscribe((data) => {
        this.snackBar.open('Form Deleted Successfully', 'Success', {
          duration: 2000,
          verticalPosition: 'top'
        });
        // this.ngAfterViewInit();
        this.router.navigate(['listForms']);
      }, err => {
        this.errorHandler(err, 'Failed to fetch forms');
      });
  }

  private ngAfterViewInit() {
    this.getFormValue();

  }

  private errorHandler(error, message) {
    // this.isResultsLoading = false;
    this.snackBar.open(message, 'Error', {
      duration: 2000,
      verticalPosition: 'top'
    })
  }
  toggleValue(item) {
    for (var i in this.dtaheader) {
      if (this.dtaheader[i]['name'] == item) {
        this.dtaheader[i]['display'] = !this.dtaheader[i]['display'];
      }
    }
  }

}

