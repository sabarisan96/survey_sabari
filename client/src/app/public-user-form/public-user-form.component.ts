import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditAppService } from '../edit-app/services/edit-app.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { field } from '../global.model';

@Component({
  selector: 'app-public-user-form',
  templateUrl: './public-user-form.component.html',
  styleUrls: ['./public-user-form.component.scss']
})
export class PublicUserFormComponent implements OnInit {
  constructor(private route: ActivatedRoute, private formService: EditAppService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private router: Router) { }
  uploadForm: FormGroup;
  modelFields: Array<field> = [];
  Errormsg = '';
  formDataId = '';
  ngOnInit() {
    this.setForm();

  }
  model: any = {
    attributes: [],

  }

  edit = false;
  create = true;
  private setForm() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      let id2 = params['id2'];
      if (id && id2) {
        this.formDataId = id2;
        this.edit = true;
        this.create = false;
        this.formService.findFormDataSinglePublic(id2).subscribe(form => {
          this.model = form.data;
        }, err => this.errorHandler(err, 'Failed to get form'));
      } else if (id) {
        this.edit = false;
        this.create = true;

        this.formService.findFormByIdPublic(id)
          .subscribe(form => {

            this.model = form;
          }, err => this.errorHandler(err, 'Failed to get form'));
      }

    })
  }

  onUpdate() {
    let object = {};
    let valid = true;
    let object1 = {};
    // console.log(this.model);
    let validationArray = JSON.parse(JSON.stringify(this.model.attributes));
    // console.log(this.model);
    // debugger;
    object['unique_form_name'] = this.model.unique_form_name;
    // object.push("name:" + this.model.name);
    validationArray.forEach(field => {
      if (field.required && !field.value && field.type != 'checkbox') {
        // swal('Error', 'Please enter ' + field.label, 'error');
        // this.Errormsg = 'Please enter ' + field.label;
        this.snackBar.open('Please Enter/Select ' + field.label, 'Error', {
          duration: 2000,
          verticalPosition: 'top'
        })
        valid = false;
        return false;
      }
      if (field.required && field.regex) {
        let regex = new RegExp(field.regex);
        if (regex.test(field.value) == false) {
          // swal('Error', field.errorText, 'error');
          this.snackBar.open(field.errorText, 'Error', {
            duration: 2000,
            verticalPosition: 'top'
          })
          valid = false;
          return false;
        }
      }

      if (field.type == 'checkbox') {
        field.value = field.values.filter(r => r.selected).map(i => i.value).join(',');
      }

      if (field.type != "button") {
        // object[field.name] = field.value;
        // object.push('' + field.name + ':' + field.value);
      }

      if (field.required && field.type == 'checkbox') {
        if (field.values.filter(r => r.selected).length == 0) {
          // swal('Error', 'Please enterrr ' + field.label, 'error');
          this.snackBar.open(field.errorText, 'Error', {
            duration: 2000,
            verticalPosition: 'top'
          })
          valid = false;
          return false;
        }
      }

    });

    // object.sort((b, a) => b.order - a.order);
    if (!valid) {
      return false;
    }
    // object1['form_id'] = this.model._id;
    object1['data'] = this.model;

    this.formService.updateFormDataPublic(this.formDataId, object1)
      .subscribe(data => {
        // console.log(data);
        this.snackBar.open('Form Data Updated Successfully', 'Success', {
          duration: 2000,
          verticalPosition: 'top'
        })
        this.router.navigate([`formResponse/${this.model._id}`]);
      })

  }

  toggleValue(item) {
    // console.log(item.selected);
    item.selected = !item.selected;
  }
  onSubmit() {

    let object = {};
    let result = {};
    let result1 = {};
    let valid = true;
    let object1 = {};
    let validationArray = JSON.parse(JSON.stringify(this.model.attributes));
    // console.log(this.model);
    // debugger;
    object['unique_form_name'] = this.model.unique_form_name;
    // object.push("name:" + this.model.name);
    validationArray.forEach(field => {
      if (field.required && !field.value && field.type != 'checkbox') {
        // swal('Error', 'Please enter ' + field.label, 'error');
        // this.Errormsg = 'Please enter ' + field.label;
        this.snackBar.open('Please Enter/Select ' + field.label, 'Error', {
          duration: 2000,
          verticalPosition: 'top'
        })
        valid = false;
        return false;
      }
      if (field.required && field.regex) {
        let regex = new RegExp(field.regex);
        if (regex.test(field.value) == false) {
          // swal('Error', field.errorText, 'error');
          this.snackBar.open(field.errorText, 'Error', {
            duration: 2000,
            verticalPosition: 'top'
          })
          valid = false;
          return false;
        }
      }

      if (field.type == 'checkbox') {
        field.value = field.values.filter(r => r.selected).map(i => i.value).join(',');
      }

      if (field.type != "button") {
        object[field.name] = field.value;
        // object.push('' + field.name + ':' + field.value);
      }

      if (field.required && field.type == 'checkbox') {
        if (field.values.filter(r => r.selected).length == 0) {
          // swal('Error', 'Please enterrr ' + field.label, 'error');
          this.snackBar.open(field.errorText, 'Error', {
            duration: 2000,
            verticalPosition: 'top'
          })
          valid = false;
          return false;
        }
      }

    });

    // object.sort((b, a) => b.order - a.order);
    if (!valid) {
      return false;
    }
    result = object;
    object1['form_id'] = this.model._id;
    object1['data'] = this.model;
    this.formService.insertFormDataPublic(object1).subscribe(data => {
      const resp = JSON.stringify(data);
      const mesg = JSON.parse(resp);
      this.snackBar.open('Form Data Submitted', 'Success', {
        duration: 2000,
        verticalPosition: 'top'
      })
      this.router.navigate(['login']);
    });


  }

  private errorHandler(error, message) {
    this.snackBar.open(message, 'Error', {
      duration: 2000,
      verticalPosition: 'top'
    })
  }
}
