import { UserRating } from "./userRating.model"

export class CourseReleVant {
  id: string = "";
  name: string = "";
  code: string = "";
  courseAvatar: string = "";
  courseThumbnail: string = "";
  courseBanner: string = "";
  shortSummary: string = "";
  courseInfo1: string = "";
  courseInfo2: string = "";
  price: number = 0;
  priceDiscount: number = 0;
  studentNum: number = 0;
  status: number = 0;
  order: number = 0;
  rating: number = 0;
  isShowHome: number = 0;
  classRoomId: string = "";
  classRoomName: string = "";
  subjectId: string = "";
  subjectName: string = "";
  teacherId: string = "";
  teacherName: string = "";
  accountId: string = "";
  accountName: string = "";
  createdDate: string = "";
  modifiedDate: string = "";
  createdBy: string = "";
  modifiedBy: string = "";
  promotionTime: string = "";
  totalRating: number = 0;
  totalStudent: number = 0;
  currentRate: number = 0;
  userRating: UserRating = new UserRating();
  averageRating: number = 0;
}