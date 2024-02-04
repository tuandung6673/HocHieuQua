import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authentication } from 'src/models/authentication.model';
import { ApiService } from 'src/services/api.service.service';
import * as queryString from 'querystring-es3';
import * as moment from 'moment'
import { Notification } from 'src/models/notification.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  isLogin = localStorage.getItem('userToken');
  params = {
    accountId: '',
    filter: '',
    isRead: -1,
    offSet: 0,
    pageSize: 5
  }
  noti: Notification[] = [];
  items : any
  userData: Authentication
  isToken: boolean = false
  defaultAvatar = 'https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-12.jpg';
  newNoti : boolean = false;
  firstLoad : boolean = true;
  constructor(private router: Router, private apiService: ApiService, private translate: TranslateService) 
  {
    translate.addLangs(['vi', 'en']);
        if (localStorage.hasOwnProperty('currentLang') && localStorage.getItem('currentLang') != null) {
            const getLang = localStorage.getItem('currentLang');
            translate.use(`${getLang}`);
        } else {
            translate.setDefaultLang('vi');
            translate.use('vi');
        }
  }

  ngOnInit(): void {
    this.isToken = localStorage.getItem('userToken') ? true : false
    this.userData = JSON.parse(localStorage.getItem('userData'))
    this.items = [
      {label: 'Quản trị', icon: 'pi pi-cog', command: () => {
        this.router.navigate(['/quan-tri'])
      }},
      {label: 'Thông tin cá nhân ', icon: 'pi pi-users', command: () => {
        this.router.navigate(['/tai-khoan/thong-tin-ca-nhan'])
      }},
      {label: 'Đổi mật khẩu', icon: 'pi pi-qrcode', command: () => {
        this.router.navigate(['tai-khoan/doi-mat-khau'])
      }},
      {label: 'Khóa học của tôi', icon: 'pi pi-book', command: () => {
        this.router.navigate(['tai-khoan/khoa-hoc-cua-toi'])
      }},
      {label: 'Kích hoạt khóa học', icon: 'pi pi-key', command: () => {
        this.router.navigate(['tai-khoan/kich-hoat-khoa-hoc'])
      }},
      {label: 'Quá trình học tập', icon: 'pi pi-chart-pie', command: () => {
        this.router.navigate(['tai-khoan/qua-trinh-hoc-tap'])
      }},
      {
        separator:true
      },
      {label: 'Đăng xuất', icon: 'pi pi-sign-out', command: () => {
        this.logout()
      }},
    ]
    if(this.isLogin) {
      this.getNotification();
      setInterval(() => {
        this.getNotification();
      }, 300000)
    }
  }

  saveLang(lang: string) {
    localStorage.setItem('currentLang', lang);
    window.location.reload();
  }

  logout() {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userData')
    this.router.navigate(['/dang-nhap'])
  }

  getNotification() {
    const queryParams = queryString.stringify(this.params)
    this.apiService.getNotification(queryParams).subscribe(response => {
      this.noti = response.data.data;
      this.noti.map(n => {
        n.createdDate = moment(n.createdDate).format('DD-MM-YYYY k:mm:ss')
      })
      this.checkNewNoti(this.noti);
    })
  }

  checkNewNoti(notiList) {
    notiList.map(noti => {
      if(noti.isRead == 0) {
        this.newNoti = true;
      }
    })
  }

  setRead(noti) {
    if(noti.routerLink) {
      this.router.navigate([noti.routerLink])
    } else {
      this.router.navigate(['/thong-bao/all'])
    }
    if(noti.isRead == 0) {
      this.apiService.setNotiRead(noti.id).subscribe();
      const reload = setTimeout(() => {
        this.getNotification()
      }, 1000);
      clearTimeout(reload);
    }
  }

  errorHandler(event) {
    event.target.src = this.defaultAvatar;
    event.target.style.objectFit = 'contain';
  }

}
