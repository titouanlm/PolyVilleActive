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

  constructor(ngxToolboxBuilder: NgxToolboxBuilderService,public culturalActorService: CulturalActorService,public prohibitionRuleService: ProhibitionRuleService,private datePipe: DatePipe) {
    ngxToolboxBuilder.nodes = [
      new Category('Evenement culturel', '#cf9700', this.customBlocks1, null),
    ];
    this.config.toolbox = ngxToolboxBuilder.build();
    this.config.scrollbars = false;
    this.prohibitionRuleService.getProhibitionRulesFromUrl();
    this.prohibitionRuleService.rules$.subscribe((rules)=>{
      this.prohibitionRules=rules;
    });

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
    setTimeout(() => this.execute(), 100);
  }


  private execute() {
    this.rulesInConflict = [];
    var code = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
    try {
      eval(code);
      console.log(this.culturalEvent);
      console.log(this.prohibitionRules);

      //Verification de la coherence des attributs renseignés par l'utilisation
      this.checkAttributes();

      //Calcul de la duree de l'evenement en nombre de jour
      this.culturalEvent.nbDayDuration = this.computeNumberOfDay()

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

      this.culturalActorService.addCulturalEvent(this.culturalEvent)
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

  computeNumberOfDay(): number{
    var nombreJr = 0;
    var parts1,parts2;
    parts1 = this.culturalEvent.dateDebut.split('-');
    let dateDeb= new Date(parts1[0],parts1[1]-1,parts1[2]);
    let dateDebInt=dateDeb.getTime();
    parts2 = this.culturalEvent.dateFin.split('-');
    let dateFin= new Date(parts2[0],parts2[1]-1,parts2[2]);
    let dateFinInt=dateFin.getTime();
    nombreJr = Math.round(((dateFinInt-dateDebInt) / (1000 * 3600 * 24)));

    return nombreJr;
  }
}
