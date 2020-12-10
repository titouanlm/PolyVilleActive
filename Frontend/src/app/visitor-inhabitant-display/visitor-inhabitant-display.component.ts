import { Component, OnInit } from '@angular/core';
import {InhabitantService} from '../../services/inhabitant.service';

@Component({
  selector: 'app-basic-display',
  templateUrl: './visitor-inhabitant-display.component.html',
  styleUrls: ['./visitor-inhabitant-display.component.scss']
})
export class VisitorInhabitantDisplayComponent implements OnInit {

  public inhabitant;

  public number: number;

  constructor(public inhabitantService: InhabitantService) {
    this.number=this.inhabitantService.number;
    const inhabitant = inhabitantService.getInhabitant(this.number);
    if (inhabitant === null){
      this.inhabitant = inhabitantService.createInhabitant(this.number);
    }
    else {
      this.inhabitant = inhabitant
    }
  }

  ngOnInit() {
  }

}
