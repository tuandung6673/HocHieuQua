import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-detail-danh-gia',
  templateUrl: './detail-danh-gia.component.html',
  styleUrls: ['./detail-danh-gia.component.css']
})
export class DetailDanhGiaComponent implements OnInit, OnChanges {

  @Input() detailCourse : any
  @Input() comments: any
  onePer : number
  twoPer : number
  threePer : number
  fourPer : number
  fivePer : number

  constructor() { }

  ngOnInit(): void {
    this.getPercent()

  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }
  
  getPercent() {
    this.onePer = this.detailCourse.courseRatingSummary.oneStar / this.detailCourse.courseRatingSummary.total * 100
    this.twoPer = this.detailCourse.courseRatingSummary.twoStar / this.detailCourse.courseRatingSummary.total * 100
    this.threePer = this.detailCourse.courseRatingSummary.threeStar / this.detailCourse.courseRatingSummary.total * 100
    this.fourPer = this.detailCourse.courseRatingSummary.fourStar / this.detailCourse.courseRatingSummary.total * 100
    this.fivePer = this.detailCourse.courseRatingSummary.fiveStar / this.detailCourse.courseRatingSummary.total * 100
  }

}
