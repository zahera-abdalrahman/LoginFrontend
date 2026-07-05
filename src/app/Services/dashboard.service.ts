import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private base = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.base}/users`);
  }

  getPosts(): Observable<any> {
    return this.http.get(`${this.base}/posts`);
  }

  getComments(): Observable<any> {
    return this.http.get(`${this.base}/comments`);
  }

  getTodos(): Observable<any> {
    return this.http.get(`${this.base}/todos`);
  }

  getAll(): Observable<any> {
    return forkJoin({
      users: this.getUsers(),
      posts: this.getPosts(),
      comments: this.getComments(),
      todos: this.getTodos(),
    });
  }
}
