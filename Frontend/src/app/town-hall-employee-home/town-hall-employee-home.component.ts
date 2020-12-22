import { Component, OnInit } from '@angular/core';
import {TownHallEmployee} from "../../models/townHallEmployee.model";
import {TownHallEmployeeService} from "../../services/townHallEmployee.service";

@Component({
  selector: 'app-town-hall-employee-home',
  templateUrl: './town-hall-employee-home.component.html',
  styleUrls: ['./town-hall-employee-home.component.scss']
})
export class TownHallEmployeeHomeComponent implements OnInit {

  public townHallEmployee : TownHallEmployee;

  constructor(public townHallEmployeeService: TownHallEmployeeService) {
    this.townHallEmployee = this.townHallEmployeeService.employee;
  }

  ngOnInit(): void {
  }

  logout() {
    this.townHallEmployeeService.logout();
  }
}
