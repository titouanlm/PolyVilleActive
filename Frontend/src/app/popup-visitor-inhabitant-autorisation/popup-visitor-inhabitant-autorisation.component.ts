import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from "@angular/router";
import {InhabitantService} from "../../services/inhabitant.service";
import {AutorisationService} from "../../services/autorisation.service";
import {Autorisation} from "../../models/autorisation.model";
import {DialogDataAutorisation} from "../visitor-inhabitant-display/visitor-inhabitant-display.component";


@Component({
  selector: 'app-visitor-inhabitant-autorisation',
  templateUrl: './popup-visitor-inhabitant-autorisation.component.html',
  styleUrls: ['./popup-visitor-inhabitant-autorisation.component.scss']
})

export class PopupVisitorInhabitantAutorisationComponent implements OnInit {

  number: number;
  error = '';
  public autorisation=<Autorisation>{};

  constructor(public dialogRef: MatDialogRef<PopupVisitorInhabitantAutorisationComponent>,
              private router: Router, private inhabitantService: InhabitantService,
              private autorisationService:AutorisationService,
              @Inject(MAT_DIALOG_DATA) public data:DialogDataAutorisation) { }

  ngOnInit(): void {
  }

  /**
   * Close the dialog and authorize a client to go further
   */

  Authorize() {
    this.autorisation.shopId=Number(this.data.shop.id);
    this.autorisation.inhabitantId=this.data.inhabitant.id;
    this.autorisationService.addAutorisation(this.autorisation);
    this.dialogRef.close('true');

  }

  /**
   * Close the dialog and refuse a client to go further
   */


  Refuse() {
    this.dialogRef.close('false');
  }





}
