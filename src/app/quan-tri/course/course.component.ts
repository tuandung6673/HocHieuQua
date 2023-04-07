import { Course } from 'src/models/course.model';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  teacherName: string
  courses: Course[] = [];
  search: string
  params = {
    offSet: 0,
    pageSize: 5,
    filter : '',
    status: -1,
    isPayment: -1,
    teacherId : '',
    subjectId : '' ,
    accountId : '',
    classId : '',
  }
  totalRecord : number = 0;
  teacherOptions : any[] = [];
  classOptions : any[] = [];
  subjectOptions : any[] = [];
  constructor(private apiService: ApiService, private confirmationService: ConfirmationService, private messageService: MessageService, private spinner: NgxSpinnerService) {
    document.title = "Khóa học";
  }

  ngOnInit(): void {
    this.getCourses();
    this.getTeacherOption();
    this.getClassOption();
  }
  
  getCourses() {
    this.spinner.show();
    this.apiService.getCourse(this.params.teacherId, this.params.classId, this.params.offSet, this.params.pageSize, this.params.filter, this.params.status, this.params.isPayment, this.params.accountId, this.params.subjectId)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe((responseData) => {
      this.courses = responseData.data.data
      this.courses.map((course) => {
        course.teacherName = course.teachers.map((teacher) => {
          return teacher.name
        })
      })
      this.totalRecord = responseData.data.recordsTotal
      this.spinner.hide();
    })
  }

  getTeacherOption() {
    this.apiService.getTeacher().subscribe(response => {
      this.teacherOptions = response.data.data.map(teacher => {
        return {
          label: teacher.name,
          value: teacher.id
        }
      })
    })
  }

  getClassOption() {
    this.apiService.getClassroom().subscribe(response => {
      this.classOptions = response.data.data.map(c => {
        return {
          label: c.name,
          value: c.id
        }
      })
    })
  }

  getSubjectOption() {
    this.apiService.getSubject(0, 1000, this.params.classId, '').subscribe(response => {
      this.subjectOptions = response.data.data.map(s => {
        return {
          label: s.name,
          value: s.id
        }
      })
    })
  }

  onSearch() {
    this.getCourses()
  }

  paginate(event) {
    this.params = {
      ...this.params,
      offSet: event.page * event.rows,
      pageSize: event.rows
    }
    this.getCourses();
  }

  onDeleteCourse(id: string) {
    this.apiService.deleteCourse(id).subscribe((responseData) => {
      if(responseData.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'Thành công', detail: responseData.message})
        this.courses = this.courses.filter(course => course.id != id)
      } else {
        this.messageService.add({severity: 'error', summary: 'Thất bại', detail: responseData.message})
      }
    })
  }

  confirmDeleteCourse(id: string) {
    this.confirmationService.confirm({
        message: 'Bạn có muốn khóa học này ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            // this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
            this.onDeleteCourse(id)
        }
    });
  }

}
