import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionRoutingModule } from './session-routing.module';
import { SessionComponent } from './session.component';
import { TerminalComponent } from './terminal/terminal.component';
import { KeyboardComponent } from './keyboard/keyboard.component';


@NgModule({
  declarations: [
    SessionComponent,
    TerminalComponent,
    KeyboardComponent,
  ],
  imports: [
    CommonModule,
    SessionRoutingModule
  ]
})
export class SessionModule { }
