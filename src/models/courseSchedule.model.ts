import { Test } from './test.model';
export class CourseSchedule {
  id : string = "";
  courseId : string = "";
  createdBy : any = null;
  createdDate : any = null;
  isPass : boolean;
  modifiedBy : any = "";
  modifiedDate : any = "";
  name: string = "";
  order: number;
  requireCourseId : string = "";
  status : any;
  testIds = [];
  testUsers = [];
  totalFiltered : any = null;
  tests : Test[] = [];
}
