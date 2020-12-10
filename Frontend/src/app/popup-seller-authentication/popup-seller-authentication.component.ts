import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DialogData} from "../display-for-all/display-for-all.component";

@Component({
  selector: 'app-popup-seller-authentication',
  templateUrl: './popup-seller-authentication.component.html',
  styleUrls: ['./popup-seller-authentication.component.scss']
})
export class PopupSellerAuthenticationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

}
