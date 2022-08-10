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




import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AllAccountComponent } from './all-account/all-account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { GiaoVienComponent } from './giao-vien/giao-vien.component';
import { LopHocComponent } from './lop-hoc/lop-hoc.component';
import { MonHocComponent } from './mon-hoc/mon-hoc.component';
import { SuaGiaoVienComponent } from './sua-giao-vien/sua-giao-vien.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SuaLopHocComponent } from './sua-lop-hoc/sua-lop-hoc.component';
import { SuaMonHocComponent } from './sua-mon-hoc/sua-mon-hoc.component';
const appRoutes: Routes = [
  {path: '', component: AllAccountComponent },
  {path: 'giao-vien', component: GiaoVienComponent},
  {path: 'giao-vien/them-giao-vien', component: SuaGiaoVienComponent},
  {path: 'giao-vien/:id', component: SuaGiaoVienComponent},
  {path: 'lop-hoc', component: LopHocComponent},
  {path: 'lop-hoc/them-lop-hoc', component: SuaLopHocComponent},
  {path: 'lop-hoc/:id', component: SuaLopHocComponent},
  {path: 'mon-hoc', component: MonHocComponent},
  {path: 'mon-hoc', component: SuaMonHocComponent},
  {path: 'mon-hoc/:id', component: SuaMonHocComponent}

  // {path: ':id/edit', component: EditAccountComponent}
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
  ],
  imports: [
    CKEditorModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    ButtonModule,
    InputTextModule,
    ToggleButtonModule,
    ProgressSpinnerModule,
    MultiSelectModule,
    ConfirmDialogModule,
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
