import { Pipe, PipeTransform } from '@angular/core';
import { TranslationKey } from '../../model/common.model';
import { CommonService } from '../common/common.service';

@Pipe({ name: 'churchGroupTranslate' })
export class ChurchGroupTranslationPipe implements PipeTransform {
  constructor(private readonly commonService: CommonService) {}
  transform(value: string): string {
    return this.commonService.translate(value, TranslationKey.CHURCH_GROUP);
  }
}
