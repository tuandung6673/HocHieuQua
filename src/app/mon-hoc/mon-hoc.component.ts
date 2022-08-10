import { Subject } from './../../models/subject.model';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-mon-hoc',
  templateUrl: './mon-hoc.component.html',
  styleUrls: ['./mon-hoc.component.css']
})
export class MonHocComponent implements OnInit {

  courses: any
  subjects: any
  isLoading: boolean = false

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.apiService.getSubject().subscribe((responseData) => {
      this.subjects = responseData.data.data.map((eachSubject) => {
        const classRooms = eachSubject.classRooms.map(t => t.name).toString();
        return {
          ...eachSubject,
          classRooms: classRooms
        }
      })
      this.isLoading = false
      console.log("Tat ca mon hoc", this.subjects);
    })
  }
}
