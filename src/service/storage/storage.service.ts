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

  upload(fItem: FileItem): Observable<FileItem> {
    return this.request.upload(this.BASE_PATH, fItem);
  }
}
