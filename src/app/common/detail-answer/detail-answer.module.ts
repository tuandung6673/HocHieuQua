import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DetailAnswerComponent } from "./detail-answer.component";
import {DropdownModule} from 'primeng/dropdown';
import { AppMotLuaChonComponent, AppNhieuLuaChonComponent, AppNhieuTrinhThaDonXuongComponent } from "./child-answer-component";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    DropdownModule
  ],
  declarations : [
    DetailAnswerComponent,
    AppNhieuLuaChonComponent,
    AppMotLuaChonComponent,
    AppNhieuTrinhThaDonXuongComponent
  ],
  exports: [
    DetailAnswerComponent
  ]
})

export class DetailAnswerModule {}