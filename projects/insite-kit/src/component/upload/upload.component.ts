import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FileItem, FileUploaderOptions } from 'ng2-file-upload';

import { InsiteFileUploader } from './file-uploader.model';

@Component({
  selector: 'ik-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent implements OnInit {
  @Input() options: FileUploaderOptions;
  @Output() uploadClick: EventEmitter<FileItem[]> = new EventEmitter<
    FileItem[]
  >();
  @Output() fileAdded: EventEmitter<void> = new EventEmitter<void>();
  @Input() isCSVOnly: boolean;
  @Input() isMultiple: boolean;

  uploader: InsiteFileUploader;
  uploadBtnDisabled: boolean;
  hasFileOver: boolean;
  private pFileTypes: string;

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

  /**
   * Handle upload button click
   */

  onUploadClick() {
    this.uploadClick.emit(this.uploader.queue);
  }

  /**
   * remove
   * @description Remove item from queue
   * @param item FileItem object
   */
  remove(item: FileItem) {
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
   * fileOver
   * @description Sets hasFileOver for styling
   * @param event Event
   */

  fileOver(e: any) {
    this.hasFileOver = e;
  }

  /**
   * onChange
   * @description Change event handler for file select input
   * @param event Event
   */

  onChange(event: any) {
    if (event && event.target) {
      event.target.value = '';
    }
  }
}
