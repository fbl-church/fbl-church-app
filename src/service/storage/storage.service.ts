import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { FileItem } from 'ng2-file-upload';
import { FTPFile } from 'projects/insite-kit/src/component/upload/file-uploader.model';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  readonly BASE_PATH = 'api/ftp-storage';

  constructor(private readonly request: RequestService) {}

  get(params?: Map<string, string[]>): Observable<HttpResponse<FTPFile[]>> {
    return this.request.get<FTPFile[]>(this.BASE_PATH, params);
  }

  upload(fItem: FileItem, path: string = ''): Observable<FileItem> {
    return this.request.upload(this.BASE_PATH, fItem, path);
  }

  getBlob(fileName: string, path: string = ''): Observable<Blob> {
    return this.request.download(
      `${this.BASE_PATH}/download`,
      new Map().set('file', [`${path}/${fileName}`])
    );
  }

  delete(filePath: string): Observable<any> {
    return this.request.delete(`${this.BASE_PATH}?file=${filePath}`);
  }

  download(b: Blob, fileName: string) {
    saveAs(new Blob([b], { type: 'application/octet-stream' }), fileName);
  }
}
