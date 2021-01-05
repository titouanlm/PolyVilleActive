import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
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

  constructor(private dialogRef: MatDialogRef<PopupVisitorInhabitantAuthenticationComponent>,
              private router: Router, private inhabitantService: InhabitantService) { }

  ngOnInit(): void {
  }

  /**
   * This method authenticate an inhabitant or a visitor in the system
   */

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
