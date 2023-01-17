import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/models/course.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'


@Component({
  selector: 'app-sua-course',
  templateUrl: './sua-course.component.html',
  styleUrls: ['./sua-course.component.css']
})
export class SuaCourseComponent implements OnInit {

  Editor = ClassicEditor
  isLoading: boolean = false
  id: any
  editCourse: Course = new Course()
  cloneCourse: Course = new Course()
  classRoomOption: any = []
  subjectOption: any = []
  teacherOption: any = []
  teacherSelected: any = []

  

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    this.getEditCourse(this.id)
    this.getAllTeacher()
    this.getClassroomOption()
  }

  getEditCourse(id: string) {
    if(this.id && this.id != 'them-khoa-hoc') {
      this.apiService.getCourseById(this.id).subscribe((responseData) => {
        this.editCourse = responseData.data

        responseData.data.teacherId = responseData.data.teachers.map((teacher) => {
          return teacher.id
        })

        this.isLoading = false

        // this.cloneCourse = {...this.editCourse}
        this.editCourse.status = this.editCourse.status == 1 ? true : false
        
        this.getSubjectsOption(responseData.data.classRoomId)
      })
    } 
    else 
    {
      this.isLoading = false
    }
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
      console.log('Subject Option', subjectOption);
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

  onSubmit() {
    // const updateData ={
    //   classRoomId: this.editCourse.classRoomId,
    //   code: this.editCourse.code,
    //   courseAvatar: this.editCourse.courseAvatar,
    //   courseBanner: this.editCourse.courseBanner,
    //   courseInfo1: this.editCourse.courseInfo1,
    //   courseInfo2: this.editCourse.courseInfo1,
    //   courseThumbnail: this.editCourse.courseThumbnail,
    //   name: this.editCourse.name,
    //   price: this.editCourse.price,
    //   priceDiscount: this.editCourse.priceDiscount,
    //   shortSummary: this.editCourse.shortSummary,
    //   status: this.editCourse.status,
    //   studentNum: this.editCourse.studentNum,
    //   subjectId: this.editCourse.subjectId,
    //   teacherId: this.editCourse.teacherId
    // }
    this.isLoading = true;
    const updateData = {...this.editCourse}
    updateData.status = updateData.status ? 1 : 0
    updateData.teacherId = updateData.teacherId.toString()
    
    updateData.price = +updateData.price;
    updateData.priceDiscount = +updateData.priceDiscount;
    updateData.studentNum = +updateData.studentNum

    console.log(updateData);
    this.apiService.postCourse(updateData).subscribe((responseData) => {
      console.log('Update/New Course', responseData);
      this.isLoading = false
      this.router.navigate(['quan-tri/khoa-hoc'])
    })
  }

}
