import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
})
export class TerminalComponent implements OnInit {
  @ViewChild('stack', { static: true }) stackEl!: ElementRef
  @ViewChild('queue', { static: true }) queueEl!: ElementRef

  constructor() {}

  ngOnInit(): void {
  }
}
