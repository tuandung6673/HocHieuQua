import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DetailAnswerComponent } from "./detail-answer.component";
import {DropdownModule} from 'primeng/dropdown';
import { AppDienVaoChoTrongComponent, AppDienVaoNhieuKhoangTrong, AppDungSaiComponent, AppMotLuaChonComponent, AppNhieuLuaChonComponent, AppNhieuTrinhThaDonXuongComponent, AppPhuHopComponent, AppTieuLuanComponent } from "./child-answer-component";
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    DropdownModule,
    EditorModule,
    
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