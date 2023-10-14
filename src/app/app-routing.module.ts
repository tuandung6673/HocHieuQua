import { ChiTietCauHoiComponent } from './quan-tri/cau-hoi/chi-tiet-cau-hoi/chi-tiet-cau-hoi.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/auth/adminGuard.service';
import { AuthGuardService } from 'src/auth/authGuard.service';
import { AllAccountComponent } from './Account/all-account/all-account.component';
import { SuaAccountComponent } from './Account/sua-account/sua-account.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { LogInOutComponent } from './layouts/log-in-out/log-in-out.component';
import { SignUpComponent } from './layouts/sign-up/sign-up.component';
import { UserComponent } from './layouts/user/user.component';
import { CauHoiComponent } from './quan-tri/cau-hoi/cau-hoi.component';
import { CourseComponent } from './quan-tri/course/course.component';
import { DiemThiComponent } from './quan-tri/diem-thi/diem-thi.component';
import { EditCourseComponent } from './quan-tri/edit-course/edit-course.component';
import { FaqComponent } from './quan-tri/faq/faq.component';
import { GiaoVienComponent } from './quan-tri/giao-vien/giao-vien.component';
import { GiupDoComponent } from './quan-tri/giup-do/giup-do.component';
import { LopHocComponent } from './quan-tri/lop-hoc/lop-hoc.component';
import { MenuNguoiDungComponent } from './quan-tri/menu-nguoi-dung/menu-nguoi-dung.component';
import { MonHocComponent } from './quan-tri/mon-hoc/mon-hoc.component';
import { NhomCauHoiComponent } from './quan-tri/nhom-cau-hoi/nhom-cau-hoi.component';
import { ChiTietFooterComponent } from './quan-tri/quan-tri-footer/chi-tiet-footer/chi-tiet-footer.component';
import { QuanTriFooterComponent } from './quan-tri/quan-tri-footer/quan-tri-footer.component';
import { SlideComponent } from './quan-tri/slide/slide.component';
import { StepComponent } from './quan-tri/step/step.component';
import { SuaFaqComponent } from './quan-tri/sua-faq/sua-faq.component';
import { SuaGiaoVienComponent } from './quan-tri/sua-giao-vien/sua-giao-vien.component';
import { SuaLopHocComponent } from './quan-tri/sua-lop-hoc/sua-lop-hoc.component';
import { SuaMonHocComponent } from './quan-tri/sua-mon-hoc/sua-mon-hoc.component';
import { BaiKiemTraComponent } from './quan-tri/test/bai-kiem-tra/bai-kiem-tra.component';
import { SuaBaiKiemTraComponent } from './quan-tri/test/sua-bai-kiem-tra/sua-bai-kiem-tra.component';
import { ThanhToanComponent } from './quan-tri/thanh-toan/thanh-toan.component';
import { ChiTietThongBaoComponent } from './quan-tri/thong-bao/chi-tiet-thong-bao/chi-tiet-thong-bao.component';
import { ThongBaoComponent } from './quan-tri/thong-bao/thong-bao.component';
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
import { ChiTietMonHocComponent } from './user/chi-tiet-mon-hoc/chi-tiet-mon-hoc.component';
import { GioiThieuChiTietComponent } from './user/gioi-thieu/gioi-thieu-chi-tiet/gioi-thieu-chi-tiet.component';
import { GioiThieuComponent } from './user/gioi-thieu/gioi-thieu.component';
import { HuongDanComponent } from './user/huong-dan/huong-dan.component';
import { KhoaHocComponent } from './user/khoa-hoc/khoa-hoc.component';
import { KiemTraNangLucComponent } from './user/kiem-tra-nang-luc/kiem-tra-nang-luc.component';
import { DoiMatKhauComponent } from './user/tai-khoan/doi-mat-khau/doi-mat-khau.component';
import { KhoaHocCuaToiComponent } from './user/tai-khoan/khoa-hoc-cua-toi/khoa-hoc-cua-toi.component';
import { KichHoatKhoaHocComponent } from './user/tai-khoan/kich-hoat-khoa-hoc/kich-hoat-khoa-hoc.component';
import { QuaTrinhHocTapComponent } from './user/tai-khoan/qua-trinh-hoc-tap/qua-trinh-hoc-tap.component';
import { ThongTinCaNhanComponent } from './user/tai-khoan/thong-tin-ca-nhan/thong-tin-ca-nhan.component';
import { TatCaKhoaHocComponent } from './user/tat-ca-khoa-hoc/tat-ca-khoa-hoc.component';
import { ThongBaoAllComponent } from './user/thong-bao-all/thong-bao-all.component';
import { TongQuanComponent } from './user/tong-quan/tong-quan.component';
import { ChiTietTuyenDungComponent } from './user/tuyen-dung/chi-tiet-tuyen-dung/chi-tiet-tuyen-dung.component';
import { TuyenDungComponent } from './user/tuyen-dung/tuyen-dung.component';
import { UserChiTietGvComponent } from './user/user-gv/user-chi-tiet-gv/user-chi-tiet-gv.component';
import { UserGvComponent } from './user/user-gv/user-gv.component';
import { ChiTietBaiHocComponent } from './user/chi-tiet-bai-hoc/chi-tiet-bai-hoc.component';
import { ChiTietStepComponent } from './quan-tri/step/chi-tiet-step/chi-tiet-step.component';
import { StepConComponent } from './quan-tri/step/step-con/step-con.component';
import { ThuVienComponent } from './quan-tri/thu-vien/thu-vien.component';
import { BaiKtnlComponent } from './user/kiem-tra-nang-luc/bai-ktnl/bai-ktnl.component';
import { NamHocComponent } from './quan-tri/nam-hoc/nam-hoc.component';
import { ChiTietNamHocComponent } from './quan-tri/nam-hoc/chi-tiet-nam-hoc/chi-tiet-nam-hoc.component';
import { ChatComponent } from './user/chat/chat.component';

const routes: Routes = [
  {
    path: 'quan-tri', component: AdminComponent, canActivate: [AdminGuard],
    children: [
      {path: '', redirectTo: 'tai-khoan', pathMatch: 'full'},
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
      {path: 'khoa-hoc/:id/:courseId/them-moi', component: SuaBaiKiemTraComponent},
      {path: 'khoa-hoc/:id/:courseId/:testId', component: SuaBaiKiemTraComponent},
      {path: 'khoa-hoc/them-khoa-hoc', component: EditCourseComponent},
      {path: 'bai-kiem-tra', component: BaiKiemTraComponent},
      {path: 'bai-kiem-tra/:id', component: SuaBaiKiemTraComponent},
      {path: 'bai-kiem-tra/them-bai-kiem-tra', component: SuaBaiKiemTraComponent},
      {path: 'yeu-cau-tu-van', component: YeuCauTuVanComponent},
      {path: 'yeu-cau-tu-van/:id', component: ChiTietTuVanComponent},
      {path: 'tro-giup', component: TroGiupComponent},
      {path: 'tro-giup/:id', component: ChiTietTroGiupComponent},
      {path: 'ung-vien', component: UngVienComponent},
      {path: 'ung-vien/:id', component: ChiTietUngVienComponent},
      {path: 'thanh-toan', component: ThanhToanComponent},
      {path: 'giup-do', component: GiupDoComponent},
      {path: 'cau-hoi', component: CauHoiComponent},
      {path: 'cau-hoi/:id', component: ChiTietCauHoiComponent},
      {path: 'nhom-cau-hoi', component: NhomCauHoiComponent},
      {path: 'menu', component: MenuNguoiDungComponent},
      {path: 'thong-bao', component: ThongBaoComponent},
      {path: 'thong-bao/:id', component: ChiTietThongBaoComponent},
      {path: 'footer', component: QuanTriFooterComponent},
      {path: 'footer/:id', component: ChiTietFooterComponent},
      {path: 'step/0', component: StepComponent},
      {path: 'step/0/:id', component: ChiTietStepComponent},
      {path: 'step/1/:id', component: StepConComponent},
      {path: 'diem-thi', component: DiemThiComponent},
      {path: 'thu-vien', component: ThuVienComponent},
      {path: 'nam-hoc', component: NamHocComponent},
      {path: 'nam-hoc/:id', component: ChiTietNamHocComponent},
      {path: 'chat', component: ChatComponent, canActivate: [AuthGuardService]}
    ]
  },
  {
    path: '', component: UserComponent,
    children: [
      {path: '', component: TongQuanComponent},
      {path: 'tong-quan', component: TongQuanComponent},
      {path: 'gioi-thieu', component: GioiThieuComponent},
      {path: 'gioi-thieu/:id', component: GioiThieuChiTietComponent},
      {path: 'gioi-thieu/danh-muc/:id', component: GioiThieuComponent},
      {path: 'kiem-tra-nang-luc', component: KiemTraNangLucComponent},
      {path: 'kiem-tra-nang-luc/:id', component: BaiKtnlComponent},
      {path: 'tuyen-dung', component: TuyenDungComponent},
      {path: 'tuyen-dung/:id', component: ChiTietTuyenDungComponent},
      {path: 'huong-dan', component: HuongDanComponent},
      {path: 'khoa-hoc', component: TatCaKhoaHocComponent},
      {path: 'khoa-hoc/:id', component: KhoaHocComponent},
      {path: 'giao-vien', component: UserGvComponent},
      {path: 'giao-vien/:id', component: UserChiTietGvComponent},
      {path: 'mon-hoc/:id', component: ChiTietMonHocComponent},
      {path: 'mon-hoc/:id/:testId', component: ChiTietBaiHocComponent},
      {path: 'tai-khoan/thong-tin-ca-nhan', component: ThongTinCaNhanComponent, canActivate: [AuthGuardService]},
      {path: 'tai-khoan/doi-mat-khau', component: DoiMatKhauComponent, canActivate: [AuthGuardService]},
      {path: 'tai-khoan/khoa-hoc-cua-toi', component: KhoaHocCuaToiComponent, canActivate: [AuthGuardService]},
      {path: 'tai-khoan/kich-hoat-khoa-hoc', component: KichHoatKhoaHocComponent, canActivate: [AuthGuardService]},
      {path: 'tai-khoan/qua-trinh-hoc-tap', component: QuaTrinhHocTapComponent, canActivate: [AuthGuardService]},
      {path: 'chat', component: ChatComponent, canActivate: [AuthGuardService]},
      {path: 'thong-bao/:type', component: ThongBaoAllComponent}
    ]
  },
  {
    path: 'dang-nhap', component: LogInOutComponent
  },
  {
    path: 'dang-ky', component: SignUpComponent
  }
 
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}