import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupVisitorInhabitantAuthenticationComponent } from '../popup-visitor-inhabitant-authentication/popup-visitor-inhabitant-authentication.component';
import { Router } from '@angular/router';
import {InhabitantService} from "../../services/inhabitant.service";

export interface DialogData {
  number: number;
}

@Component({
  selector: 'app-display-for-all',
  templateUrl: './display-for-all.component.html',
  styleUrls: ['./display-for-all.component.scss']
})
export class DisplayForAllComponent implements OnInit {

  number: number;

  constructor(public dialog: MatDialog, private router: Router, public inhabitantService: InhabitantService) { }

  openDialog() {
    const dialogRef = this.dialog.open(PopupVisitorInhabitantAuthenticationComponent, {
      width: '18%',
      height: '26%',
      data: {number: this.number}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.number = result;
      if (this.number != null) {
        this.inhabitantService.number = this.number;
        this.router.navigate(['visitorinhabitant']);
      }
    });
  }

  ngOnInit(): void {
  }

}
