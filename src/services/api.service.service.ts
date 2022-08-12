import { Slide } from './../models/slide.model';
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
import { Menu } from 'src/models/menu.model';
import { FAQ } from 'src/models/faq.model';

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
  getTeacher(offSet: number = 0, pageSize: number = 0, filter = '') : Observable<BaseReponse<Teacher>> {
    return this.http.get<BaseReponse<Teacher>>(`${this.url}/Teacher?offSet=${offSet}&pageSize=${pageSize}&filter=${filter}`)
  }

  getTeacherById(id: string = '') : Observable<BaseRetail<Teacher>> {
    return this.http.get<BaseRetail<Teacher>>(`${this.url}/Teacher/${id}`)
  }
  postTeacher(data: Teacher) {
    return this.http.post<Teacher>(`${this.url}/Teacher`, data)
  }

  deleteTeacher(id: string) {
    return this.http.delete<any>(`${this.url}/Teacher/${id}`)
  }

  // Classroom
  getClassroom(offSet: number = 0, pageSize: number = 0, filter = '', status = '') : Observable<BaseReponse<Classroom>> {
    return this.http.get<BaseReponse<Classroom>>(`${this.url}/Classroom?offSet=${offSet}&pageSize=${pageSize}&filter=${filter}&status=${status}`)
  }

  getClassroomById(id: string = '') : Observable<BaseRetail<Classroom>> {
    return this.http.get<BaseRetail<Classroom>>(`${this.url}/Classroom/${id}`)
  }

  postClassroom(data: Classroom) {
    return this.http.post<Classroom>(`${this.url}/Classroom`, data)
  }

  deleteClassroom(id: string) {
    return this.http.delete<any>(`${this.url}/Classroom/${id}`)
  }

  // Subject
  getSubject(offSet: number = 0, pageSize: number = 0, classId = '', filter = '') : Observable<BaseReponse<Subject>> {
    return this.http.get<BaseReponse<Subject>>(`${this.url}/Subject?offSet=${offSet}&pageSize=${pageSize}&classId=${classId}&filter=${filter}`)
  }

  getSubjectById(id: string = '') {
    return this.http.get<BaseRetail<Subject>>(`${this.url}/Subject/${id}`)
  }

  postSubject(data: Subject) {
    return this.http.post<Subject>(`${this.url}/Subject`, data)
  }

  deleteSubject(id: string) {
    return this.http.delete(`${this.url}/Subject/${id}`)
  }

  // Menu
  getMenusTree(offSet: number = 0, pageSize: number = 100, filter = "", screen = "", status = -1 ) : Observable<BaseReponse<Menu>> {
    return this.http.get<BaseReponse<Menu>>(`${this.url}/Menu/GetMenusTree?filter=${filter}&offSet=${offSet}&pageSize=${pageSize}&screen=${screen}&status=${status}`)
  }

  // Slide
  getSlide(offSet: number = 0, pageSize: number = 0, screen = '', filter = '') : Observable<BaseReponse<Slide>> {
    return this.http.get<BaseReponse<Slide>>(`${this.url}/Slide?offSet=${offSet}&pageSize=${pageSize}&screen=${screen}&filter=${filter}`)
  }

  // FAQ
  getFAQ(offSet: number = 0, pageSize: number = 0, filter = '') : Observable<BaseReponse<FAQ>> {
    return this.http.get<BaseReponse<FAQ>>(`${this.url}/FAQ?offSet=${offSet}&pageSize=${pageSize}&filter=${filter}`)
  }

  getFAQById(id: string = '') : Observable<BaseRetail<FAQ>> {
    return this.http.get<BaseRetail<FAQ>>(`${this.url}/FAQ/${id}`)
  }

  postFAQ(data: FAQ) {
    return this.http.post<FAQ>(`${this.url}/FAQ`, data)
  }

  deleteFAQ(id: string) {
    return this.http.delete(`${this.url}/FAQ/${id}`)
  }

}
