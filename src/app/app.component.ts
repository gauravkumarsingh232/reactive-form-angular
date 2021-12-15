import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

export interface Employee {
  id: number;
  name: string;
  email: string;
}

export interface APIResponse {
  responseDataList: Employee[];
  errorMessage: string;
  statusCode: number;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  employeeList: APIResponse;
  reactiveForm: FormGroup;

  getArray() {
    const length = this.employeeList.responseDataList.length;
    var array = [];
    for (var i = 0; i < length; i++) {
      array[i] = this.getCheckBoxesInputFormGroup(
        this.employeeList.responseDataList[i]
      );
    }
    return array;
  }

  getCheckBoxesInputFormGroup(employee: Employee) {
    return this._fb.group({
      checked: new FormControl(false),
      id: [employee.id],
      name: [employee.name],
      email: [employee.email],
    });
  }

  constructor(private _fb: FormBuilder, private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient.get('assets\\employee.json').subscribe(
      (res) => {
        console.log(res);
        this.employeeList = res as APIResponse;
        this.reactiveForm = this._fb.group({
          rows: this._fb.array(this.getArray()),
        });
      },
      (err) => {
        console.log(err);
      }
    );

    /*
    this.employeeList = {
      responseDataList: [
        {
          id: 1,
          name: 'Gusty',
          email: 'gchartre0@twitter.com',
        },
        {
          id: 2,
          name: 'Josselyn',
          email: 'jissakov1@de.vu',
        },
        {
          id: 3,
          name: 'Deanne',
          email: 'dbonney2@yellowbook.com',
        },
      ],
      errorMessage: '',
      statusCode: 0,
    };

    this.reactiveForm = this._fb.group({
      rows: this._fb.array(this.getArray()),
    }); */
  }

  onFISubmit() {
    console.log(this.reactiveForm.value);
  }
}
