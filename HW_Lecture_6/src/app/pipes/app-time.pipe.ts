import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appTime'
})
export class AppTimePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value + ' min';
  }

}
