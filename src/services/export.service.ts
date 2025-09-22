import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
    providedIn: 'root'
})
export class ExportService {

    fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    fileExtension = '.xlsx';

    constructor() { }

    // public exportExcel({ jsonData, fileName }: { jsonData: any[]; fileName: string; }): void {
    //     const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    //     const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    //     const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    //     this.saveExcelFile(excelBuffer, fileName);
    // }

    // private saveExcelFile(buffer: any, fileName: string): void {
    //     const data: Blob = new Blob([buffer], {type: this.fileType});
    //     FileSaver.saveAs(data, fileName + this.fileExtension);
    // }

    expoetExcel(exportData, fileName) {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, fileName + '.xlsx');
    }
}