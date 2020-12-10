import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../display-for-all/display-for-all.component';

@Component({
  selector: 'app-visitor-inhabitant-authentication',
  templateUrl: './popup-visitor-inhabitant-authentication.component.html',
  styleUrls: ['./popup-visitor-inhabitant-authentication.component.scss']
})

export class PopupVisitorInhabitantAuthenticationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

}
