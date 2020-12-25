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
import {MaxPeopleBlock} from "./MaxPeopleBlock";
import {MinPeopleBlock} from "./MinPeopleBlock";
import {CondHeureFinBlock} from "./CondHeureFinBlock";
import {AlorsBlock} from "./AlorsBlock";
import {ProhibitionRule} from "../../models/prohibitionRule.model";
import {ProhibitionRuleService} from "../../services/prohibitionRule.service";
import {Shop} from "../../models/shop.model";
import {ShopService} from "../../services/shop.service";


declare var Blockly: any;

@Component({
  selector: 'app-mayor-blocks',
  templateUrl: './town-hall-employee-blocks.component.html',
  styleUrls: ['./town-hall-employee-blocks.component.scss']
})
export class TownHallEmployeeBlocksComponent implements OnInit {

  ngOnInit(): void {
  }

  public config: NgxBlocklyConfig = {};
  public prohibitionRule = <ProhibitionRule>{};

  public culturalEventBlocks: CustomBlock[] = [
    new ProhibitionRuleBlock('prohibitionRule' , null , null),
    new EtBlock('et' , null , null),
    new CondTypeBlock('condtype' , null , null),
    new PeopleTypeBlock('targetPeople' , null , null),
    new MaxPeopleBlock('maxPeople' , null , null),
    new MinPeopleBlock('minPeople' , null , null),
    new CondHeureFinBlock('condheurefin' , null , null),
    new AlorsBlock('alors' , null , null),
  ];

  public sellerEventBlocks: CustomBlock[] = [
  ];

  public customBlocks: CustomBlock[] = this.culturalEventBlocks.concat(this.sellerEventBlocks);
  public ruleList: ProhibitionRule[];

  constructor(ngxToolboxBuilder: NgxToolboxBuilderService, public prohibitionRuleService: ProhibitionRuleService) {
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
    dart: true,
    javascript: true,
    lua: true,
    php: true,
    python: true,
    xml: true
  };

  execute() {
    var code = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
    try {
      eval(code);

      this.prohibitionRuleService.addProhibitionRule(this.prohibitionRule)
        .subscribe(
          ruleCreated => {
            alert("Votre nouvelle règle a été créé !")
          },
          error => {
            alert("Erreur : " + error);
          });

    } catch (e) {
      alert(e);
    }
    console.log(code);
    Blockly.mainWorkspace.clear();
    this.prohibitionRule = <ProhibitionRule>{};
  }

  deleteRule(rule: ProhibitionRule) {
      this.prohibitionRuleService.deleteRule(rule);
  }
}