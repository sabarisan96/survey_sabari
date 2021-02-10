import { Component, OnInit } from '@angular/core';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { field, value } from '../global.model';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

import { EditAppService } from './services/edit-app.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-app',
  templateUrl: './edit-app.component.html',
  styleUrls: ['./edit-app.component.scss']
})
export class EditAppComponent implements OnInit {

  [x: string]: any;
  showSpinner = false;
  value: value = {
    label: "",
    value: ""
  };
  success = false;

  fieldModels: Array<field> = [
    {
      "type": "text",
      "icon": "",
      "label": "Text",
      "info": false,
      "infomsg": "",
      "description": "Enter your name",
      "placeholder": "Enter your name",
      "className": "form-control",
      "subtype": "text",
      "regex": "",
      "handle": true,
      "toggle": false,
    },
    {
      "type": "email",
      "icon": "",
      "info": false,
      "infomsg": "",
      "required": true,
      "label": "Email",
      "description": "Enter your email",
      "placeholder": "Enter your email",
      "className": "form-control",
      "subtype": "text",
      "regex": "^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]{2,5})$",
      "errorText": "Please enter a valid email",
      "handle": true,
      "toggle": false,
    },
    {
      "type": "phone",
      "info": false,
      "infomsg": "",
      "icon": "perm_phone_msg",
      "label": "Phone",
      "description": "Enter your phone",
      "placeholder": "Enter your phone",
      "className": "form-control",
      "subtype": "text",
      "regex": "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$",
      "errorText": "Please enter a valid phone number",
      "handle": true,
      "toggle": false,
    },
    {
      "type": "number",
      "info": false,
      "infomsg": "",
      "label": "Number",
      "icon": "",
      "description": "Age",
      "placeholder": "Enter your age",
      "className": "form-control",
      "value": "20",
      "min": 12,
      "max": 90
    },
    {
      "type": "date",
      "info": false,
      "infomsg": "",
      "icon": "",
      "label": "Date",
      "placeholder": "Date",
      "className": "form-control",
      "minDate": "",
      "maxDate": ""
    },
    {
      "type": "datetime-local",
      "info": false,
      "infomsg": "",
      "icon": "",
      "label": "DateTime",
      "placeholder": "Date Time",
      "className": "form-control"
    },
    {
      "type": "textarea",
      "info": false,
      "infomsg": "",
      "icon": "",
      "label": "Textarea"
    },
    {
      "type": "paragraph",
      "icon": "",
      "label": "Paragraph",
      "placeholder": "Type your text to display here only"
    },
    {
      "type": "checkbox",
      "info": false,
      "infomsg": "",
      "required": true,
      "label": "Checkbox",
      "icon": "",
      "description": "Checkbox",
      "inline": true,
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        }
      ]
    },
    {
      "type": "radio",
      "icon": "",
      "label": "Radio",
      "description": "Radio boxes",
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        }
      ]
    },
    {
      "type": "autocomplete",
      "info": false,
      "infomsg": "",
      "icon": "",
      "label": "Select",
      "enableMutiSelect": false,
      "description": "Select",
      "placeholder": "Select",
      "className": "form-control",
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        },
        {
          "label": "Option 3",
          "value": "option-3"
        }
      ]
    },
    {
      "type": "file",
      "info": false,
      "infomsg": "",
      "icon": "",
      "label": "File Upload",
      "className": "form-control",
      "subtype": "file"
    },
    {
      "type": "button",
      "icon": "fa-paper-plane",
      "subtype": "submit",
      "label": "Submit"
    }
  ];

  modelFields: Array<field> = [];
  model: any = {
    unique_form_name: 'Form Name...',
    description: 'Form Description...',
    form_active_status: false,
    form_public_link: false,
    theme: {
      bgColor: "ffffff",
      textColor: "555555",
      bannerImage: ""
    },
    attributes: this.modelFields
  };

  report = false;
  reports: any = [];
  // router: any;

  // console.log(form_public_link);
  // setValue(id, e) {
  //   var newLink = this.form_public_link;
  //   console.log(newLink);

  //   // this.formService.updateFormStatus(id, { form_active_status: newLink })
  //   //   .subscribe(data => {
  //   //     this.snackBar.open('Form Active Status Updated', 'Success', {
  //   //       duration: 2000,
  //   //       verticalPosition: 'top'
  //   //     })
  //   //   }, err => {
  //   //     this.errorHandler(err, 'Failed to fetch forms');
  //   //   });
  //   // console.log(id + 'Status :' + form_active_status);
  // }

  constructor(
    private router: Router,
    private formService: EditAppService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }
  update = false;
  create = true;
  ngOnInit() {
    if (window.localStorage.getItem('user_typeid') === '1') {

    } else {
      this.router.navigate(['listForms']);
    }
    // this.route.params.subscribe( params =>{
    //   console.log(params);
    //   this.us.getDataApi('/admin/getFormById',{id:params.id}).subscribe(r=>{
    //     console.log(r);
    //     this.model = r['data'];
    //   });
    // });

    // this.setForm()

    // this.model = this.cs.data; 
    // console.log(this.model.data);
    this.route.params.subscribe(params => {
      let id = params['id'];
      // console.log(id);
      if (id) {
        this.update = true;
        this.create = false;
        this.formService.findFormById(id)
          .subscribe(form => {
            // console.log(form);
            this.model = form;
          }, err => this.errorHandler(err, 'Failed to get form'));
      }
    })
  }


  // private setForm() {
  //   this.route.params.subscribe(params => {
  //     let id = params['id'];
  //     // console.log(id);
  //     if (!id) {
  //       return;
  //     }
  //     this.formService.findFormById(id)
  //       .subscribe(form => {
  //         // console.log(form);
  //         this.model = form;
  //       }, err => this.errorHandler(err, 'Failed to get form'));
  //   })
  // }

  onDragStart(event: DragEvent) {
    console.log("drag started", JSON.stringify(event, null, 2));
  }

  onDragEnd(event: DragEvent) {
    console.log("drag ended", JSON.stringify(event, null, 2));
  }

  onDraggableCopied(event: DragEvent) {
    console.log("draggable copied", JSON.stringify(event, null, 2));
  }

  onDraggableLinked(event: DragEvent) {
    console.log("draggable linked", JSON.stringify(event, null, 2));
  }

  onDragged(item: any, list: any[], effect: DropEffect) {
    if (effect === "move") {
      const index = list.indexOf(item);
      list.splice(index, 1);
    }
  }

  onDragCanceled(event: DragEvent) {
    console.log("drag cancelled", JSON.stringify(event, null, 2));
  }

  onDragover(event: DragEvent) {
    console.log("dragover", JSON.stringify(event, null, 2));
  }

  onDrop(event: DndDropEvent, list?: any[]) {
    if (list && (event.dropEffect === "copy" || event.dropEffect === "move")) {

      if (event.dropEffect === "copy")
        event.data.name = event.data.type + '-' + new Date().getTime();
      let index = event.index;
      if (typeof index === "undefined") {
        index = list.length;
      }
      list.splice(index, 0, event.data);
    }
  }

  addValue(values) {
    values.push(this.value);
    this.value = { label: "", value: "" };
  }

  removeField(i) {
    this.model.attributes.splice(i, 1);
    // SwalComponent
    // swal({
    //   title: 'Are you sure?',
    //   text: "Do you want to remove this field?",
    //   type: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#00B96F',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, remove!'
    // }).then((result) => {
    //   if (result.value) {
    //     this.model.attributes.splice(i, 1);
    //   }
    // });

  }

  updateForm() {
    let input = new FormData;
    input.append('id', this.model._id);
    input.append('name', this.model.unique_form_name);
    input.append('description', this.model.description);
    input.append('bannerImage', this.model.theme.bannerImage);
    input.append('bgColor', this.model.theme.bgColor);
    input.append('textColor', this.model.theme.textColor);
    input.append('attributes', JSON.stringify(this.model.attributes));

    // this.us.putDataApi('/admin/updateForm',input).subscribe(r=>{
    //   console.log(r);
    //   swal('Success','App updated successfully','success');
    // });
  }


  initReport() {
    this.report = true;
    let input = {
      id: this.model._id
    }
    // this.us.getDataApi('/admin/allFilledForms',input).subscribe(r=>{
    //   this.reports = r.data;
    //   console.log('reports',this.reports);
    //   this.reports.map(records=>{
    //     return records.attributes.map(record=>{
    //       if(record.type=='checkbox'){
    //         record.value = record.values.filter(r=>r.selected).map(i=>i.value).join(',');
    //       }
    //     })
    //   });
    // });
  }
  onChange(item) {
    if (item == true) {
      item.toggle
    }
    // item.toggle = true;
  }


  toggleValue(item) {
    item.selected = !item.selected;
  }
  onItemChange(value) {
    console.log(" Value is : ", value);
  }

  insertMasterForm() {
    this.showSpinner = true;
    let input = new FormData;
    // console.log(this.model);
    this.formService.createForm(this.model).subscribe(data => {
      this.showSpinner = false;
      // snachBar
      const resp = JSON.stringify(data);
      const mesg = JSON.parse(resp);
      this.snackBar.open('Form Created Successfully', 'Success', {
        duration: 2000,
        verticalPosition: 'top'
      })
      this.router.navigate(['/', 'listForms']);
    }, err => {
      this.errorHandler(err, err.error);
      this.showSpinner = false;
      // console.log(err);
      // console.log(err), () => this.showSpinner = false;
    })
  }

  updateMasterForm() {

    this.formService.updateForm(this.model._id, this.model).subscribe(data => {
      this.showSpinner = false;
      // snachBar
      const resp = JSON.stringify(data);
      const mesg = JSON.parse(resp);
      this.snackBar.open('Form Updated Successfully', 'Success', {
        duration: 2000,
        verticalPosition: 'top'
      })
      this.router.navigate(['/', 'listForms']);
    }, err => {
      this.errorHandler(err, err.error);
      this.showSpinner = false;
      // console.log(err);
      // console.log(err), () => this.showSpinner = false;
    })
  }

  private errorHandler(error, message) {
    this.snackBar.open(message, 'Error', {
      duration: 2000,
      verticalPosition: 'top'
    })
  }

  submit() {
    var datas: Array<field> = [];

    let valid = true;
    let validationArray = JSON.parse(JSON.stringify(this.model.attributes));
    validationArray.reverse().forEach(field => {

      // console.log(field.label + '=>' + field.required + "=>" + field.value);
      if (field.required && !field.value && field.type != 'checkbox') {
        // swal('Error', 'Please enter ' + field.label, 'error');
        valid = false;
        return false;
      }
      if (field.required && field.regex) {
        let regex = new RegExp(field.regex);
        if (regex.test(field.value) == false) {
          // swal('Error', field.errorText, 'error');
          valid = false;
          return false;
        }
      }
      if (field.required && field.type == 'checkbox') {
        if (field.values.filter(r => r.selected).length == 0) {
          // swal('Error', 'Please enterrr ' + field.label, 'error');
          valid = false;
          return false;
        }

      }
    });
    if (!valid) {
      return false;
    }
    console.log('Save', this.model);
    let input = new FormData;
    input.append('formId', this.model._id);
    input.append('attributes', JSON.stringify(this.model.attributes))
    // this.us.postDataApi('/user/formFill',input).subscribe(r=>{
    //   console.log(r);
    //   swal('Success','You have contact sucessfully','success');
    //   this.success = true;
    // },error=>{
    //   swal('Error',error.message,'error');
    // });
  }

}
