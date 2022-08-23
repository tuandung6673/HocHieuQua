import { UserComponent } from './layouts/user/user.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {ImageModule} from 'primeng/image';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import {MenubarModule} from 'primeng/menubar';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {TabViewModule} from 'primeng/tabview';
import {DialogModule} from 'primeng/dialog';
import {ChipsModule} from 'primeng/chips';
import {RatingModule} from 'primeng/rating';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {CarouselModule} from 'primeng/carousel';
import { SwiperModule } from 'swiper/angular';
import { NgxSpinnerModule } from "ngx-spinner";




import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { GiaoVienComponent } from './giao-vien/giao-vien.component';
import { LopHocComponent } from './lop-hoc/lop-hoc.component';
import { MonHocComponent } from './mon-hoc/mon-hoc.component';
import { SuaGiaoVienComponent } from './sua-giao-vien/sua-giao-vien.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {PaginatorModule} from 'primeng/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SuaLopHocComponent } from './sua-lop-hoc/sua-lop-hoc.component';
import { SuaMonHocComponent } from './sua-mon-hoc/sua-mon-hoc.component';
import { SlideComponent } from './slide/slide.component';
import { FaqComponent } from './faq/faq.component';
import { SuaFaqComponent } from './sua-faq/sua-faq.component';
import { CourseComponent } from './course/course.component';
import { SuaCourseComponent } from './CourseInfo/sua-course/sua-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { CthCourseComponent } from './CourseInfo/cth-course/cth-course.component';
import { DiemCourseComponent } from './CourseInfo/diem-course/diem-course.component';
import { SuaAccountComponent } from './Account/sua-account/sua-account.component';
import { AllAccountComponent } from './Account/all-account/all-account.component';
import { BaiKiemTraComponent } from './test/bai-kiem-tra/bai-kiem-tra.component';
import { SuaBaiKiemTraComponent } from './test/sua-bai-kiem-tra/sua-bai-kiem-tra.component';
import { DanhMucComponent } from './tin-tuc/danh-muc/danh-muc.component';
import { SuaDanhMucComponent } from './tin-tuc/sua-danh-muc/sua-danh-muc.component';
import { BaiVietComponent } from './tin-tuc/bai-viet/bai-viet.component';
import { SuaBaiVietComponent } from './tin-tuc/sua-bai-viet/sua-bai-viet.component';
import { TinTuyenDungComponent } from './tuyen-dung/tin-tuyen-dung/tin-tuyen-dung.component';
import { SuaTinTuyenDungComponent } from './tuyen-dung/sua-tin-tuyen-dung/sua-tin-tuyen-dung.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { TongQuanComponent } from './user/tong-quan/tong-quan.component';
import { GioiThieuComponent } from './user/gioi-thieu/gioi-thieu.component';
import { KiemTraNangLucComponent } from './user/kiem-tra-nang-luc/kiem-tra-nang-luc.component';
import { TuyenDungComponent } from './user/tuyen-dung/tuyen-dung.component';
import { HuongDanComponent } from './user/huong-dan/huong-dan.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { FooterComponent } from './footer/footer.component';
const appRoutes: Routes = [
  {
    path: 'quan-tri', component: AdminComponent,
    children: [
      {path: 'danh-muc-tin-tuc', component: DanhMucComponent},
      {path: 'danh-muc-tin-tuc/:id', component: SuaDanhMucComponent},
      {path: 'danh-muc-tin-tuc/them-moi', component: SuaDanhMucComponent},
      {path: 'tuyen-dung', component: TinTuyenDungComponent},
      {path: 'tuyen-dung/:id', component: SuaTinTuyenDungComponent},
      {path: 'tuyen-dung/them-moi', component: SuaTinTuyenDungComponent},
      {path: 'tin-tuc', component: BaiVietComponent},
      {path: 'tin-tuc/:id', component: SuaBaiVietComponent},
      {path: 'tin-tuc/them-moi', component: SuaBaiVietComponent},
      {path: 'tai-khoan', component: AllAccountComponent },
      {path: 'tai-khoan/:id', component: SuaAccountComponent },
      {path: 'tai-khoan/them-tai-khoan', component: SuaAccountComponent},
      {path: 'giao-vien', component: GiaoVienComponent},
      {path: 'giao-vien/them-giao-vien', component: SuaGiaoVienComponent},
      {path: 'giao-vien/:id', component: SuaGiaoVienComponent},
      {path: 'lop-hoc', component: LopHocComponent},
      {path: 'lop-hoc/them-lop-hoc', component: SuaLopHocComponent},
      {path: 'lop-hoc/:id', component: SuaLopHocComponent},
      {path: 'mon-hoc', component: MonHocComponent},
      {path: 'mon-hoc/:id', component: SuaMonHocComponent},
      {path: 'mon-hoc/them-mon-hoc', component: SuaMonHocComponent},
      {path: 'slide', component: SlideComponent},
      {path: 'faq', component: FaqComponent},
      {path: 'faq/them-faq', component: SuaFaqComponent},
      {path: 'faq/:id', component: SuaFaqComponent},
      {path: 'khoa-hoc', component: CourseComponent},
      {path: 'khoa-hoc/:id', component: EditCourseComponent},
      {path: 'khoa-hoc/them-khoa-hoc', component: EditCourseComponent},
      {path: 'bai-kiem-tra', component: BaiKiemTraComponent},
      {path: 'bai-kiem-tra/:id', component: SuaBaiKiemTraComponent},
      {path: 'bai-kiem-tra/them-bai-kiem-tra', component: SuaBaiKiemTraComponent}
    ]
  },
  {
    path: '', component: UserComponent,
    children: [
      {path: 'tong-quan', component: TongQuanComponent},
      {path: 'gioi-thieu', component: GioiThieuComponent},
      {path: 'kiem-tra-nang-luc', component: KiemTraNangLucComponent},
      {path: 'tuyen-dung', component: TuyenDungComponent},
      {path: 'huong-dan', component: HuongDanComponent}
    ]
  }
 
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AllAccountComponent,
    EditAccountComponent,
    GiaoVienComponent,
    LopHocComponent,
    MonHocComponent,
    SuaGiaoVienComponent,
    SuaLopHocComponent,
    SuaMonHocComponent,
    SlideComponent,
    FaqComponent,
    SuaFaqComponent,
    CourseComponent,
    SuaCourseComponent,
    EditCourseComponent,
    CthCourseComponent,
    DiemCourseComponent,
    SuaAccountComponent,
    BaiKiemTraComponent,
    SuaBaiKiemTraComponent,
    DanhMucComponent,
    SuaDanhMucComponent,
    BaiVietComponent,
    SuaBaiVietComponent,
    TinTuyenDungComponent,
    SuaTinTuyenDungComponent,
    MainHeaderComponent,
    AdminComponent,
    UserComponent,
    TongQuanComponent,
    GioiThieuComponent,
    KiemTraNangLucComponent,
    TuyenDungComponent,
    HuongDanComponent,
    UserHeaderComponent,
    FooterComponent
      ],
  imports: [
    CKEditorModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    ButtonModule,
    PaginatorModule,
    InputTextModule,
    ToggleButtonModule,
    MenubarModule,
    InputSwitchModule,
    ProgressSpinnerModule,
    NgxSpinnerModule,
    CarouselModule,
    SwiperModule,
    BreadcrumbModule,
    RatingModule,
    ChipsModule,
    DialogModule,
    TabViewModule,
    MultiSelectModule,
    ConfirmDialogModule,
    DropdownModule,
    TableModule,
    MessagesModule,
    MessageModule,
    ImageModule,
    FormsModule,
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
