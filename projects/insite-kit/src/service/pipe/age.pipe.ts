import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(value: any): any {
    let age: number;
    var dateParts = value.split('-');
    var dateObject = new Date(+dateParts[0], dateParts[1] - 1, +dateParts[2]);

    if (value) {
      var timeDiff = Math.abs(Date.now() - new Date(dateObject).getTime());
      age = timeDiff / (1000 * 3600 * 24) / 365;
    }

    return age > 1 ? `${Math.floor(age)} years old` : `${Math.floor(age * 12)} months old`;
  }
}
