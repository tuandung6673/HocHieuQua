import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/services/api.service.service';

@Component({
  selector: 'app-chi-tiet-tu-van',
  templateUrl: './chi-tiet-tu-van.component.html',
  styleUrls: ['./chi-tiet-tu-van.component.scss']
})
export class ChiTietTuVanComponent implements OnInit {

  id: string;
  constructor(private route: ActivatedRoute, private apiSerivice: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    })
    if(this.id) {
      this.getAdvice();
    }
  }

  getAdvice() {
    this.apiSerivice.getAdviceById(this.id).subscribe((response) => {
      console.log(response);
      
    })
  }

}
