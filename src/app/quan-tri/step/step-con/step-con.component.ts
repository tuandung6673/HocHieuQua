import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-step-con',
  templateUrl: './step-con.component.html',
  styleUrls: ['./step-con.component.scss']
})
export class StepConComponent implements OnInit {

  parentId : string = '';
  constructor(
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.parentId = params?.parentId;
    })
  }

  ngOnInit(): void {
    
  }

}
