import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SessionRoutingModule } from './session-routing.module'
import { SessionComponent } from './session.component'
import { TerminalComponent } from './terminal/terminal.component'
import { KeyboardComponent } from './keyboard/keyboard.component'
import { ResultsDialogComponent } from './results-dialog/results-dialog.component'
import { SharedModule } from '../shared/shared.module'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog'
import { SessionService } from './services/session.service'
import { KeyboardService } from './services/keyboard.service'
import { RandomWordGeneratorService } from './services/random-word-generator.service'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  declarations: [
    SessionComponent,
    TerminalComponent,
    KeyboardComponent,
    ResultsDialogComponent,
  ],
  imports: [
    CommonModule,
    SessionRoutingModule,
    SharedModule,
    MatTooltipModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [
    SessionService,
    KeyboardService,
    RandomWordGeneratorService,
    {
      provide: MatDialogRef,
      useValue: {},
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {},
    },
  ],
})
export class SessionModule {}
