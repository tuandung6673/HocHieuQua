import { Quizz } from './quizz.model';
export class Test {
  id :"";
  name: "";
  description: "";
  time: 0;
  status: 0;
  thumbnail: "";
  testCategoryId: "";
  testCategoryCode: "";
  testCategoryName: "";
  order: 0;
  isFree: true;
  quizzs: Quizz[] = [];
  courseScheduleId: ""
}