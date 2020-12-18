import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {TownHallEmployeeService} from "../../services/townHallEmployee.service";

@Component({
  selector: 'app-popup-town-hall-employee-authentification',
  templateUrl: './popup-town-hall-employee-authentification.component.html',
  styleUrls: ['./popup-town-hall-employee-authentification.component.scss']
})
export class PopupTownHallEmployeeAuthentificationComponent implements OnInit {

  number: number;
  error = '';

  constructor(private dialogRef: MatDialogRef<PopupTownHallEmployeeAuthentificationComponent>,
              private router: Router, private employeeService: TownHallEmployeeService) { }

  ngOnInit(): void {
  }

  authenticate() {
    this.employeeService.authenticateEmployee(Number(this.number))
      .subscribe(
        data => {
          this.dialogRef.close();
          this.router.navigate(['town-hall-employee']);
        },
        error => {
          this.error = 'Unknown town hall employee.';
          console.log(this.error);
        });
  }
}
