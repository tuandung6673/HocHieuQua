import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Account } from 'src/models/account.model';
import { ApiService } from 'src/services/api.service.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {

  id: string
  editAccount: Account = new Account();

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id && this.id !== 'new') {
        this.apiService.getAccountsById(this.id).subscribe((responseData) => {
          console.log(responseData);
          this.editAccount = responseData.data
        })
      }
    })
  }

}
