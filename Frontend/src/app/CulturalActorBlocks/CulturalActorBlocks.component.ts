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
import {PromotionService} from "../../services/promotion.service";
import {CulturalEvent, Promotion} from "../../models/event.model";
import {CulturalEventBlock} from "./CulturalEventBlock"
import {HourBlock} from "./HourBlock"


declare var Blockly: any;


@Component({
  selector: 'app-Mayorblocks',
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

  constructor(ngxToolboxBuilder: NgxToolboxBuilderService, public promotionService : PromotionService) {
    ngxToolboxBuilder.nodes = [
      new Category('Evenement culturel', '#cf9700', this.customBlocks1, null),
    ];
    this.config.toolbox = ngxToolboxBuilder.build();
    this.config.scrollbars = false;
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

    } catch (e) {
      alert(e);
    }
    console.log(code);
  }

}
