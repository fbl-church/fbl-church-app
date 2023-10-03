import { HttpResponse } from '@angular/common/http';

import { FileItem, FileUploader, FileUploaderOptions } from 'ng2-file-upload';

import { Observable } from 'rxjs';

export class InsiteFileUploader extends FileUploader {
  constructor(options: FileUploaderOptions) {
    super(options);
  }

  public uploadItem<T>(value: FileItem): Observable<HttpResponse<T>> {
    return;
  }
}
