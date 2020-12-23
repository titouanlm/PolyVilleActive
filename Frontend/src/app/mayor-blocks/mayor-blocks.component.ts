import { Component, OnInit } from '@angular/core';
import {CulturalEvent} from "../../models/event.model";
import {
  Category,
  CustomBlock,
  NgxBlocklyConfig,
  NgxBlocklyGeneratorConfig,
  NgxToolboxBuilderService
} from "ngx-blockly";
import {RegleBlock} from "./RegleBlock";
import {EtBlock} from "./EtBlock";
import {CondTypeBlock} from "./CondTypeBlock";
import {CondPublicBlock} from "./CondPublicBlock";
import {MaxPeople} from "./MaxPeople";
import {CondHeureFinBlock} from "./CondHeureFinBlock";
import {AlorsBlock} from "./AlorsBlock";


declare var Blockly: any;

@Component({
  selector: 'app-mayor-blocks',
  templateUrl: './mayor-blocks.component.html',
  styleUrls: ['./mayor-blocks.component.scss']
})
export class MayorBlocksComponent implements OnInit {

  culturalevent = <CulturalEvent>{};
  decision: boolean

  ngOnInit(): void {
  }

  public config: NgxBlocklyConfig = {};

  public customBlocks1: CustomBlock[] = [
    new RegleBlock('regle' , null , null),
    new EtBlock('et' , null , null),
    new CondTypeBlock('condtype' , null , null),
    new CondPublicBlock('condpublic' , null , null),
    new MaxPeople('maxPeople' , null , null),
    new MaxPeople('minPeople' , null , null),
    new CondHeureFinBlock('condheurefin' , null , null),
    new AlorsBlock('alors' , null , null),
  ];

  public customBlocks: CustomBlock[] = this.customBlocks1;

  constructor(ngxToolboxBuilder: NgxToolboxBuilderService) {
    ngxToolboxBuilder.nodes = [
      new Category('Cultural Event', '#cf9700', this.customBlocks1, null),
      new Category('Seller Event', '#cf1000', this.customBlocks1, null),
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
