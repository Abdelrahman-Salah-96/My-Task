import { Component, OnInit } from '@angular/core';
import { myorder } from '../Interfaces/myorder';
import * as XLSX from 'xlsx';
import { myorderService } from '../Service/my-order.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css'],
})
export class MyOrderComponent implements OnInit {
  myxlsxFileName = 'data sheet from angular.xlsx';
  p: number = 1;
  count: number =3;
  searchvalue: string = '';
  valuefrom: string = '';
  valueto: string = '';
  arr_from_inputs: myorder[] = [];
  mydata: myorder[] = [];
  errormsg: string;
  constructor(private myorderservice: myorderService) {}

  ngOnInit(): void {
    this.myorderservice.getALLMyorder().subscribe((data) => {
      this.mydata = data;
    }),
      (error) => {
        this.errormsg = error;
      };
  }
  handlePageChange() {}
  search() {
    if (this.searchvalue !== '') {
      this.arr_from_inputs = this.mydata.filter((obj) => {
        return obj.name.toLowerCase() === this.searchvalue.toLowerCase();
      });
    }
    if (this.valuefrom && this.valueto !== '') {
      this.arr_from_inputs = this.mydata.filter((obj) => {
        return (
          obj.price <= parseInt(this.valueto) &&
          obj.price >= parseInt(this.valuefrom)
        );
      });
    if (this.valuefrom && this.valueto && this.searchvalue !== '') {
       this.arr_from_inputs = this.mydata.filter((obj) => {
         return (
            obj.price <= parseInt(this.valueto) &&
            obj.price >= parseInt(this.valuefrom) &&
            obj.name.toLowerCase() == this.searchvalue.toLowerCase()
        );
      });
      }
    }
    console.log(this.arr_from_inputs);
  }
  resetvalue() {
    this.searchvalue = '';
    this.valuefrom = '';
    this.valueto = '';
    this.arr_from_inputs =[]
  }
  extractxlsx() {
    if (window.confirm('Are You Sure,You Want To Extract This Search Result To XLSX File ?') == true) {
    const element = document.getElementById('tableId');
    const workSheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'mySheet1');
    XLSX.writeFile(workBook, this.myxlsxFileName);
  }
}
}
