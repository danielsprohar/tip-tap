import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionRoutingModule } from './session-routing.module';
import { SessionComponent } from './session.component';
import { TerminalComponent } from './terminal/terminal.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { ResultsDialogComponent } from './results-dialog/results-dialog.component';
import { SharedModule } from '../shared/shared.module';


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
  ]
})
export class SessionModule { }
