import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'dehyphenate',
})
export class DehyphenatePipe implements PipeTransform {
  transform(value: string): string {
    return value ? value.replace(/-/g, ' ') : ''
  }
}
