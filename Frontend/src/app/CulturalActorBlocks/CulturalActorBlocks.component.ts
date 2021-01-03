import { Component, OnInit } from '@angular/core';
import {
  Category,
  CustomBlock,
  NgxBlocklyConfig,
  NgxBlocklyGeneratorConfig,
  NgxToolboxBuilderService,
  TEXT_CATEGORY,
  Separator
} from 'ngx-blockly';
import {CulturalEvent} from "../../models/event.model";
import {CulturalEventBlock} from "./CulturalEventBlock"
import {HourBlock} from "./HourBlock"
import {CulturalActorService} from "../../services/culturalActor.service";
import {ProhibitionRuleService} from "../../services/prohibitionRule.service";
import {ProhibitionRule} from "../../models/prohibitionRule.model";
import {DatePipe} from "@angular/common";
import {interval} from "rxjs";
import {takeWhile} from "rxjs/operators";
import {ShowHallService} from "../../services/showHall.service";
import {ShowHall} from "../../models/showHall.model";


declare var Blockly: any;


@Component({
  selector: 'app-CulturalActorBlocks',
  templateUrl: './CulturalActorBlocks.component.html',
  styleUrls: ['./CulturalActorBlocks.component.scss'],
  providers: [DatePipe]
})
export class CulturalActorBlocksComponent {

  public config: NgxBlocklyConfig = {};

  public customBlocks1: CustomBlock[] = [
      new CulturalEventBlock('culturalEvent' , null , null),
      new HourBlock('hourBlock' , null , null)
  ];


  public customBlocks: CustomBlock[] = this.customBlocks1;

  culturalEvent = <CulturalEvent>{};
  public prohibitionRules: ProhibitionRule[]
  public verified: boolean = false
  public rulesInConflict : ProhibitionRule[];
  currentDate: string = new Date().toString();
  currentTime: string = new Date().toString();

  public showHalls : ShowHall[];

  constructor(ngxToolboxBuilder: NgxToolboxBuilderService,public culturalActorService: CulturalActorService,public prohibitionRuleService: ProhibitionRuleService, private showHallService: ShowHallService,private datePipe: DatePipe) {
    ngxToolboxBuilder.nodes = [
      new Category('Evenement culturel', '#cf9700', this.customBlocks1, null),
    ];
    this.config.toolbox = ngxToolboxBuilder.build();
    this.config.scrollbars = false;
    this.prohibitionRuleService.getProhibitionRulesFromUrl();
    this.prohibitionRuleService.rules$.subscribe((rules)=>{
      this.prohibitionRules=rules;
    });

    this.showHallService.showHalls$.subscribe((showHalls) => this.showHalls = showHalls);
      this.currentDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');

    interval(10000)
      .pipe(takeWhile(() => true))
      .subscribe(() => {
        let a = new Date().getHours().toString();
        let b = parseInt(a)
        this.currentTime = (b>9) ? '('+a:'(0'+a;
        this.currentTime += ":";
        a = new Date().getMinutes().toString();
        b = parseInt(a)
        this.currentTime += (b>9) ? a+')':'0'+a+')';

        console.log(this.currentDate)
        console.log(this.currentTime)
      });

  }

  public generatorConfig: NgxBlocklyGeneratorConfig = {
    dart: false,
    javascript: true,
    lua: false,
    php: false,
    python: false,
    xml: false
  };

  updateRules() {
    this.prohibitionRuleService.getProhibitionRulesFromUrl();
    this.showHallService.getShowHalls();
    setTimeout(() => this.execute(), 100);
  }


  private execute() {
    this.rulesInConflict = [];
    var code = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
    try {
      eval(code);
      console.log(this.prohibitionRules);

      //Verification de la coherence des attributs renseignés par l'utilisation
      this.checkAttributes();
      const showHallAvailable = this.verifyIfShowHallAvailables();

      this.culturalEvent.fillingPercentageShowHall= (this.culturalEvent.nbrPresonneAttendu/showHallAvailable.capacity)*100;
      this.culturalEvent.lieu = showHallAvailable.name;

      this.prohibitionRules.forEach(rule =>{
        this.verified = false;
        eval(rule.code);
        if (this.verified){
          this.rulesInConflict.push(rule);
        }
      });

      if(this.rulesInConflict.length > 0){
        let conflictsRules = "";
        this.rulesInConflict.forEach((rule) => {
          conflictsRules+=  " - " + rule.text + "\n";
        });

        throw "Your event can't be created because it violates "
        + this.rulesInConflict.length + " rule(s) : \n" + conflictsRules;
      }

      //update show hall
      this.showHallService.updateShowHall(showHallAvailable);
      this.culturalActorService.addCulturalEvent(this.culturalEvent);

      alert('Votre evenement culturel a été créé avec succes');
      Blockly.mainWorkspace.clear();
    } catch (e) {
      alert(e);
    }

    console.log(code);
    return null;
  }

  checkDates(){

    if (this.culturalEvent.dateDebut == "" || this.culturalEvent.dateFin == ""){
      throw "You have to fill in the dates of your event"
    }

    if (this.culturalEvent.dateDebut < this.currentDate){
        throw "The start date of the event must be greater or equal to today's date"
    }

    if (this.culturalEvent.dateDebut>this.culturalEvent.dateFin){
      throw "The end date of the event must be greater or equal to the start date"
    }

  }

  checkTimes(){
    if (this.culturalEvent.heureDebut == "" || this.culturalEvent.heureFin == ""){
      throw "You have to fill in the times of your event"
    }


    if (this.culturalEvent.dateDebut === this.currentDate && this.culturalEvent.dateDebut === this.culturalEvent.dateFin){

        if (this.culturalEvent.heureDebut < this.currentTime){
          throw "The start time of the event must be greater or equal to the current hour"
        }

        if (this.culturalEvent.heureDebut > this.culturalEvent.heureFin){
          throw "The end time of the event must be greater than the start time"
        }

        if (this.culturalEvent.heureDebut === this.culturalEvent.heureFin){
          throw "The end time can't be the same as the start time"
        }
    }

  }

  checkAttributes(){
    if (this.culturalEvent.title == ""){
      throw 'You have to fill in the title of your event'
    }
    this.checkDates();
    this.checkTimes();
  }

  private verifyIfShowHallAvailables() {
    var dateDebut = new Date(Date.parse(this.culturalEvent.dateDebut));
    var dateFin = new Date(Date.parse(this.culturalEvent.dateFin));
    var datesArray = this.getDates(dateDebut,dateFin);
    console.log(datesArray);
    var showHallsAvailables = [];
    this.showHalls.forEach((showHall) => {
      if((showHall.type.includes(this.culturalEvent.typeEvenement) || showHall.type.includes("all"))
        && showHall.capacity >= this.culturalEvent.nbrPresonneAttendu){
        const intersection = showHall.unavailableSlots?.filter(date => datesArray.includes(date));
        console.log(intersection)
        if(!intersection || intersection.length === 0){
          showHallsAvailables.push(showHall);
        }
      }
    });

    if(showHallsAvailables.length === 0){
      throw "No show hall is available for this event. Try to change dates."
    }else{
      if(!showHallsAvailables[0].unavailableSlots){
        showHallsAvailables[0].unavailableSlots = datesArray;
      }else{
        showHallsAvailables[0].unavailableSlots = showHallsAvailables[0].unavailableSlots.concat(datesArray);
      }
    }

    return showHallsAvailables[0];
  }

  private addDays(currentDate, days) {
    var dat = new Date(currentDate.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
  }

  private getDates(startDate : Date, stopDate : Date) {
      var dateArray = [];
      var currentDate = startDate;
      while (currentDate <= stopDate) {
        var currentDateString = currentDate.getFullYear() + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getDate();
        dateArray.push(currentDateString)
        currentDate = this.addDays(currentDate, 1);
      }
      return dateArray;
  }
}
