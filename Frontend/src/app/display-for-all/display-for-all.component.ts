import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupVisitorInhabitantAuthenticationComponent } from '../popup-visitor-inhabitant-authentication/popup-visitor-inhabitant-authentication.component';
import {PopupSellerAuthenticationComponent} from "../popup-seller-authentication/popup-seller-authentication.component";
import {Promotion} from "../../models/event.model";
import {PopupTownHallEmployeeAuthentificationComponent} from "../popup-town-hall-employee-authentification/popup-town-hall-employee-authentification.component";
import {PopupCulturalActorAuthentificationComponent} from "../popup-cultural-actor-authentification/popup-cultural-actor-authentification.component";

@Component({
  selector: 'app-display-for-all',
  templateUrl: './display-for-all.component.html',
  styleUrls: ['./display-for-all.component.scss']
})
export class DisplayForAllComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openInhabitantsDialog() {
    const dialogRef = this.dialog.open(PopupVisitorInhabitantAuthenticationComponent, {
      width: '18%',
      height: '26%',
    });
  }

  openSellersDialog() {
    const dialogRef = this.dialog.open(PopupSellerAuthenticationComponent, {
      width: '18%',
      height: '26%'
    });
  }

  openEmployeesDialog() {
    const dialogRef = this.dialog.open(PopupTownHallEmployeeAuthentificationComponent, {
      width: '18%',
      height: '26%'
    });
  }

  openActorsDialog() {
    const dialogRef = this.dialog.open(PopupCulturalActorAuthentificationComponent, {
      width: '18%',
      height: '26%'
    });
  }

  ngOnInit(): void {
  }

}
