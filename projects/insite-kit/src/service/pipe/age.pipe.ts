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
      age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }
    return `${age} years old`;
  }
}
