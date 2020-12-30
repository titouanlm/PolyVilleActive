import { Component, OnInit } from '@angular/core';
import {
  Category,
  CustomBlock,
  NgxBlocklyConfig,
  NgxBlocklyGeneratorConfig,
  NgxToolboxBuilderService
} from "ngx-blockly";
import {ProhibitionRuleBlock} from "./ProhibitionRuleBlock";
import {AndBlock} from "./AndBlock";
import {CondTypeBlock} from "./CondTypeBlock";
import {PeopleTypeBlock} from "./PeopleTypeBlock";
import {NumberPeopleExpectedBlock} from "./NumberPeopleExpectedBlock";
import {CondHeureFinBlock} from "./CondHeureFinBlock";
import {AlorsBlock} from "./AlorsBlock";
import {ProhibitionRule} from "../../models/prohibitionRule.model";
import {ProhibitionRuleService} from "../../services/prohibitionRule.service";
import {HourBlock} from "../CulturalActorBlocks/HourBlock";
import {TownHallEmployeeService} from "../../services/townHallEmployee.service";
import {CulturalEvent} from "../../models/event.model";
import {OrBlock} from "./OrBlock";



declare var Blockly: any;
export declare var generatedCode: string;

@Component({
  selector: 'app-town-hall-employee-blocks',
  templateUrl: './town-hall-employee-blocks.component.html',
  styleUrls: ['./town-hall-employee-blocks.component.scss']
})
export class TownHallEmployeeBlocksComponent implements OnInit {

  ngOnInit(): void {
  }

  public config: NgxBlocklyConfig = {};
  public prohibitionRule = <ProhibitionRule>{};
  public rulesInConflict : ProhibitionRule[];


  public culturalEventBlocks: CustomBlock[] = [
    new ProhibitionRuleBlock('prohibitionRule' , null , null),
    new AndBlock('and' , null , null),
    new OrBlock('or' , null , null),
    new CondTypeBlock('condtype' , null , null),
    new PeopleTypeBlock('targetPeople' , null , null),
    new NumberPeopleExpectedBlock('nbPeopleExpected' , null , null),
    new CondHeureFinBlock('condheurefin' , null , null),
    new AlorsBlock('alors' , null , null),
    new HourBlock('hourBlock' , null , null)

  ];

  public sellerEventBlocks: CustomBlock[] = [];

  public customBlocks: CustomBlock[] = this.culturalEventBlocks.concat(this.sellerEventBlocks);
  public ruleList: ProhibitionRule[];
  verified: boolean = false;
  culturalEvent = <CulturalEvent>{};

  constructor(ngxToolboxBuilder: NgxToolboxBuilderService, public prohibitionRuleService: ProhibitionRuleService,public townHallEmployeeService:TownHallEmployeeService) {
    ngxToolboxBuilder.nodes = [
      new Category('Cultural Event', '#cf9700', this.culturalEventBlocks, null),
      new Category('Seller Event', '#cf1000', this.sellerEventBlocks, null),
    ];
    this.config.toolbox = ngxToolboxBuilder.build();
    this.config.scrollbars = false;
    this.prohibitionRuleService.getProhibitionRulesFromUrl();
    this.prohibitionRuleService.rules$.subscribe((rules) => this.ruleList = rules);
  }

  public generatorConfig: NgxBlocklyGeneratorConfig = {
    dart: false,
    javascript: true,
    lua: false,
    php: false,
    python: false,
    xml: false
  };

  execute() {
    var code = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);

    try {
      eval(code);
      // Verification de la syntaxe de la règle --> Erreur si fausse
      try {
        eval(this.prohibitionRule.code);
        if(this.testOrAndInSameRule()){
          throw "error";
        }
      }
      catch (e) {
        throw 'Your rule is syntactically incorrect\n' + "" +
        "Reminder : \n" +
        "- You cannot use AND and OR in the same rule.\n" +
        "- The use of AND and OR must be done between 2 conditions."
      }

      // Verification des conflits potentiels avec les autres règles --> Affiche les règles avec lesquels elle est en conflit
      this.rulesInConflict = [];
      this.verifyPotentialConflict();
      // Vérification de potentiel simple modification de règle existante

      if(this.rulesInConflict.length === 0){
         this.prohibitionRuleService.addProhibitionRule(this.prohibitionRule)
          .subscribe(
            ruleCreated => {
              alert("Your new rule has been created !")
              Blockly.mainWorkspace.clear();
            },
            error => {
              throw "Server unavailable. ";
            });

      }else{
        let conflictsRules = "";
        this.rulesInConflict.forEach((rule) => {
          conflictsRules+=  " - " + rule.text + "\n";
        });

        throw "Your rule can't be created because it is in conflict with " + this.rulesInConflict.length + " rule(s) : \n" + conflictsRules;
      }

    } catch (e) {
      alert("Error : "+  e);
    }
    console.log(code);
    this.prohibitionRule = <ProhibitionRule>{};
  }

  deleteRule(rule: ProhibitionRule) {
      this.prohibitionRuleService.deleteRule(rule);
  }

  verifyPotentialConflict(){
    if(this.prohibitionRule.numberMinPeopleExpected || this.prohibitionRule.numberMaxPeopleExpected){
      this.prohibitionRuleService.rules$.subscribe((rules) => {
        if(this.prohibitionRule.type === "all"){
          this.verifyNbExceptedPeople(rules);
        }else{
          const rulesWithSameType = rules.filter(rule => rule.type === this.prohibitionRule.type || rule.type === "all");
          this.verifyNbExceptedPeople(rulesWithSameType);
        }
      });
    }
  }

  verifyNbExceptedPeople(rules :ProhibitionRule[]){
    rules.forEach( (rule) => {
      if(rule.numberMaxPeopleExpected && this.prohibitionRule.numberMinPeopleExpected){
          if(this.prohibitionRule.numberMinPeopleExpected > rule.numberMaxPeopleExpected ){
            this.rulesInConflict.push(rule);
          }
      }
      if(rule.numberMinPeopleExpected && this.prohibitionRule.numberMaxPeopleExpected){
        if( rule.numberMinPeopleExpected > this.prohibitionRule.numberMaxPeopleExpected){
            this.rulesInConflict.push(rule);
        }
      }
    });
  }

  private testOrAndInSameRule() {
    const allBlocks = Blockly.mainWorkspace.getAllBlocks(true);
    let or, and = false;
    allBlocks.forEach((block) =>{
      if(block.type === "or"){
        or = true;
      }
      if(block.type === "and"){
        and = true
      }
    });
    return or && and;
  }
}
