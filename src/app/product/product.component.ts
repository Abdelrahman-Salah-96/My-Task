import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { elementAt } from 'rxjs';
import { createorder, productinorder1 } from '../Interfaces/createorder';
import { myorder } from '../Interfaces/myorder';
import { product } from '../Interfaces/Product';
import { myorderService } from '../Service/my-order.service';
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
  order = {} as createorder;
  Total = 0;
  constructor(private productservice: ProductService,private myorderservice: myorderService) {}

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
        if (id == element.productId) {
          checkedproduct.orderId = element.productId;
          checkedproduct.productimage = element.productimage;
          checkedproduct.productname= element.productName;
          checkedproduct.productprice = element.productprice;
          checkedproduct.totalprice =
          checkedproduct.productprice * checkedproduct.quantity;
          this.checkedproducts.push(checkedproduct);
        }
      });
    }
    if (!check) {
      if (
        window.confirm('Are You Sure,You Want To Delete This Item ?') == true
      ) {
        this.productlist.forEach((element) => {
          if (id == element.productId) {
            element.selected = false;

            this.checkedproducts.forEach((element1) => {
              if (element1.orderId == element.productId) {
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
        if (id == element.orderId) {
          const index = this.checkedproducts.findIndex(
            (object) => object.orderId === id
          );
          this.checkedproducts.splice(index, 1);
        }
      });

      this.productlist.forEach((element1) => {
        if (id == element1.productId) {
          element1.selected = false;
        }
      });
    }
  }

  makeorder()
  {
    if (window.confirm('Are You Sure,You Want To Buy Those Items ?') == true)
    {

     this.order.grandtotal =  this.Total;
     this.order.productsinorder =[{productid:null,quantity:null,totalprice:null}]
        this.checkedproducts.forEach(element1 =>{
              let x = {} as productinorder1;
              x.productid = element1.orderId
              x.quantity = element1.quantity
              x.totalprice = element1.totalprice
              this.order.productsinorder.push(x)
        });
        this.order.productsinorder.shift()
        this.myorderservice.addneworder(this.order).subscribe(
          (res) =>
          {
            console.log(res)
          }
        ),
        (error) => {
          this.errormsg = error;
        };
    }

    this.checkedproducts=[]
    this.productlist.forEach((element1) => {
        element1.selected = false;
    });

  }
  get total() {
    let price = 0;
    this.checkedproducts.forEach((element) => {
      price += element.quantity * element.productprice;
    });
    this.Total = price
    return price;
  }
}
