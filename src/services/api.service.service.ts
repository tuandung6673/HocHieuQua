import { CourseSchedule } from './../models/courseSchedule.model';
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
import { Course } from 'src/models/course.model';
import { Role } from 'src/models/role.model';
import { Message } from 'src/models/message.model';
import { Test } from 'src/models/test.model';
import { New } from 'src/models/new.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  // Account
  getAccounts(filter: string = '', offset: number = 0, pageSize: number = 10, RoleId: string =''): Observable<BaseReponse<Account>> {
    return this.http.get<BaseReponse<Account>>(`${this.url}/Account?filter=${filter}&offSet=${offset}&pageSize=${pageSize}&RoleId=${RoleId}`);
  }

  getAccountsById(id: string = '') : Observable<BaseRetail<Account>> {
    return this.http.get<BaseRetail<Account>>(`${this.url}/Account/${id}`)
  }

  postAccount(data: Account) {
    return this.http.post<Message>(`${this.url}/Account`, data)
  }

  deleteAccount(id: string) {
    return this.http.delete(`${this.url}/Account/${id}`)
  }

  // Role
  getRoles(offSet: number = 0, pageSize: number = 1000, filter : string = '') : Observable<BaseReponse<Role>> {
    return this.http.get<BaseReponse<Role>>(`${this.url}/Role?offSet=${offSet}&pageSize=${pageSize}&filter=${filter}`)
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
  getClassroom(offSet: number = 0, pageSize: number = 0, filter = '') : Observable<BaseReponse<Classroom>> {
    return this.http.get<BaseReponse<Classroom>>(`${this.url}/Classroom?offSet=${offSet}&pageSize=${pageSize}&filter=${filter}`)
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

  getSlideById(id: string) : Observable<BaseRetail<Slide>> {
    return this.http.get<BaseRetail<Slide>>(`${this.url}/Slide/${id}`)
  }

  postSlide(data: Slide) {
    return this.http.post<Slide>(`${this.url}/Slide`, data)
  }

  deleteSlide(id: string) {
    return this.http.delete(`${this.url}/Slide/${id}`)
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

  // Course
  getCourse(offSet: number = 0, pageSize: number = 10, filter = '', status: number = -1, isPayment: number = -1, teacherId = '', accountId = '', subjectId = '', classId = '') : Observable<BaseReponse<Course>> {
    return this.http.get<BaseReponse<Course>>(`${this.url}/Course?offSet=${offSet}&pageSize=${pageSize}&filter=${filter}&status=${status}&isPayment=${isPayment}&teacherId=${teacherId}&accountId=${accountId}&subjectId=${subjectId}&classId=${classId}`)
  }

  getCourseById(id: string = '') : Observable<BaseRetail<Course>> {
    return this.http.get<BaseRetail<Course>>(`${this.url}/Course/${id}`)
  }

  postCourse(data: Course) {
    return this.http.post(`${this.url}/Course`, data)
  }

  deleteCourse(id: string) {
    return this.http.delete(`${this.url}/Course/${id}`)
  }

  // CourseSchedule
  getCourseSchedule(offSet: number = 0, pageSize: number = 1000, courseId: string, filter = '') : Observable<BaseReponse<CourseSchedule>> {
    return this.http.get<BaseReponse<CourseSchedule>>(`${this.url}/CourseSchedule?offSet=${offSet}&pageSize=${pageSize}&courseId=${courseId}&filter=${filter}`)
  }

  // Tesst

  getTest(offSet: number = 0, pageSize: number = 10, filter = '', classId = '', courseId = '', subjectId = '', testCategoryId = '') : Observable<BaseReponse<Test>> {
    return this.http.get<BaseReponse<Test>>(`${this.url}/test?offSet=${offSet}&pageSize=${pageSize}&filter=${filter}&classId=${classId}&courseId=${courseId}&subjectId=${subjectId}&testCategoryId=${testCategoryId}`)
  }

  getTestById(id: string) : Observable<BaseRetail<Test>> {
    return this.http.get<BaseRetail<Test>>(`${this.url}/test/${id}`)
  }

  // News
  getNew(offSet: number = 0, pageSize: number = 100, categoryId = '', filter = '') : Observable<BaseReponse<New>> {
    return this.http.get<BaseReponse<New>>(`${this.url}/New?offSet=${offSet}&pageSize=${pageSize}&categoryId=${categoryId}&filter=${filter}`)
  }

}
