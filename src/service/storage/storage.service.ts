import { Injectable } from '@angular/core';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  readonly BASE_PATH = 'api/ftp-storage';

  constructor(private readonly request: RequestService) {}

  upload(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.request.post<any>(this.BASE_PATH, formData);
  }
}
