import { Pipe, PipeTransform } from '@angular/core';
import { Guardian } from '../../model/user.model';

@Pipe({
  name: 'address',
})
export class AddressPipe implements PipeTransform {
  transform(g: Guardian): any {
    if (g.address) {
      return `${g.address} ${g.city}, ${g.state} ${g.zipCode}`;
    }
    return '-';
  }
}
