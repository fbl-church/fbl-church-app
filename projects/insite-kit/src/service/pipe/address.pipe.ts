import { Pipe, PipeTransform } from '@angular/core';
import { Gurdian } from '../../model/child.model';

@Pipe({
  name: 'address',
})
export class AddressPipe implements PipeTransform {
  transform(g: Gurdian): any {
    if (g.address) {
      return `${g.address} ${g.city}, ${g.state} ${g.zipCode}`;
    }
    return '-';
  }
}
