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

  addToast(type?: Toast['type']): void {
    this.toastr.add({
      message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      ...(type && { type }),
      // autoDismiss: false,
    });
  }

  // mock and test any HTTP
  mockHttp(status: number) {
    this.http.get(`https://dummyjson.com/http/${status}`).subscribe();
  }
}
