import { Component, OnInit } from '@angular/core';
import { ToastrService } from './core/toastr/toastr.service';
import { Toast } from './core/toastr/toastr.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  toasts$: Observable<Toast[]>;

  constructor(private toastr: ToastrService, private http: HttpClient) {}

  ngOnInit(): void {
    this.toasts$ = this.toastr.toasts$;
  }

  addInfoToast(): void {
    this.toastr.info({ message: 'A simple info alert - check it out!' });
  }

  addSuccessToast(): void {
    this.toastr.success({ message: 'A simple success alert - check it out!' });
  }

  addWarningToast(): void {
    this.toastr.warning({ message: 'A simple warning alert - check it out!' });
  }

  addDangerToast(): void {
    this.toastr.danger({ message: 'A simple danger alert - check it out!' });
  }

  // mock and test any HTTP
  mockHttp(status: number) {
    this.http.get(`https://dummyjson.com/http/${status}`).subscribe();
  }
}
