import { TestQuestion } from "./testQuestion.model"

export class TestQuestionGroup {
  id = "";
  name = "";
  createdDate = "";
  modifiedDate = "";
  createdBy = "";
  modifiedBy = "";
  order = "";
  status = "";
  testQuestions : TestQuestion[] = [];
}