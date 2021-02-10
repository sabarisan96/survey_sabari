import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditAppService } from '../edit-app/services/edit-app.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-response-detail',
  templateUrl: './response-detail.component.html',
  styleUrls: ['./response-detail.component.scss']
})
export class ResponseDetailComponent implements OnInit {

  constructor(public route: ActivatedRoute, public formService: EditAppService, private _location: Location) { }
  // formData: any[] = [];
  private formData = [];
  formName = '';
  ngOnInit() {
    this.getFormValue();
  }

  backClicked() {
    this._location.back();
  }

  getFormValue() {
    this.route.params.subscribe(params => {
      let id = params['id'];

      if (!id) {
        return;
      }
      var self = this;
      this.formService.findFormDataSingle(id)
        .subscribe(form => {
          // console.log(form);
          this.formData.push(form);
          this.formName = this.formData[0].data.unique_form_name
        });

    })
  }

}
