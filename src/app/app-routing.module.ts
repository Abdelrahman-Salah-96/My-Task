import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyOrderComponent } from './my-order/my-order.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {path:'',redirectTo:'/product',pathMatch:'full'},
  {path:'product',component:ProductComponent},
  {path:'myorder',component:MyOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
