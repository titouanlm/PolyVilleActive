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

  constructor(ngxToolboxBuilder: NgxToolboxBuilderService) {
    ngxToolboxBuilder.nodes = [
      new Category('Evenement culturel', '#cf9700', this.customBlocks1, null),
    ];
    this.config.toolbox = ngxToolboxBuilder.build();
    this.config.scrollbars = false;
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

    } catch (e) {
      alert(e);
    }
    console.log(code);
  }

}
