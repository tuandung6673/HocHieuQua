import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { LibraryFolder } from 'src/models/libraryFolder.model';
import { ApiService } from 'src/services/api.service.service';
import * as queryString from 'querystring-es3';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-chon-anh',
  templateUrl: './chon-anh.component.html',
  styleUrls: ['./chon-anh.component.scss']
})
export class ChonAnhComponent implements OnInit {

  queryParams = {
    callFromAdmin : 1,
    folderId: '',
    type: ''
  };
  dataOption : any[] = [];
  libraryFolder : LibraryFolder[] = [];
  selectItem : any;
  listFiles : LibraryFolder[] = [];
  displayBasic : boolean = false;
  isParentRoot : boolean;
  nameFolder : string;
  isChoose : boolean = false;
  isChooseImg : boolean = false;
  displayUpload : boolean = false;
  contextItems = [
    {label: 'Thêm thư mục', icon: 'pi pi-folder', command: (event) => this.showBasicDialog(false)},
    {label: 'Xóa folder', icon: 'pi pi-trash', command: (event) => this.deleteNode(this.selectItem)},
    {label: 'Thêm file', icon: 'pi pi-file'},
  ]

  newFolder : LibraryFolder = new LibraryFolder();

  constructor(public ref: DynamicDialogRef, private dialogService: DialogService ,private messageService: MessageService, private apiService: ApiService, private spinner: NgxSpinnerService, private confirmationService: ConfirmationService) {
    
  }

  ngOnInit(): void {
    this.getLibraryFolder();

  }


  getLibraryFolder() {
    this.spinner.show();
    this.apiService.getLibraryFolder(this.queryParams)
    .pipe(
      finalize(() => this.spinner.hide())
    )
    .subscribe(response => {
      this.libraryFolder = response.data.data.filter(l => l.type == 'folder');
      this.convertJsonToStructTree(this.libraryFolder);
    })
  }

  nodeSelect(selectNode) {
    this.isChoose = true;
    this.getLibrariesFile(this.selectItem.key);
  }

  getLibrariesFile(nodeId) {
    const queryObj = {
      callFromAdmin: 1,
      folderId: nodeId,
      offSet: 0,
      pageSize: 30,
      type: ''
    }
    this.spinner.show();
    this.apiService.getLibraryFile(queryObj)
    .pipe(
      finalize(() => this.spinner.hide())
    )
    .subscribe(response => {
      this.listFiles = response.data.data;
      // this.listFiles.map((l) => {
      //   l.url = "https://tank8.bsite.net/images/" + l.url;
      // })
    })
  }

  showBasicDialog(isParentRoot) {
    this.displayBasic = true;
    this.isParentRoot = isParentRoot;
  }

  addFolder() {
    const data = {
      ...this.newFolder,
      fromAdmin: 1,
      name: this.nameFolder,
      type: 'folder',
      parentId: this.isParentRoot ? '' : this.selectItem.key
    }
    this.apiService.setLibrary(data)
    .pipe(
      finalize(() => {
        this.nameFolder = null;
        this.displayBasic = false;
      })
    )
    .subscribe(response => {
      if(response.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'Thông báo', detail: response.message});
        this.getLibraryFolder();
      } else {
        this.messageService.add({severity: 'error', summary: 'Thông báo', detail: response.message})
      }
    })    
  }

  deleteNode(selectedNode) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn khóa học này ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService.deleteLibrary(selectedNode.key).subscribe(response => {
          if(response.status == 'success') {
            this.messageService.add({severity: 'success', summary: 'Thông báo', detail: response.data.messages})
            this.getLibraryFolder();
          } else {
            this.messageService.add({severity: 'error', summary: 'Thông báo', detail: response.data.messages})
          }
        })
      }
    })
  }

  deleteImage(file) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn khóa học này ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const queeyParams = queryString.stringify({id: file.id, imagePath: file.url})
        this.apiService.deleteLibraryFile(queeyParams).subscribe(response => {
          if(response.status == 'success') {
            this.messageService.add({severity: 'success', summary: 'Thông báo', detail: response.data.messages})
            this.listFiles = this.listFiles.filter(l => l.id != file.id)
            
            // this.getLibraryFolder();
          } else {
            this.messageService.add({severity: 'error', summary: 'Thông báo', detail: response.data.messages})
          }
        })
      }
    })
  }

  showDisplayUpload() {
    this.displayUpload = true;
  }

  onBasicUpload(event) {
  }

  selectImage(imgUrl) {
    this.ref.close(imgUrl);
  }
  
  bindingData = (item: any) => {
    return {
      nodeId: item.id,
      data: item,
      key: item.id,
      label: item.name,
      children: item.children,
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder'
    }
  }  

  convertJsonToStructTree = (list: any[]) => {
    const map: any = {};
    let node, i, roots = [];
    for (i = 0; i < list.length; i += 1) {
        map[list[i].id] = i; // initialize the map
        list[i].children = []; // initialize the children
    }
    for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.parentId !== '') {
            // if you have dangling branches check that map[node.parentId] exists
            if (list[map[node.parentId]]) {
                list[map[node.parentId]].children.push({
                    nodeId: node.id,
                    label: node.name,
                    key: node.id,
                    data: node,
                    expandedIcon: 'pi pi-folder-open',
                    collapsedIcon: 'pi pi-folder',
                    expanded: false,
                    children: node.children
                });
            }
        } else {
            roots.push(node);
        }
    }
    roots = roots.map(item => {
        return this.bindingData(item);
    });
    this.dataOption = roots
  }

}
