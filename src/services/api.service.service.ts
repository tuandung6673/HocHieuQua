import { Guide } from './../models/guide.model';
import { CourseSchedule } from './../models/courseSchedule.model';
import { Slide } from './../models/slide.model';
import { Subject } from './../models/subject.model';
import { BaseRetail } from './../models/base-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from 'src/models/account.model';
import { BaseReponse} from 'src/models/base-response.model';
import { Classroom } from 'src/models/classroom.model';
import { Teacher } from 'src/models/teacher.model';
import { MenusTree } from 'src/models/menusTree.model';
import { FAQ } from 'src/models/faq.model';
import { Course } from 'src/models/course.model';
import { Role } from 'src/models/role.model';
import { Message } from 'src/models/message.model';
import { Test } from 'src/models/test.model';
import { New } from 'src/models/new.model';
import { NewCatagory } from 'src/models/newCategory.model';
import { Recruit } from 'src/models/recruit.model';
import { Menu } from 'src/models/menu.model';
import { Footer } from 'primeng/api';
import { Home } from 'src/models/home.model';
import { Comment } from 'src/models/comment.model';
import { RecruitCandidate } from 'src/models/recruitCandidate.model';
import { CheckPayment } from 'src/models/checkPayment.model';
import { CourseRating } from 'src/models/courseRating.model';
import { Advice } from 'src/models/advice.model';
import { PaymentType} from 'src/models/paymentType.model';
import { Payment } from 'src/models/payment.model';
import { TestQuestion } from 'src/models/testQuestion.model';
import { TestQuestionGroup } from 'src/models/testQuestionGroup.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  // Account
  getAccounts(queryParams): Observable<BaseReponse<Account>> {
    return this.http.get<BaseReponse<Account>>(`${this.url}/Account?` + queryParams);
  }

  getAccountsById(id: string = '') : Observable<BaseRetail<Account>> {
    return this.http.get<BaseRetail<Account>>(`${this.url}/Account/${id}`)
  }

  getAccountByUserName(queryParams) : Observable<BaseRetail<Account>> {
    return this.http.get<BaseRetail<Account>>(`${this.url}/Account/GetAccountByUserName?` + queryParams)
  }

  setAccountChangePassword(queryParams) : Observable<any> {
    return this.http.post<any>(`${this.url}/Account/SetAccountChangePassword`, queryParams)
  }

  postAccount(data: Account) {
    return this.http.post<Message>(`${this.url}/Account`, data)
  }

  setAccountUser(data) : Observable<any> {
    return this.http.post<any>(`${this.url}/Account/SetAccountUser`, data)
  }

  deleteAccount(id: string) {
    return this.http.delete(`${this.url}/Account/${id}`)
  }

  updateAccountInfo(data) : Observable<any> {
    return this.http.put(`${this.url}/Account/UpdateAccountInfo`, data)
  }

  // AccountRegister
  postAccountRegister(data: Account) {
    return this.http.post<Message>(`${this.url}/Account/SetAccountRegister`, data)
  }

  // Advice
  getAdvice(queryParams) : Observable<BaseReponse<Advice>> {
    return this.http.get<BaseReponse<Advice>>(`${this.url}/AdviceRequest?` + queryParams)
  }

  postAdvice(data) : Observable<Message> {
    return this.http.post<Message>(`${this.url}/AdviceRequest`, data)
  }

  getAdviceById(id) : Observable<BaseRetail<Advice>> {
    return this.http.get<BaseRetail<Advice>>(`${this.url}/AdviceRequest/${id}`)
  }

  deleteAdvice(id) : Observable<BaseRetail<CheckPayment>> {
    return this.http.delete<BaseRetail<CheckPayment>>(`${this.url}/AdviceRequest/${id}`)
  }

  postAdviceUpdateStatus(queryParams) : Observable<BaseRetail<CheckPayment>> {
    return this.http.post<BaseRetail<CheckPayment>>(`${this.url}/AdviceRequest/SetAdviceRequestUpdateStatus`, queryParams)
  }

  // Role
  getRoles(queryParams) : Observable<BaseReponse<Role>> {
    return this.http.get<BaseReponse<Role>>(`${this.url}/Role?` + queryParams)
  }

  // Teacher
  getTeacher(offSet: number = 0, pageSize: number = 1000, filter = '') : Observable<BaseReponse<Teacher>> {
    return this.http.get<BaseReponse<Teacher>>(`${this.url}/Teacher?offSet=${offSet}&pageSize=${pageSize}&filter=${filter}`)
  }

  getTeacherById(id: string = '') : Observable<BaseRetail<Teacher>> {
    return this.http.get<BaseRetail<Teacher>>(`${this.url}/Teacher/${id}`)
  }
  postTeacher(data: Teacher) {
    return this.http.post<Message>(`${this.url}/Teacher`, data)
  }

  deleteTeacher(id: string) {
    return this.http.delete<any>(`${this.url}/Teacher/${id}`)
  }

  // Classroom
  getClassroom(offSet: number = 0, pageSize: number = 100, filter = '') : Observable<BaseReponse<Classroom>> {
    return this.http.get<BaseReponse<Classroom>>(`${this.url}/Classroom?offSet=${offSet}&pageSize=${pageSize}&filter=${filter}`)
  }

  getClassroomById(id: string = '') : Observable<BaseRetail<Classroom>> {
    return this.http.get<BaseRetail<Classroom>>(`${this.url}/Classroom/${id}`)
  }

  postClassroom(data: Classroom) {
    return this.http.post<Message>(`${this.url}/Classroom`, data)
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
    return this.http.post<Message>(`${this.url}/Subject`, data)
  }

  deleteSubject(id: string) {
    return this.http.delete(`${this.url}/Subject/${id}`)
  }

  // Home
  getHome() : Observable<BaseRetail<Home>> {
    return this.http.get<BaseRetail<Home>>(`${this.url}/Home`)
  }

  // Menu
  getMenu(filter = '', offSet: number = 0, pageSize: number = 100, screen = '', status: number = 1) : Observable<BaseReponse<Menu>> {
    return this.http.get<BaseReponse<Menu>>(`${this.url}/Menu?filter=${filter}&offSet=${offSet}&pageSize=${pageSize}&screen=${screen}&status=${status}`)
  }

  // MenusTree
  getMenusTree(offSet: number = 0, pageSize: number = 100, filter = "", screen = "", status = -1 ) : Observable<BaseReponse<MenusTree>> {
    return this.http.get<BaseReponse<MenusTree>>(`${this.url}/Menu/GetMenusTree?filter=${filter}&offSet=${offSet}&pageSize=${pageSize}&screen=${screen}&status=${status}`)
  }
  
  // Footer
  getFooter(offSet: number = 0, pageSize: number = 100, filter = '') : Observable<BaseReponse<Footer>> {
    return this.http.get<BaseReponse<Footer>>(`${this.url}/footer?offSet=${offSet}&pageSize=${pageSize}&filter=${filter}`)
  }

  // Slide
  getSlide(offSet: number = 0, pageSize: number = 0, screen = '', filter = '') : Observable<BaseReponse<Slide>> {
    return this.http.get<BaseReponse<Slide>>(`${this.url}/Slide?offSet=${offSet}&pageSize=${pageSize}&screen=${screen}&filter=${filter}`)
  }

  getSlideById(id: string) : Observable<BaseRetail<Slide>> {
    return this.http.get<BaseRetail<Slide>>(`${this.url}/Slide/${id}`)
  }

  postSlide(data: Slide) {
    return this.http.post<Message>(`${this.url}/Slide`, data)
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
    return this.http.post<Message>(`${this.url}/FAQ`, data)
  }

  deleteFAQ(id: string) {
    return this.http.delete(`${this.url}/FAQ/${id}`)
  }

  // Course
  getCourse(teacherId = '', classId = '', offSet: number = 0, pageSize: number = 10, filter = '', status: number = -1, isPayment: number = -1, accountId = '', subjectId = '') : Observable<BaseReponse<Course>> {
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

  getTest(offSet: number = 0, pageSize: number = 10, filter = '', classId = '', courseId = '', subjectId = '', testCategoryId = '', IsShowInAbilityTest = -1) : Observable<BaseReponse<Test>> {
    return this.http.get<BaseReponse<Test>>(`${this.url}/test?offSet=${offSet}&pageSize=${pageSize}&filter=${filter}&classId=${classId}&courseId=${courseId}&subjectId=${subjectId}&testCategoryId=${testCategoryId}&IsShowInAbilityTest=${IsShowInAbilityTest}`)
  }

  getTestById(id: string) : Observable<BaseRetail<Test>> {
    return this.http.get<BaseRetail<Test>>(`${this.url}/test/${id}`)
  }

  // News
  getNews(categoryId = '', offSet: number = 0, pageSize: number = 100, filter = '', status : number = 1) : Observable<BaseReponse<New>> {
    return this.http.get<BaseReponse<New>>(`${this.url}/News?offSet=${offSet}&pageSize=${pageSize}&categoryId=${categoryId}&filter=${filter}&status=${status}`)
  }

  getNewsById(id: string) : Observable<BaseRetail<New>> {
    return this.http.get<BaseRetail<New>>(`${this.url}/News/${id}`)
  }

  postNews(data: New) {
    return this.http.post<Message>(`${this.url}/News`, data)
  }

  // New Category
  getNewCategory(offSet: number = 0, pageSize: number = 100, filter = '') : Observable<BaseReponse<NewCatagory>> {
    return this.http.get<BaseReponse<NewCatagory>>(`${this.url}/NewsCategory?offSet=${offSet}&pageSize=${pageSize}&filter=${filter}`)
  }

  getNewCategoryByid(id: string) : Observable<BaseRetail<NewCatagory>>{
    return this.http.get<BaseRetail<NewCatagory>>(`${this.url}/NewsCategory/${id}`)
  }

  postNewCategory(data: NewCatagory) {
    return this.http.post<Message>(`${this.url}/NewsCategory`, data)
  }

  deleteNewCategory(id: string) {
    return this.http.delete<Message>(`${this.url}/NewsCategory/${id}`)
  }

  // Comment
  getComment(screen = '', filter = '', parentId = '', offSet : number = 0, pageSize : number = 100) : Observable<BaseReponse<Comment>> {
    return this.http.get<BaseReponse<Comment>>(`${this.url}/Comment?screen=${screen}&filter=${filter}&parentId=${parentId}&offSet=${offSet}&pageSize=${pageSize}`)
  }

  // Recruit
  getRecruit(offSet: number = 0, pageSize: number = 100, filter = '') : Observable<BaseReponse<Recruit>> {
    return this.http.get<BaseReponse<Recruit>>(`${this.url}/Recruit?offSet=${offSet}&pageSize=${pageSize}&filter=${filter}`)
  }

  getRecruitById(id: string) : Observable<BaseRetail<Recruit>> {
    return this.http.get<BaseRetail<Recruit>>(`${this.url}/Recruit/${id}`)
  }

  postRecruit(data: Recruit) {
    return this.http.post<Message>(`${this.url}/Recruit`, data)
  }

  // Payment / CheckPayment
  getCheckPayment(queryParams) : Observable<BaseRetail<CheckPayment>> {
    return this.http.get<BaseRetail<CheckPayment>>(`${this.url}/Payment/CheckPayment?` + queryParams)
  }

  getPaymentType(queryParams) : Observable<BaseReponse<PaymentType>> {
    return this.http.get<BaseReponse<PaymentType>>(`${this.url}/Payment/GetPaymentTypes?` + queryParams)
  }

  payment(data) : Observable<BaseRetail<CheckPayment>> {
    return this.http.post<BaseRetail<CheckPayment>>(`${this.url}/Payment`, data)
  }

  // CourseRating
  getCourseRating(courseId: string = '', accountId: string = '', filter : string = '', offSet : number = 0, pageSize: number = 100 ) : Observable<BaseReponse<CourseRating>> {
    return this.http.get<BaseReponse<CourseRating>>(`${this.url}/CourseRating?courseId=${courseId}&accountId=${accountId}&filter=${filter}&offSet=${offSet}&pageSize=${pageSize}`)
  }

  //Guide
  getGuide(queryParams) : Observable<BaseReponse<Guide>> {
    return this.http.get<BaseReponse<Guide>>(`${this.url}/Guide?` + queryParams)
  }

  getGuideById(id:string) : Observable<BaseRetail<Guide>> {
    return this.http.get<BaseRetail<Guide>>(`${this.url}/Guide/` + id)
  }

  deleteGuide(id:string) : Observable<BaseRetail<CheckPayment>> {
    return this.http.delete<BaseRetail<CheckPayment>>(`${this.url}/Guide/` + id)
  }

  postGuide(data: Guide) {
    return this.http.post<Message>(`${this.url}/Guide`, data)
  }

  // RecruitCandidate
  getRecruitCandidate(queryParams) : Observable<BaseReponse<RecruitCandidate>> {
    return this.http.get<BaseReponse<RecruitCandidate>>(`${this.url}/RecruitCandidate?` + queryParams)
  }

  getRecruitCandidateById(id:string) : Observable<BaseRetail<RecruitCandidate>> {
    return this.http.get<BaseRetail<RecruitCandidate>>(`${this.url}/RecruitCandidate/` + id)
  }

  postRecruitCandidate(data : RecruitCandidate) {
    return this.http.post<Message>(`${this.url}/RecruitCandidate`, data)
  }

  deleteRecruitCandidate(id: string) {
    return this.http.delete<Message>(`${this.url}/RecruitCandidate/` + id)
  }

  //Payment
  getPayment(queryParams) : Observable<BaseReponse<Payment>> {
    return this.http.get<BaseReponse<Payment>>(`${this.url}/Payment?` + queryParams)
  }

  changePaymentStatus(queryParams) : Observable<BaseRetail<CheckPayment>> {
    return this.http.put<BaseRetail<CheckPayment>>(`${this.url}/Payment/ChangePaymentStatus`, queryParams)
  }

  deletePayment(id:string) : Observable<BaseRetail<CheckPayment>> {
    return this.http.delete<BaseRetail<CheckPayment>>(`${this.url}/Payment/` + id)
  }

  // TestQuestion
  getTestQuestion(queryParams) : Observable<BaseReponse<TestQuestion>> {
    return this.http.get<BaseReponse<TestQuestion>>(`${this.url}/TestQuestion?` + queryParams)
  }

  postTestQuestion(data : TestQuestion) {
    return this.http.post<Message>(`${this.url}/TestQuestion`, data)
  }

  getTestQuestionById(id: string) : Observable<BaseRetail<TestQuestion>> {
    return this.http.get<BaseRetail<TestQuestion>>(`${this.url}/TestQuestion/` + id)
  }

  // deleteTestQuestion(queryParams) : Observable<BaseRetail<CheckPayment>> {
  //   return this.http.delete<BaseRetail<CheckPayment>>(`${this.url}/TestQuestion`, queryParams)
  // }

  // TestQuestionGroup 
  getTestQuestionGroup(queryParams) : Observable<BaseReponse<TestQuestionGroup>> {
    return this.http.get<BaseReponse<TestQuestionGroup>>(`${this.url}/TestQuestionGroup?` + queryParams)
  }

  // TestQuestionTyep 
  getTestQuestionType(queryParams) : Observable<BaseReponse<any>> {
    return this.http.get<BaseReponse<any>>(`${this.url}/TestQuestionType?` + queryParams)
  }
}
