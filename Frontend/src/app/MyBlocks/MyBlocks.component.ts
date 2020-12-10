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
import {PromoBlock} from './PromoBlock';
import {DatesBlock} from './DatesBlock';
import {NotifBlock} from './NotifBlock';
import {CondPromoBlock} from './CondPromoBlock';
import {TitreBlock} from './TitreBlock';


declare var Blockly: any;


@Component({
  selector: 'app-myblocks',
  templateUrl: './MyBlocks.component.html',
  styleUrls: ['./MyBlocks.component.scss']
})
export class MyBlocksComponent {


  public config: NgxBlocklyConfig = {};

  public customBlocks: CustomBlock[] = [
    new PromoBlock('promotion', null, null),
    new TitreBlock( 'titredescription' , null , null),
    new DatesBlock('dates' , null, null),
    new NotifBlock( 'notification' , null , null),
    new CondPromoBlock( 'condpromo' , null , null)
  ];

  constructor(ngxToolboxBuilder: NgxToolboxBuilderService) {
    ngxToolboxBuilder.nodes = [
      new Category('Blocks atomiques', '#F00000', this.customBlocks, null)
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


  onCode(code: string) {
    console.log(code);
  }

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
