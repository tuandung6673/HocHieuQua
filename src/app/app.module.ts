import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { NgxSpinnerModule } from "ngx-spinner";
import { AccordionModule } from 'primeng/accordion';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImageModule } from 'primeng/image';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RatingModule } from 'primeng/rating';
import { SidebarModule } from 'primeng/sidebar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { SwiperModule } from 'swiper/angular';
import { AuthInterceptor } from './../auth/auth.interceptor';
import { AuthGuardService } from './../auth/authGuard.service';
import { AdminComponent } from './layouts/admin/admin.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MathjaxModule } from 'mathjax-angular';
import { FileUploadModule } from 'primeng/fileupload';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { AdminGuard } from 'src/auth/adminGuard.service';
import { AllAccountComponent } from './Account/all-account/all-account.component';
import { SuaAccountComponent } from './Account/sua-account/sua-account.component';
import { CthCourseComponent } from './CourseInfo/cth-course/cth-course.component';
import { DiemCourseComponent } from './CourseInfo/diem-course/diem-course.component';
import { SuaCourseComponent } from './CourseInfo/sua-course/sua-course.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailAnswerModule } from './common/detail-answer/detail-answer.module';
import { HeaderComponent } from './header/header.component';
import { LogInOutComponent } from './layouts/log-in-out/log-in-out.component';
import { ManHinhDangNhapComponent } from './layouts/man-hinh-dang-nhap/man-hinh-dang-nhap.component';
import { SignUpComponent } from './layouts/sign-up/sign-up.component';
import { UserComponent } from './layouts/user/user.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { CauHoiComponent } from './quan-tri/cau-hoi/cau-hoi.component';
import { ChiTietCauHoiComponent } from './quan-tri/cau-hoi/chi-tiet-cau-hoi/chi-tiet-cau-hoi.component';
import { CourseComponent } from './quan-tri/course/course.component';
import { DiemThiComponent } from './quan-tri/diem-thi/diem-thi.component';
import { EditAccountComponent } from './quan-tri/edit-account/edit-account.component';
import { EditCourseComponent } from './quan-tri/edit-course/edit-course.component';
import { FaqComponent } from './quan-tri/faq/faq.component';
import { FooterComponent } from './quan-tri/footer/footer.component';
import { GiaoVienComponent } from './quan-tri/giao-vien/giao-vien.component';
import { GiupDoComponent } from './quan-tri/giup-do/giup-do.component';
import { LopHocComponent } from './quan-tri/lop-hoc/lop-hoc.component';
import { HanhDongComponent } from './quan-tri/menu-nguoi-dung/hanh-dong/hanh-dong.component';
import { MenuNguoiDungComponent } from './quan-tri/menu-nguoi-dung/menu-nguoi-dung.component';
import { MenuComponent } from './quan-tri/menu-nguoi-dung/menu/menu.component';
import { NhomQuyenComponent } from './quan-tri/menu-nguoi-dung/nhom-quyen/nhom-quyen.component';
import { MonHocComponent } from './quan-tri/mon-hoc/mon-hoc.component';
import { ChiTietNamHocComponent } from './quan-tri/nam-hoc/chi-tiet-nam-hoc/chi-tiet-nam-hoc.component';
import { NamHocComponent } from './quan-tri/nam-hoc/nam-hoc.component';
import { NhomCauHoiComponent } from './quan-tri/nhom-cau-hoi/nhom-cau-hoi.component';
import { ChiTietFooterComponent } from './quan-tri/quan-tri-footer/chi-tiet-footer/chi-tiet-footer.component';
import { QuanTriFooterComponent } from './quan-tri/quan-tri-footer/quan-tri-footer.component';
import { SlideComponent } from './quan-tri/slide/slide.component';
import { ChiTietStepComponent } from './quan-tri/step/chi-tiet-step/chi-tiet-step.component';
import { StepConComponent } from './quan-tri/step/step-con/step-con.component';
import { StepComponent } from './quan-tri/step/step.component';
import { SuaFaqComponent } from './quan-tri/sua-faq/sua-faq.component';
import { SuaGiaoVienComponent } from './quan-tri/sua-giao-vien/sua-giao-vien.component';
import { SuaLopHocComponent } from './quan-tri/sua-lop-hoc/sua-lop-hoc.component';
import { ThemMonHocComponent } from './quan-tri/sua-lop-hoc/them-mon-hoc/them-mon-hoc.component';
import { SuaMonHocComponent } from './quan-tri/sua-mon-hoc/sua-mon-hoc.component';
import { BaiKiemTraComponent } from './quan-tri/test/bai-kiem-tra/bai-kiem-tra.component';
import { SuaBaiKiemTraComponent } from './quan-tri/test/sua-bai-kiem-tra/sua-bai-kiem-tra.component';
import { SuaKtBinhLuanComponent } from './quan-tri/test/sua-bai-kiem-tra/sua-kt-binh-luan/sua-kt-binh-luan.component';
import { KtDienVaoChoTrongComponent } from './quan-tri/test/sua-bai-kiem-tra/sua-kt-cau-hoi/kt-dien-vao-cho-trong/kt-dien-vao-cho-trong.component';
import { KtDungSaiComponent } from './quan-tri/test/sua-bai-kiem-tra/sua-kt-cau-hoi/kt-dung-sai/kt-dung-sai.component';
import { KtMotNhieuLuaChonComponent } from './quan-tri/test/sua-bai-kiem-tra/sua-kt-cau-hoi/kt-mot-nhieu-lua-chon/kt-mot-nhieu-lua-chon.component';
import { KtPhuHopComponent } from './quan-tri/test/sua-bai-kiem-tra/sua-kt-cau-hoi/kt-phu-hop/kt-phu-hop.component';
import { SuaKtCauHoiComponent } from './quan-tri/test/sua-bai-kiem-tra/sua-kt-cau-hoi/sua-kt-cau-hoi.component';
import { SuaKtChiTietComponent } from './quan-tri/test/sua-bai-kiem-tra/sua-kt-chi-tiet/sua-kt-chi-tiet.component';
import { SuaKtNhanXetComponent } from './quan-tri/test/sua-bai-kiem-tra/sua-kt-nhan-xet/sua-kt-nhan-xet.component';
import { ThanhToanComponent } from './quan-tri/thanh-toan/thanh-toan.component';
import { ChiTietThongBaoComponent } from './quan-tri/thong-bao/chi-tiet-thong-bao/chi-tiet-thong-bao.component';
import { ThongBaoComponent } from './quan-tri/thong-bao/thong-bao.component';
import { ChonAnhComponent } from './quan-tri/thu-vien/chon-anh/chon-anh.component';
import { ThuVienComponent } from './quan-tri/thu-vien/thu-vien.component';
import { BaiVietComponent } from './quan-tri/tin-tuc/bai-viet/bai-viet.component';
import { DanhMucComponent } from './quan-tri/tin-tuc/danh-muc/danh-muc.component';
import { SuaBaiVietComponent } from './quan-tri/tin-tuc/sua-bai-viet/sua-bai-viet.component';
import { SuaDanhMucComponent } from './quan-tri/tin-tuc/sua-danh-muc/sua-danh-muc.component';
import { ChiTietTroGiupComponent } from './quan-tri/tro-giup/chi-tiet-tro-giup/chi-tiet-tro-giup.component';
import { TroGiupComponent } from './quan-tri/tro-giup/tro-giup.component';
import { SuaTinTuyenDungComponent } from './quan-tri/tuyen-dung/sua-tin-tuyen-dung/sua-tin-tuyen-dung.component';
import { TinTuyenDungComponent } from './quan-tri/tuyen-dung/tin-tuyen-dung/tin-tuyen-dung.component';
import { ChiTietUngVienComponent } from './quan-tri/ung-vien/chi-tiet-ung-vien/chi-tiet-ung-vien.component';
import { UngVienComponent } from './quan-tri/ung-vien/ung-vien.component';
import { ChiTietTuVanComponent } from './quan-tri/yeu-cau-tu-van/chi-tiet-tu-van/chi-tiet-tu-van.component';
import { YeuCauTuVanComponent } from './quan-tri/yeu-cau-tu-van/yeu-cau-tu-van.component';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { UserHeaderComponent } from './user-header/user-header.component';
import { ChatChangeNameComponent } from './user/chat/chat-change-name/chat-change-name.component';
import { ChatFileMediaComponent } from './user/chat/chat-file-media/chat-file-media.component';
import { FileComponent } from './user/chat/chat-file-media/file/file.component';
import { LinkComponent } from './user/chat/chat-file-media/link/link.component';
import { MediaComponent } from './user/chat/chat-file-media/media/media.component';
import { ChatInfoComponent } from './user/chat/chat-info/chat-info.component';
import { ChatComponent } from './user/chat/chat.component';
import { ChiTietBaiHocComponent } from './user/chi-tiet-bai-hoc/chi-tiet-bai-hoc.component';
import { BannerMonHocComponent } from './user/chi-tiet-mon-hoc/banner-mon-hoc/banner-mon-hoc.component';
import { ChiTietMonHocComponent } from './user/chi-tiet-mon-hoc/chi-tiet-mon-hoc.component';
import { DetailChuongTrinhHocComponent } from './user/chi-tiet-mon-hoc/detail-chuong-trinh-hoc/detail-chuong-trinh-hoc.component';
import { DetailDanhGiaComponent } from './user/chi-tiet-mon-hoc/detail-danh-gia/detail-danh-gia.component';
import { DetailMonHocLeftComponent } from './user/chi-tiet-mon-hoc/detail-mon-hoc-left/detail-mon-hoc-left.component';
import { DetailMonHocComponent } from './user/chi-tiet-mon-hoc/detail-mon-hoc/detail-mon-hoc.component';
import { DetailQuestionComponent } from './user/detail-question/detail-question.component';
import { BaiKhacComponent } from './user/gioi-thieu/bai-khac/bai-khac.component';
import { CommentRealtimeComponent } from './user/gioi-thieu/comment-realtime/comment-realtime.component';
import { CommentComponent } from './user/gioi-thieu/comment/comment.component';
import { GioiThieuChiTietComponent } from './user/gioi-thieu/gioi-thieu-chi-tiet/gioi-thieu-chi-tiet.component';
import { GioiThieuPhaiComponent } from './user/gioi-thieu/gioi-thieu-phai/gioi-thieu-phai.component';
import { GioiThieuComponent } from './user/gioi-thieu/gioi-thieu.component';
import { HocTapComponent } from './user/gioi-thieu/hoc-tap/hoc-tap.component';
import { TinTucItemComponent } from './user/gioi-thieu/tin-tuc-item/tin-tuc-item.component';
import { HuongDanContentComponent } from './user/huong-dan/huong-dan-content/huong-dan-content.component';
import { HuongDanComponent } from './user/huong-dan/huong-dan.component';
import { KhoaHocComponent } from './user/khoa-hoc/khoa-hoc.component';
import { BaiKtnlComponent } from './user/kiem-tra-nang-luc/bai-ktnl/bai-ktnl.component';
import { KiemTraNangLucComponent } from './user/kiem-tra-nang-luc/kiem-tra-nang-luc.component';
import { Test2Component } from './user/kiem-tra-nang-luc/test2/test2.component';
import { DoiMatKhauComponent } from './user/tai-khoan/doi-mat-khau/doi-mat-khau.component';
import { KhoaHocCuaToiComponent } from './user/tai-khoan/khoa-hoc-cua-toi/khoa-hoc-cua-toi.component';
import { KichHoatKhoaHocComponent } from './user/tai-khoan/kich-hoat-khoa-hoc/kich-hoat-khoa-hoc.component';
import { QuaTrinhHocTapComponent } from './user/tai-khoan/qua-trinh-hoc-tap/qua-trinh-hoc-tap.component';
import { ThongTinCaNhanComponent } from './user/tai-khoan/thong-tin-ca-nhan/thong-tin-ca-nhan.component';
import { TatCaKhoaHocComponent } from './user/tat-ca-khoa-hoc/tat-ca-khoa-hoc.component';
import { ThongBaoAllComponent } from './user/thong-bao-all/thong-bao-all.component';
import { ClassItemComponent } from './user/tong-quan/class/class-item/class-item.component';
import { ClassComponent } from './user/tong-quan/class/class.component';
import { QuizItemComponent } from './user/tong-quan/quiz/quiz-item/quiz-item.component';
import { QuizComponent } from './user/tong-quan/quiz/quiz.component';
import { TeacherItemComponent } from './user/tong-quan/teacher/teacher-item/teacher-item.component';
import { TeacherComponent } from './user/tong-quan/teacher/teacher.component';
import { TongQuanItemComponent } from './user/tong-quan/tong-quan-subject/tong-quan-list/tong-quan-item/tong-quan-item.component';
import { TongQuanListComponent } from './user/tong-quan/tong-quan-subject/tong-quan-list/tong-quan-list.component';
import { TongQuanSubjectComponent } from './user/tong-quan/tong-quan-subject/tong-quan-subject.component';
import { TongQuanComponent } from './user/tong-quan/tong-quan.component';
import { ChiTietTuyenDungComponent } from './user/tuyen-dung/chi-tiet-tuyen-dung/chi-tiet-tuyen-dung.component';
import { TuyenDungItemComponent } from './user/tuyen-dung/tuyen-dung-item/tuyen-dung-item.component';
import { TuyenDungComponent } from './user/tuyen-dung/tuyen-dung.component';
import { KhoaHocGvComponent } from './user/user-gv/user-chi-tiet-gv/khoa-hoc-gv/khoa-hoc-gv.component';
import { UserChiTietGvComponent } from './user/user-gv/user-chi-tiet-gv/user-chi-tiet-gv.component';
import { UserGvComponent } from './user/user-gv/user-gv.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

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
    FooterComponent,
    TongQuanItemComponent,
    TongQuanListComponent,
    TongQuanSubjectComponent,
    ClassItemComponent,
    ClassComponent,
    TeacherItemComponent,
    TeacherComponent,
    QuizItemComponent,
    QuizComponent,
    TinTucItemComponent,
    BaiKhacComponent,
    HocTapComponent,
    TuyenDungItemComponent,
    HuongDanContentComponent,
    KhoaHocComponent,
    GioiThieuChiTietComponent,
    GioiThieuPhaiComponent,
    CommentComponent,
    UserGvComponent,
    UserChiTietGvComponent,
    KhoaHocGvComponent,
    ChiTietTuyenDungComponent,
    ChiTietMonHocComponent,
    BannerMonHocComponent,
    DetailMonHocComponent,
    DetailMonHocLeftComponent,
    DetailChuongTrinhHocComponent,
    DetailDanhGiaComponent,
    LogInOutComponent,
    SignUpComponent,
    ThongTinCaNhanComponent,
    DoiMatKhauComponent,
    KhoaHocCuaToiComponent,
    KichHoatKhoaHocComponent,
    QuaTrinhHocTapComponent,
    Test2Component,
    ManHinhDangNhapComponent,
    YeuCauTuVanComponent,
    ChiTietTuVanComponent,
    TroGiupComponent,
    ChiTietTroGiupComponent,
    UngVienComponent,
    ChiTietUngVienComponent,
    ThanhToanComponent,
    GiupDoComponent,
    CauHoiComponent,
    NhomCauHoiComponent,
    MenuComponent,
    MenuNguoiDungComponent,
    HanhDongComponent,
    NhomQuyenComponent,
    ThongBaoComponent,
    StepComponent,
    QuanTriFooterComponent,
    ChiTietFooterComponent,
    ChiTietThongBaoComponent,
    ThongBaoAllComponent,
    TatCaKhoaHocComponent,
    SuaKtChiTietComponent,
    SuaKtCauHoiComponent,
    SuaKtNhanXetComponent,
    SuaKtBinhLuanComponent,
    DiemThiComponent,
    ChiTietCauHoiComponent,
    ChiTietBaiHocComponent,
    ChiTietStepComponent,
    StepConComponent,
    ThemMonHocComponent,
    ThuVienComponent,
    ChonAnhComponent,
    BaiKtnlComponent,
    DetailQuestionComponent,
    KtMotNhieuLuaChonComponent,
    KtDungSaiComponent,
    KtDienVaoChoTrongComponent,
    KtPhuHopComponent,
    NamHocComponent,
    ChiTietNamHocComponent,
    CommentRealtimeComponent,
    ChatComponent,
    ChatInfoComponent,
    ChatChangeNameComponent,
    ChatFileMediaComponent,
    MediaComponent,
    FileComponent,
    LinkComponent,
    TruncatePipe,
      ],
  imports: [
    MathjaxModule.forRoot(),
    AppRoutingModule,
    EditorModule,
    AutoCompleteModule,
    CommonModule,
    ContextMenuModule,
    MenuModule,
    SidebarModule,
    DynamicDialogModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    // RouterModule.forRoot(appRoutes),
    ButtonModule,
    PaginatorModule,
    InputTextModule,
    FileUploadModule,
    DetailAnswerModule,
    ToggleButtonModule,
    MenubarModule,
    CalendarModule,
    TreeTableModule,
    ToastModule,
    InputSwitchModule,
    ProgressSpinnerModule,
    TreeSelectModule,
    CheckboxModule,
    SplitButtonModule,
    ProgressBarModule,
    AccordionModule,
    CarouselModule,
    SwiperModule,
    BreadcrumbModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    RatingModule,
    ChipsModule,
    DialogModule,
    TabViewModule,
    MultiSelectModule,
    ConfirmDialogModule,
    PasswordModule,
    DropdownModule,
    TableModule,
    MessagesModule,
    MessageModule,
    ImageModule,
    FormsModule,
    OverlayPanelModule,
    ReactiveFormsModule
  ],
  providers: [DialogService, DynamicDialogRef, ConfirmationService, MessageService, AuthGuardService, AdminGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, {
    provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
