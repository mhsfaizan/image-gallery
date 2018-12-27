import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageName'
})
export class ImageNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.split("\\").pop();
  }

}
