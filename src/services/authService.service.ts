import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseRetail } from 'src/models/base-response.model';
import { Authentication } from 'src/models/authentication.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {  
  
  private url = environment.baseUrl
  
  constructor(private http: HttpClient) {}

  // Đăng nhập
  login(data: any) : Observable<BaseRetail<Authentication>> {
    return this.http.post<BaseRetail<Authentication>>(`${this.url}/Authentication/authenticate`, data)
  }
}