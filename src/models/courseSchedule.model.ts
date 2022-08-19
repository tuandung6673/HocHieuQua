import { Test } from './test.model';
export class CourseSchedule {
  id = "";
  name = "";
  order: 0;
  status: 0;
  courseId = "";
  requireCourseId = "";
  tests: Test[] = []
}
