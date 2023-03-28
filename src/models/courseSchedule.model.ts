import { Test } from './test.model';
export class CourseSchedule {
  id = "";
  name = "";
  order: 0;
  status: any = null;
  courseId = "";
  requireCourseId = "";
  tests: Test[] = []
}
