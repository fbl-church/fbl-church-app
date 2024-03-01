import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';

export interface FTPFile {
  name?: string;
  size?: number;
  file?: boolean;
  directory?: boolean;
  timestamp?: Date;
  [x: string]: any;
}

export class InsiteFileUploader extends FileUploader {
  constructor(options: FileUploaderOptions) {
    super(options);
  }
}
