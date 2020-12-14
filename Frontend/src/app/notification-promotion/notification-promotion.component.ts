import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../visitor-inhabitant-display/visitor-inhabitant-display.component";

@Component({
  selector: 'app-notification-promotion',
  templateUrl: './notification-promotion.component.html',
  styleUrls: ['./notification-promotion.component.scss']
})
export class NotificationPromotionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NotificationPromotionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }



}
