import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DehyphenatePipe } from './pipes/dehyphenate.pipe'

@NgModule({
  declarations: [DehyphenatePipe],
  imports: [CommonModule],
  exports: [DehyphenatePipe],
})
export class SharedModule {}
