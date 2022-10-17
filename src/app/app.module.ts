import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { FormsModule } from '@angular/forms';
import { MyOrderComponent } from './my-order/my-order.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [AppComponent, ProductComponent, MyOrderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IvyCarouselModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
