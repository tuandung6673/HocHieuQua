import { Classroom } from './classroom.model';
import { Account } from "./account.model"
import { Subject } from './subject.model';
import { Teacher } from './teacher.model';

export class Course {
  accountId: '';
  accountName: '';
  accounts: Account[] = [];
  classRoom: Classroom[] = [];
  classRoomId: ""
  classRoomName: ""
  code: ""
  courseAvatar: ""
  courseBanner: ""
  courseInfo1: ""
  courseInfo2: ""
  courseSchedules: any;
  courseThumbnail: ""
  id: ""
  name: ""
  order = 0;
  price: any = null;
  priceDiscount: any = null;
  rating = 0;
  shortSummary: ""
  status: any = null
  studentNum: any = null
  subject: Subject[] = []
  subjectId: ""
  subjectName: ""
  teacherId: any = null
  teacherName: any = null
  teachers: Teacher[] = []
  testUsers: any = null
}