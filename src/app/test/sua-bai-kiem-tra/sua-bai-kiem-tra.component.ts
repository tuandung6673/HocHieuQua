import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sua-bai-kiem-tra',
  templateUrl: './sua-bai-kiem-tra.component.html',
  styleUrls: ['./sua-bai-kiem-tra.component.css']
})
export class SuaBaiKiemTraComponent implements OnInit {

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

  }

  

}
