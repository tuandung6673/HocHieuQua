import { Quizz } from './quizz.model';
export class Test {
  id  ="";
  name = "";
  description = "";
  time: any = 0;
  status: any = 0;
  thumbnail = "";
  testCategoryId = "";
  testCategoryCode = "";
  testCategoryName = "";
  order: any = null;
  isFree: true;
  quizzs: Quizz[] = [];
  courseScheduleId = ""
}