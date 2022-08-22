import { Teacher } from 'src/models/teacher.model';
import { Subject } from 'src/models/subject.model';
import { Slide } from './slide.model';
import { Classroom } from './classroom.model';
import { Quizz } from './quizz.model';

export class Home {
  classRooms: Classroom[] = [];
  quizs: Quizz[] = [];
  slides: Slide[] = [];
  subjects: Subject[] = [];
  teachers: Teacher[] = [];
}