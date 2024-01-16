import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppErrorHandler } from './core/error-handler/app-error-handler';
import { AppHttpErrorHandler } from './core/error-handler/app-http-error-handler.interceptor';

import { AppComponent } from './app.component';
import { ToastrComponent } from './core/toastr/toastr.component';
import { ProductsComponent } from './components/products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    ToastrComponent,
    ProductsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpErrorHandler,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
