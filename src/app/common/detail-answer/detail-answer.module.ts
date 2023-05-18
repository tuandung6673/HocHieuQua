import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DetailAnswerComponent } from "./detail-answer.component";
import {DropdownModule} from 'primeng/dropdown';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AppDienVaoChoTrongComponent, AppDienVaoNhieuKhoangTrong, AppDungSaiComponent, AppMotLuaChonComponent, AppNhieuLuaChonComponent, AppNhieuTrinhThaDonXuongComponent, AppPhuHopComponent, AppTieuLuanComponent } from "./child-answer-component";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    DropdownModule,
    CKEditorModule
  ],
  declarations : [
    DetailAnswerComponent,
    AppNhieuLuaChonComponent,
    AppMotLuaChonComponent,
    AppNhieuTrinhThaDonXuongComponent,
    AppDungSaiComponent,
    AppDienVaoChoTrongComponent,
    AppDienVaoNhieuKhoangTrong,
    AppPhuHopComponent,
    AppTieuLuanComponent
  ],
  exports: [
    DetailAnswerComponent
  ]
})

export class DetailAnswerModule {}