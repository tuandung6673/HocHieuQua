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
import {MenuItem} from 'primeng/api';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AllAccountComponent } from './all-account/all-account.component';
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
const appRoutes: Routes = [
  {path: '', component: AllAccountComponent },
  {path: 'quan-tri/giao-vien', component: GiaoVienComponent},
  {path: 'quan-tri/giao-vien/them-giao-vien', component: SuaGiaoVienComponent},
  {path: 'quan-tri/giao-vien/:id', component: SuaGiaoVienComponent},
  {path: 'quan-tri/lop-hoc', component: LopHocComponent},
  {path: 'quan-tri/lop-hoc/them-lop-hoc', component: SuaLopHocComponent},
  {path: 'quan-tri/lop-hoc/:id', component: SuaLopHocComponent},
  {path: 'quan-tri/mon-hoc', component: MonHocComponent},
  {path: 'quan-tri/mon-hoc/:id', component: SuaMonHocComponent},
  {path: 'quan-tri/mon-hoc/them-mon-hoc', component: SuaMonHocComponent},
  {path: 'quan-tri/slide', component: SlideComponent},
  {path: 'quan-tri/faq', component: FaqComponent},
  {path: 'quan-tri/faq/them-faq', component: SuaFaqComponent},
  {path: 'quan-tri/faq/:id', component: SuaFaqComponent}

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
    SlideComponent,
    FaqComponent,
    SuaFaqComponent,
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
