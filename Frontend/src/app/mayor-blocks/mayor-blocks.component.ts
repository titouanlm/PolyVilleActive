import { Component, OnInit } from '@angular/core';
import {CulturalEvent} from "../../models/event.model";
import {
  Category,
  CustomBlock,
  NgxBlocklyConfig,
  NgxBlocklyGeneratorConfig,
  NgxToolboxBuilderService
} from "ngx-blockly";
import {PromotionService} from "../../services/promotion.service";
import {RegleBlock} from "./RegleBlock";
import {EtBlock} from "./EtBlock";
import {CondTypeBlock} from "./CondTypeBlock";
import {CondPublicBlock} from "./CondPublicBlock";
import {CondNbPersonneBlock} from "./CondNbPersonneBlock";
import {CondHeureFinBlock} from "./CondHeureFinBlock";
import {AlorsBlock} from "./AlorsBlock";
import * as Blockly from "ngx-blockly/scripts/blockly/typings/blockly";

@Component({
  selector: 'app-mayor-blocks',
  templateUrl: './mayor-blocks.component.html',
  styleUrls: ['./mayor-blocks.component.scss']
})
export class MayorBlocksComponent implements OnInit {

  culturalevent = <CulturalEvent>{};

  ngOnInit(): void {
  }

  public config: NgxBlocklyConfig = {};

  public customBlocks1: CustomBlock[] = [
    new RegleBlock('regle' , null , null),
    new EtBlock('et' , null , null),
    new CondTypeBlock('condtype' , null , null),
    new CondPublicBlock('condpublic' , null , null),
    new CondNbPersonneBlock('condnbpersonne' , null , null),
    new CondNbPersonneBlock('condnbpersonne' , null , null),
    new CondHeureFinBlock('condheurefin' , null , null),
    new AlorsBlock('alors' , null , null),
  ];


  public customBlocks: CustomBlock[] = this.customBlocks1;

  culturalEvent = <CulturalEvent>{};

  constructor(ngxToolboxBuilder: NgxToolboxBuilderService, public promotionService : PromotionService) {
    ngxToolboxBuilder.nodes = [
      new Category('Conditions', '#cf9700', this.customBlocks1, null),
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
    var code// = Blockly.Javascript.workspaceToCode(Blockly.mainWorkspace);
    try {
      eval(code);

    } catch (e) {
      alert(e);
    }
    console.log(code);
  }

}
