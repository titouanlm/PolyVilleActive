import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from "@angular/router";
import {InhabitantService} from "../../services/inhabitant.service";
import {AutorisationService} from "../../services/autorisation.service";
import {Autorisation} from "../../models/autorisation.model";
import {DialogDataAutorisation} from "../visitor-inhabitant-display/visitor-inhabitant-display.component";
//import { VisitorInhabitantDisplayComponent} from "../visitor-inhabitant-display/visitor-inhabitant-display.component";


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
              //private visitorinhabitantdisplay:VisitorInhabitantDisplayComponent,
              @Inject(MAT_DIALOG_DATA) public data:DialogDataAutorisation) { }

  ngOnInit(): void {
  }

  Authorize()
  {
    this.autorisation.shopId=Number(this.data.shop.id);
    this.autorisation.inhabitantId=this.data.inhabitant.id;
    this.autorisationService.addAutorisation(this.autorisation);
    this.dialogRef.close();
    // this.visitorinhabitantdisplay.move();
  }

  Refuse()
  {
    this.dialogRef.close();
  }
  authenticate() {
    this.inhabitantService.authenticateInhabitant(Number(this.number))
      .subscribe(
        data => {
          this.dialogRef.close();
          this.router.navigate(['visitorinhabitant']);
        },
        error => {
          this.error = 'Unknown inhabitant.';
          console.log(this.error);
        });
  }




}
