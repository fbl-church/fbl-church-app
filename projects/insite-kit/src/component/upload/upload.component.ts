import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { FileItem, FileUploaderOptions } from 'ng2-file-upload';

import { Observable, Subject, concat, concatMap, takeUntil, tap, toArray } from 'rxjs';
import { InsiteFileUploader } from './file-uploader.model';

@Component({
  selector: 'ik-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent implements OnInit, OnDestroy {
  @Input() options: FileUploaderOptions;
  @Input() uploadProcessor: () => Observable<FileItem>;
  @Output() uploadClick: EventEmitter<FileItem[]> = new EventEmitter<FileItem[]>();
  @Output() fileAdded: EventEmitter<void> = new EventEmitter<void>();
  @Input() isCSVOnly: boolean;
  @Input() isMultiple: boolean;

  MAX_FILE_SIZE = 64 * 1024 * 1024; // 64 MB
  uploader: InsiteFileUploader;
  uploadBtnDisabled: boolean;
  hasFileOver: boolean;
  private pFileTypes: string;
  private stopPreviousUpload = new Subject<void>();
  progressCount = 0;

  uploadStarted = false;
  uploadProgress = 0;
  successfulFiles: FileItem[] = [];

  testProgress = 0;

  constructor() {}

  @Input('allFileTypes')
  public set allFileTypes(types: string[]) {
    this.pFileTypes = types.map((type) => `.${type}`).join(', ');
  }

  get fileTypes(): string {
    return this.pFileTypes;
  }

  /**
   * Initialize component
   */
  ngOnInit() {
    setInterval(() => {
      this.testProgress = this.testProgress + 5;
      if (this.testProgress >= 100) {
        this.testProgress = 0;
      }
    }, 500);

    this.options = { url: '', maxFileSize: this.MAX_FILE_SIZE };
    this.uploader = new InsiteFileUploader(this.options);
    this.uploadBtnDisabled = true;

    if (this.isCSVOnly === undefined) {
      this.isCSVOnly = true;
    }

    if (this.isCSVOnly) {
      this.allFileTypes = ['csv'];
    }

    this.uploader.onAfterAddingFile = () => {
      this.uploadBtnDisabled = false;
      this.fileAdded.emit();
    };
  }

  ngOnDestroy() {
    this.stopPreviousUpload.next();
  }

  /**
   * Handle upload button click
   */
  onUploadClick() {
    this.stopPreviousUpload.next();
    this.resetQueueFileStatus();

    concat(this.uploader.queue)
      .pipe(
        tap((f) => this.fileActiveStatus(f)),
        concatMap((f) => this.uploadProcessor.call(this, f)),
        tap(() => this.uploadProgress++),
        toArray(),
        takeUntil(this.stopPreviousUpload)
      )
      .subscribe(() => {
        this.successfulFiles = this.uploader.queue.filter((f) => !f.isError);
        this.uploadClick.emit(this.uploader.queue);
      });
  }

  /**
   * Remove item from the queue.
   *
   * @param item FileItem object
   */
  remove(item: FileItem) {
    this.resetQueueFileStatus(false);
    item.remove();

    if (this.uploader.queue.length === 0) {
      this.uploadBtnDisabled = true;
    }
  }

  /**
   * Clears the queue, convenience method, also allows controlling behavior better.
   */
  clearQueue() {
    this.uploader.clearQueue();
    this.uploadBtnDisabled = true;
  }

  /**
   * Sets hasFileOver for styling
   *
   * @param event Event
   */
  fileOver(e: any) {
    this.hasFileOver = e;
  }

  /**
   * Change event handler for file select input
   *
   * @param event Event
   */
  onChange(event: any) {
    if (event && event.target) {
      event.target.value = '';
    }
  }

  resetQueueFileStatus(uploadStart = true) {
    this.uploadStarted = uploadStart;
    this.uploadProgress = 1;
    this.uploader.queue.forEach((f) => {
      f.isUploaded = false;
      f.isUploading = false;
      f.isSuccess = false;
      f.isError = false;
    });
  }

  fileActiveStatus(f: FileItem) {
    f.isUploaded = false;
    f.isUploading = true;
  }

  fileSuccessStatus(f: FileItem) {
    f.isUploaded = true;
    f.isUploading = false;
    f.isSuccess = true;
  }

  fileErrorStatus(f: FileItem) {
    f.isUploaded = true;
    f.isUploading = false;
    f.isError = true;
  }
}
