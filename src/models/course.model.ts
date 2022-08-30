import { TestUser } from './testUser.model';
import { CourseRatingSummary } from './courseRatingSummary.model';
import { Classroom } from './classroom.model';
import { Account } from "./account.model"
import { Subject } from './subject.model';
import { Teacher } from './teacher.model';
import { CourseSchedule } from './courseSchedule.model';

export class Course {
  id = "";
  name = "";
  code = "";
  courseAvatar = "";
  courseThumbnail = "";
  courseBanner = "";
  shortSummary = "";
  courseInfo1 = "";
  courseInfo2 = "";
  price: any = null;
  priceDiscount: any = null;
  studentNum: any = null;
  status: any = null;
  order: any = null;
  rating: any = null;
  classRoomId = "";
  classRoomName = "";
  subjectId = "";
  subjectName = "";
  teacherId : string | string[] = [];
  teacherName : string | string[] = [];
  accountId = "";
  accountName = "";
  createdDate = "";
  modifiedDate = "";
  createdBy = "";
  modifiedBy = "";
  promotionTime = "";
  totalRating: any = null;
  totalStudent: any = null;
  currentRate: any = null;
  averageRating: any = null;
  teachers: Teacher[] = [];
  subject: Subject = null;
  accounts: Account[] = [] ;
  courseSchedules: CourseSchedule[] = [];
  classRoom: Classroom = null ;
  testUsers: TestUser[] = [];
  courseRatingSummary: CourseRatingSummary = null
}


// export class Course {
//   accountId: '';
//   accountName: '';
//   accounts: Account[] = [];
//   classRoom: Classroom[] = [];
//   classRoomId = "";
//   classRoomName = "";
//   code = "";
//   courseAvatar = "";
//   courseBanner = "";
//   courseInfo1 = "";
//   courseInfo2 = "";
//   courseSchedules: any;
//   courseThumbnail = "";
//   id = "";
//   name = "";
//   order: any = null;
//   price: any = null;
//   priceDiscount: any = null;
//   rating: any = null;
//   shortSummary = "";
//   status: any = null
//   studentNum: any = null
//   subject: Subject[] = []
//   subjectId = "";
//   subjectName = "";
//   teacherId: any = null
//   teacherName: any = null
//   teachers: Teacher[] = []
//   testUsers: any = null
// }
    


