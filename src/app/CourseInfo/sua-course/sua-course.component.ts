import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import * as queryString from 'querystring-es3';
import { ChonAnhComponent } from 'src/app/quan-tri/thu-vien/chon-anh/chon-anh.component';
import { Course } from 'src/models/course.model';
import { ApiService } from 'src/services/api.service.service';

@Component({
  selector: 'app-sua-course',
  templateUrl: './sua-course.component.html',
  styleUrls: ['./sua-course.component.scss']
})
export class SuaCourseComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<string>();
  Editor = ClassicEditor;
  id: string;
  editCourse: Course = new Course()
  cloneCourse: Course = new Course()
  classRoomOption = []
  subjectOption: any = []
  teacherOption: any = []
  accoundId = JSON.parse(localStorage.getItem('userData'))?.id;
  courseQuery = {
    accountId: '',
    fromAdmin: 0
  }
  defaultAvatar = 'https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg'
  

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private messageService: MessageService, 
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    if(this.id && this.id != 'them-khoa-hoc') {
      this.getEditCourse(this.id)
    } else {
      document.title = "Thêm khóa học"
    }
    this.getAllTeacher()
    this.getClassroomOption()
  }

  getEditCourse(id: string) {
    this.courseQuery.accountId = this.accoundId;
    const courseQueryParams = queryString.stringify(this.courseQuery);
    this.apiService.getCourseById(this.id, courseQueryParams).subscribe((responseData) => {
      this.editCourse = responseData.data;
      this.newItemEvent.emit(responseData.data.name);
      responseData.data.teacherId = responseData.data.teachers.map((teacher) => {
        return teacher.id;
      });
      this.editCourse.status = this.editCourse.status == 1 ? true : false;
      this.editCourse.isShowHome = this.editCourse.isShowHome == 1 ? true : false

      this.getSubjectsOption(responseData.data.classRoomId)
    })
  }

  getClassroomOption() {
    this.apiService.getClassroom(0, 1000).subscribe((responseData) => {
      this.classRoomOption = responseData.data.data.map((classRoom) => {
        return {name: classRoom.name, code: classRoom.id}
      })
    })
  }

  getSubjectsOption(classRoomId: string) {
    this.apiService.getSubject(0, 1000, classRoomId, '' ).subscribe((subjectOption) => {
      this.subjectOption = subjectOption.data.data.map((subject) => {
        return {name: subject.name, code: subject.id}
      })
    })
  }

  getAllTeacher() {
    this.apiService.getTeacher(0, 1000).subscribe((responseData) => {
      this.teacherOption = responseData.data.data.map((teacher) => {
        return {name: teacher.name, code: teacher.id}
      })
    })
  }

  reloadSubject() {
    this.getSubjectsOption(this.editCourse.classRoomId)
  }

  cancel() {
    this.router.navigate(['/quan-tri/khoa-hoc'])
  }

  save() {
    const updateData = {...this.editCourse}
    updateData.status = updateData.status ? 1 : 0
    updateData.isShowHome = updateData.isShowHome ? 1 : 0
    updateData.teacherId = updateData.teacherId.toString()
    updateData.price = +updateData.price;
    updateData.priceDiscount = +updateData.priceDiscount;
    updateData.studentNum = +updateData.studentNum

    this.apiService.postCourse(updateData).subscribe((responseData) => {
      if(responseData.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'Thành công', detail: responseData.message})
        this.router.navigate(['quan-tri/khoa-hoc']);
      } else {
        this.messageService.add({severity: 'error', summary: 'Thất bại', detail: responseData.message})
      }
    })
  }

  ref: DynamicDialogRef;
  uploadImage(field) {
    this.ref = this.dialogService.open(ChonAnhComponent, {
      header: 'Thư viện ảnh',
      width: '90%',
      contentStyle: {"overflow": "auto"},
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((imgUrl) => {
      if(imgUrl) {
        this.editCourse = {
          ...this.editCourse,
          [field]: "https://tank8.bsite.net/images/" + imgUrl 
        }
      } else {
        return;
      }
    })
  }

}
