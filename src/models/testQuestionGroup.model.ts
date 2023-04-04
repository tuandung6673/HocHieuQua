import { TestQuestion } from "./testQuestion.model"

export class TestQuestionGroup {
  id : number = 0;
  name = "";
  createdDate = "";
  modifiedDate = "";
  createdBy = "";
  modifiedBy = "";
  order = "";
  status : any = null;
  testQuestions : TestQuestion[] = [];
}