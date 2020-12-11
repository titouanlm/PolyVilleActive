import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../display-for-all/display-for-all.component';
import {Router} from "@angular/router";
import {InhabitantService} from "../../services/inhabitant.service";

@Component({
  selector: 'app-visitor-inhabitant-authentication',
  templateUrl: './popup-visitor-inhabitant-authentication.component.html',
  styleUrls: ['./popup-visitor-inhabitant-authentication.component.scss']
})

export class PopupVisitorInhabitantAuthenticationComponent implements OnInit {
  number: number;
  error = '';
  validate =  false;
  constructor(private dialogRef: MatDialogRef<PopupVisitorInhabitantAuthenticationComponent>, private router: Router, private inhabitantService: InhabitantService) {
  }

  ngOnInit(): void {
  }

  authenticate() {
    this.inhabitantService.authenticateInhabitant(Number(this.number))
      .subscribe(
        data => {
          this.dialogRef.close();
          this.router.navigate(['visitorinhabitant']);
          this.validate = true;
        },
        error => {
          this.error = 'Habitant inconnu.';
          console.log(this.error);
        });
  }




}
