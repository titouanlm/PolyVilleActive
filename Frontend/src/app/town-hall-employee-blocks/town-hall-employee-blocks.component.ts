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
import {TargetPeopleBlock} from "./TargetPeopleBlock";
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
    new TargetPeopleBlock('targetPeople' , null , null),
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
      /* Verification de la syntaxe de la règle */
      try {
        eval(this.prohibitionRule.code);
      }
      catch (e) {
        throw 'Your rule is syntactically incorrect\n' + "" +
        "Reminder : \n" +
        "- The use of AND and OR must be done between 2 conditions.\n";
      }

      /* TEST DE POTENTIEL ERREUR */
      if(this.testOrAndInSameRule()){
        throw "You cannot use AND and OR in the same rule." ;
      }else if(this.testSameTypeOfConditionWithAnd()){
        throw "You cannot use AND in a rule where there is more than once the same type of condition. (USE OR)";
      }else if(this.testCondNbExpectedPeopleMoreThan1Time()){
        throw "You cannot use the expected number of people condition more then 1 time in the same rule.";
      }else if(this.inconsistentCondNbExpectedPeopleMore()){
        throw "The minimum number of people expected cannot be greater than the maximum number.";
      }else if(this.sameValueForTargetPeople()){
        throw "You have defined the same value several times for target people.";
      }else if(this.testRuleAlreadyExists()){
        throw "This rule already exists.";
      }

      // Vérification de potentiel simple modification de règle existante


      // Verification des conflits potentiels avec les autres règles --> Affiche les règles avec lesquels elle est en conflit
      this.rulesInConflict = [];
      this.verifyPotentialConflict();

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
        if(this.prohibitionRule.type === "all"){
          this.verifyNbExceptedPeople(this.ruleList);
        }else{
          const rulesWithSameType = this.ruleList.filter(rule => rule.type === this.prohibitionRule.type || rule.type === "all");
          this.verifyNbExceptedPeople(rulesWithSameType);
        }
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
    const andBlocks = Blockly.mainWorkspace.getBlocksByType("and");
    const orBlocks  = Blockly.mainWorkspace.getBlocksByType("or");
    return andBlocks.length > 0 && orBlocks.length > 0;
  }

  private testSameTypeOfConditionWithAnd() {
    const andBlocks = Blockly.mainWorkspace.getBlocksByType("and");
    const targetBlocks = Blockly.mainWorkspace.getBlocksByType("targetPeople");
    return andBlocks.length > 0 && (targetBlocks.length >= 2) ;
  }

  private testCondNbExpectedPeopleMoreThan1Time() {
    const nbEPBlocks = Blockly.mainWorkspace.getBlocksByType("nbPeopleExpected");
    return nbEPBlocks.length > 1;
  }

  private inconsistentCondNbExpectedPeopleMore() {
    return this.prohibitionRule.numberMinPeopleExpected > this.prohibitionRule.numberMaxPeopleExpected;
  }

  private sameValueForTargetPeople() {
    if(this.prohibitionRule.targetPeople.length < 2){
      return false;
    }else{
      const arrayWithoutDoublons = this.prohibitionRule.targetPeople.filter((item, index) =>{
          return this.prohibitionRule.targetPeople.indexOf(item) === index;
      });
      return arrayWithoutDoublons.length < this.prohibitionRule.targetPeople.length;
    }
  }

  private testRuleAlreadyExists() {
    var ruleAlreadyExists = false;
    this.ruleList.forEach((rule) => {
      if(((!this.prohibitionRule.numberMaxPeopleExpected && !rule.numberMaxPeopleExpected)
        || (this.prohibitionRule.numberMaxPeopleExpected && rule.numberMaxPeopleExpected))&&
        (this.prohibitionRule.type === rule.type || rule.type === "all") &&
        this.prohibitionRule.nbOr === rule.nbOr &&
        this.prohibitionRule.nbAnd === rule.nbAnd
      ){
        if(this.prohibitionRule.targetPeople && rule.targetPeople){
          if(this.prohibitionRule.targetPeople.sort().join(',')=== rule.targetPeople.sort().join(',')){
            ruleAlreadyExists =true;
            return;
          }
        }else if(!this.prohibitionRule.targetPeople && !rule.targetPeople){
          ruleAlreadyExists =true;
          return;
        }
      }
    });
    return ruleAlreadyExists;
  }
}
