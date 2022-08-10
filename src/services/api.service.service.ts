import { Subject } from './../models/subject.model';
import { BaseRetail } from './../models/base-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from 'src/models/account.model';
import { BaseReponse} from 'src/models/base-response.model';
import { Classroom } from 'src/models/classroom.model';
import { Teacher } from 'src/models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getAccounts(filter: string = '', offset: number = 0, pageSize: number = 10): Observable<BaseReponse<Account>> {
    return this.http.get<BaseReponse<Account>>(`${this.url}/Account?filter=${filter}&offSet=${offset}&pageSize=${pageSize}`);
  }

  getAccountsById(id: string = '') : Observable<BaseRetail<Account>> {
    return this.http.get<BaseRetail<Account>>(`${this.url}/Account/${id}`)
  }

  // Teacher
  getTeacher(offSet: number = 0, pageSize: number = 20) : Observable<BaseReponse<Teacher>> {
    return this.http.get<BaseReponse<Teacher>>(`${this.url}/Teacher?offSet=${offSet}&pageSize=${pageSize}`)
  }

  getTeacherById(id: string = '') : Observable<BaseRetail<Teacher>> {
    return this.http.get<BaseRetail<Teacher>>(`${this.url}/Teacher/${id}`)
  }
  postTeacher(data: Teacher) {
    return this.http.post<Teacher>(`${this.url}/Teacher`, data)
  }

  deleteTeacher(id: number) {
    return this.http.delete<any>(`${this.url}/Teacher/${id}`)
  }

  // Classroom
  getClassroom(offSet: number = 0, pageSize: number = 0) : Observable<BaseReponse<Classroom>> {
    return this.http.get<BaseReponse<Classroom>>(`${this.url}/Classroom?offSet=${offSet}&pageSize=${pageSize}`)
  }

  getClassroomById(id: string = '') : Observable<BaseRetail<Classroom>> {
    return this.http.get<BaseRetail<Classroom>>(`${this.url}/Classroom/${id}`)
  }

  postClassroom(data: Classroom) {
    return this.http.post<Classroom>(`${this.url}/Classroom`, data)
  }

  deleteClassroom(id: number) {
    return this.http.delete<any>(`${this.url}/Classroom/${id}`)
  }

  // Subject
  getSubject(offSet: number = 0, pageSize: number = 0) : Observable<BaseReponse<Subject>> {
    return this.http.get<BaseReponse<Subject>>(`${this.url}/Subject?offSet=${offSet}&pageSize=${pageSize}`)
  }

  getSubjectById(id: string = '') {
    return this.http.get<BaseRetail<Subject>>(`${this.url}/Subject/${id}`)
  }

}
