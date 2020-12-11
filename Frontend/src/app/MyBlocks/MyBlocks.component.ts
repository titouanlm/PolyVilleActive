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
import {EventBlock} from "./EventBlock";
import {PromoEventBlock} from "./PromoEventBlock";
import {NotifEventBlock} from "./NotifEventBlock";
import {TextNotifEventBlock} from "./TextNotifBlock";
import {NombreBlock} from "./NombreBlock";
import {CondNbClientBlock} from "./CondNbClientBlock";
import {CondTempsBlock} from "./CondTempsBlock";


declare var Blockly: any;


@Component({
  selector: 'app-myblocks',
  templateUrl: './MyBlocks.component.html',
  styleUrls: ['./MyBlocks.component.scss']
})
export class MyBlocksComponent {


  public config: NgxBlocklyConfig = {};

  public customBlocks1: CustomBlock[] = [
    new PromoBlock('promotion', null, null),
    new TitreBlock( 'titredescription' , null , null),
    new DatesBlock('dates' , null, null),
    new CondPromoBlock( 'condpromo' , null , null)
  ];
  public customBlocks2: CustomBlock[] = [
    new EventBlock( 'Event' , null , null),
    new PromoEventBlock('PromoEvent' , null , null),
    new NotifEventBlock('NotifEvent' , null , null)
  ];

  public customBlocks3: CustomBlock[] = [
    new NotifBlock( 'notification' , null , null),
    new TextNotifEventBlock('TextNotif' , null , null)
  ];

  public customBlocks4: CustomBlock[] = [
    new CondNbClientBlock( 'NbClient' , null , null),
    new CondTempsBlock('Temps' , null , null),
    new NombreBlock('Nb' , null , null)

  ];


  public customBlocks: CustomBlock[] = this.customBlocks1.concat(this.customBlocks2.concat(this.customBlocks3.concat(this.customBlocks4)));


  constructor(ngxToolboxBuilder: NgxToolboxBuilderService) {
    ngxToolboxBuilder.nodes = [
      new Category('Evenement', '#cf9700', this.customBlocks2, null),
      new Category('Promotion', '#0f4f35', this.customBlocks1, null),
      new Category('Notification' , '#9c1309', this.customBlocks3, null),
      new Category('Condition de Promotion' ,'#700520', this.customBlocks4 , null)
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
