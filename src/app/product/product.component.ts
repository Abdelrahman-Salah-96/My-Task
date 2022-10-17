import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { elementAt } from 'rxjs';
import { myorder } from '../Interfaces/myorder';
import { product } from '../Interfaces/Product';
import { ProductService } from '../Service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productlist: product[] = [];
  errormsg;
  checkedproducts: myorder[] = [];

  constructor(private productservice: ProductService) {}

  ngOnInit(): void {
    this.productservice.getALLProduct().subscribe((data) => {
      this.productlist = data;
    }),
      (error) => {
        this.errormsg = error;
      };
  }
  getproduct($event) {
    const check = $event.target.checked;
    const id = $event.target.value;

    if (check) {
      this.productlist.forEach((element) => {
        let checkedproduct = { totalprice: 0 , quantity:1 } as myorder;
        if (id == element.id) {
          checkedproduct.id = element.id;
          checkedproduct.img = element.img;
          checkedproduct.name = element.name;
          checkedproduct.price = element.price;
          checkedproduct.totalprice =
          checkedproduct.price * checkedproduct.quantity;
          this.checkedproducts.push(checkedproduct);
        }
      });
    }
    if (!check) {
      if (
        window.confirm('Are You Sure,You Want To Delete This Item ?') == true
      ) {
        this.productlist.forEach((element) => {
          if (id == element.id) {
            element.selected = false;

            this.checkedproducts.forEach((element1) => {
              if (element1.id == element.id) {
                const index = this.checkedproducts.indexOf(element1);
                this.checkedproducts.splice(index, 1);
              }
            });
          }
        });
      }
    }
  }
  deleteRow(id) {
    if (window.confirm('Are You Sure,You Want To Delete This Item ?') == true) {
      this.checkedproducts.forEach((element) => {
        if (id == element.id) {
          const index = this.checkedproducts.findIndex(
            (object) => object.id === id
          );
          this.checkedproducts.splice(index, 1);
        }
      });

      this.productlist.forEach((element1) => {
        if (id == element1.id) {
          element1.selected = false;
        }
      });
    }
  }

  get total() {
    let price = 0;
    this.checkedproducts.forEach((element) => {
      price += element.quantity * element.price;
    });
    return price;
  }
}
