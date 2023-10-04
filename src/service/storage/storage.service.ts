import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileItem } from 'ng2-file-upload';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  readonly BASE_PATH = 'api/ftp-storage';

  constructor(private readonly request: RequestService) {}

  get(params?: Map<string, string[]>): Observable<HttpResponse<any[]>> {
    return this.request.get<any[]>(this.BASE_PATH, params);
  }

  upload(fItem: FileItem, path: string = ''): Observable<FileItem> {
    return this.request.upload(this.BASE_PATH, fItem, path);
  }
}
