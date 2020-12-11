import { Component, OnInit } from '@angular/core';
import {InhabitantService} from '../../services/inhabitant.service';
import {Inhabitant} from "../../models/inhabitant.model";
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-basic-display',
  templateUrl: './visitor-inhabitant-display.component.html',
  styleUrls: ['./visitor-inhabitant-display.component.scss']
})
export class VisitorInhabitantDisplayComponent implements OnInit {

  public inhabitant: Inhabitant;

  constructor(public inhabitantService: InhabitantService) {
    this.inhabitant = this.inhabitantService.currentInhabitantValue;
  }

  ngOnInit() {
  }

  logout() {
    this.inhabitantService.logout();
  }
}
