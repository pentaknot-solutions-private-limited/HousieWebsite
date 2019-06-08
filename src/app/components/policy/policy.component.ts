import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PolicyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: 'some data') {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

}
