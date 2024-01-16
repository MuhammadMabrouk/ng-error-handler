import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ResourceWithId {
  id: number | string;
}

@Injectable({
  providedIn: 'root',
})
export abstract class BaseHttpService<T extends ResourceWithId> {
  abstract url: string;

  private http = inject(HttpClient);

  getAll(): Observable<{ [key: string]: T[] }> {
    return this.http.get<{ [key: string]: T[] }>(this.url);
  }

  create(resource: Omit<T, 'id'>): Observable<T> {
    return this.http.post<T>(`${this.url}/add`, resource);
  }

  update(resource: T): Observable<T> {
    return this.http.put<T>(`${this.url}/${resource.id}`, resource);
  }

  delete(resource: T): Observable<void> {
    return this.http.delete<void>(`${this.url}/${resource.id}`);
  }
}
