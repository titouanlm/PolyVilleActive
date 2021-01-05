import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from "@angular/router";
import {CulturalActorService} from "../../services/culturalActor.service";

@Component({
  selector: 'app-popup-cultural-actor-authentification',
  templateUrl: './popup-cultural-actor-authentification.component.html',
  styleUrls: ['./popup-cultural-actor-authentification.component.scss']
})
export class PopupCulturalActorAuthentificationComponent implements OnInit {

  number: number;
  error = '';

  constructor(private dialogRef: MatDialogRef<PopupCulturalActorAuthentificationComponent>,
              private router: Router, private culturaActorService: CulturalActorService) { }

  ngOnInit(): void {
  }

  /**
   * This method authenticate a cultural actor in the system
   */

  authenticate() {
    this.culturaActorService.authenticateActor(Number(this.number))
      .subscribe(
        data => {
          this.dialogRef.close();
          this.router.navigate(['cultural-actor']);
        },
        error => {
          this.error = 'Unknown cultural actor.';
          console.log(this.error);
        });
  }

}
