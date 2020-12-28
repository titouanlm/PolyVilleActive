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
import {CulturalActor} from "../../models/culturalActor.model";
import {CulturalActorService} from "../../services/culturalActor.service";
import {ProhibitionRuleService} from "../../services/prohibitionRule.service";
import {ProhibitionRule} from "../../models/prohibitionRule.model";


declare var Blockly: any;


@Component({
  selector: 'app-CulturalActorBlocks',
  templateUrl: './CulturalActorBlocks.component.html',
  styleUrls: ['./CulturalActorBlocks.component.scss']
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

  constructor(ngxToolboxBuilder: NgxToolboxBuilderService,public culturalActorService: CulturalActorService,public prohibitionRuleService: ProhibitionRuleService) {
    ngxToolboxBuilder.nodes = [
      new Category('Evenement culturel', '#cf9700', this.customBlocks1, null),
    ];
    this.config.toolbox = ngxToolboxBuilder.build();
    this.config.scrollbars = false;
    prohibitionRuleService.rules$.subscribe(rules=>{
      this.prohibitionRules=rules;
    })
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
      console.log(this.culturalEvent);
      console.log(this.prohibitionRules);

      this.prohibitionRules.forEach(rule =>{
        eval(rule.code);
        if (this.verified===true){
          throw 'Votre évènement ne peut etre créé, il ne respecte pas au moins une des regles de la mairie';
        }
      });

      this.culturalActorService.addCulturalEvent(this.culturalEvent)
      alert('Votre evenement culturel a été créé avec succes');
    } catch (e) {
      alert(e);
    }
    console.log(code);
    Blockly.mainWorkspace.clear();
  }
}
