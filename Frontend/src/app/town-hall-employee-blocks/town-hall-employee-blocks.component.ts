import { Component, OnInit } from '@angular/core';
import {
  Category,
  CustomBlock,
  NgxBlocklyConfig,
  NgxBlocklyGeneratorConfig,
  NgxToolboxBuilderService
} from "ngx-blockly";
import {ProhibitionRuleBlock} from "./ProhibitionRuleBlock";
import {EtBlock} from "./EtBlock";
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
    new EtBlock('and' , null , null),
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
      }
      catch (e) {
        throw 'Erreur : Verifiez si tous les "And" sont renseignés'
      }

      // Verification des conflits potentiels avec les autres règles --> Affiche les règles avec lesquels elle est en conflit
      this.rulesInConflict = [];
      this.verifyPotentialConflict();
      // Vérification de potentiel simple modification de règle existante

      if(this.rulesInConflict.length === 0){
         this.defineRuleSentence(); // Traduction de la règle en texte
         this.prohibitionRuleService.addProhibitionRule(this.prohibitionRule)
          .subscribe(
            ruleCreated => {
              alert("Votre nouvelle règle a été créé !")
              Blockly.mainWorkspace.clear();
            },
            error => {
              alert("Erreur : " + error);
            });

      }else{
        alert("Your rule can't be created because there are conflicts with " + this.rulesInConflict.length + " rules.");
        console.log(this.rulesInConflict)
      }

    } catch (e) {
      alert(e);
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

  private defineRuleSentence() {
    var textRule = "";
    if(this.prohibitionRule.type === "all"){
      textRule+="It is forbidden to create an event";
    }else{
      textRule+='It is forbidden to create an event of type "' + this.prohibitionRule.type + '"';
    }

    var counter = 0;
    for(const attribut in this.prohibitionRule){
      if(attribut != "code" && attribut != "type" && attribut != "numberMaxPeopleExpected"){
        if(counter > 0){
          textRule+= " AND IF ";
        }else{
          textRule+= " IF "
        }

        if(attribut === "targetPeople"){
          textRule+= ' the target audience is "' + this.prohibitionRule.targetPeople + '"';
        }

        if(attribut === "numberMinPeopleExpected"){
          textRule+= " the expected number of people is less than " + this.prohibitionRule.numberMinPeopleExpected + " or greater than " + this.prohibitionRule.numberMaxPeopleExpected ;
        }
        counter++;
      }
    }
    this.prohibitionRule.text = textRule + ".";
  }

}
