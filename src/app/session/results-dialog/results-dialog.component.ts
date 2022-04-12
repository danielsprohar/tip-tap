import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Metrica } from '../models/metrica'
import { SessionService } from '../services/session.service'

@Component({
  selector: 'app-results-dialog',
  templateUrl: './results-dialog.component.html',
  styleUrls: ['./results-dialog.component.scss'],
})
export class ResultsDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Metrica,
    private readonly session: SessionService,
    private dialogRef: MatDialogRef<ResultsDialogComponent>
  ) {}

  ngOnInit(): void {}

  resetSession() {
    this.session.reset()
    this.dialogRef.close()
  }
}
