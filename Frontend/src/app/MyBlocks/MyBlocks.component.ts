import { Component } from '@angular/core';
import {
  Category,
  CustomBlock,
  NgxBlocklyConfig,
  NgxBlocklyGeneratorConfig,
  NgxToolboxBuilderService,
} from 'ngx-blockly';
import {PromoBlock} from './PromoBlock';
import {DatesBlock} from './DatesBlock';
import {NotifBlock} from './NotifBlock';
import {TitreBlock} from './TitreBlock';
import {EventBlock} from "./EventBlock";
import {PromoEventBlock} from "./PromoEventBlock";
import {NotifEventBlock} from "./NotifEventBlock";
import {TextNotifEventBlock} from "./TextNotifBlock";
import {NombreBlock} from "./NombreBlock";
import {CondNbClientBlock} from "./CondNbClientBlock";
import {CondTempsBlock} from "./CondTempsBlock";
import {NotifTempsBlock} from "./NotifTempsBlock";
import {NotifFrequenceBlock} from "./NotifFrequence";
import {PromotionService} from "../../services/promotion.service";
import {Promotion} from "../../models/event.model";
import {Event} from "../../models/event.model";
import {EventService} from "../../services/event.service";


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
  ];
  public customBlocks2: CustomBlock[] = [
    new EventBlock( 'Event' , null , null),
    new PromoEventBlock('PromoEvent' , null , null),
    new NotifEventBlock('NotifEvent' , null , null)
  ];

  public customBlocks3: CustomBlock[] = [
    new NotifBlock( 'notification' , null , null),
    new TextNotifEventBlock('TextNotif' , null , null),
    new NotifTempsBlock('NotifTemps' , null , null),
    new NotifFrequenceBlock('NotifFrequence' , null , null),
    new NombreBlock('Nb' , null , null)
  ];

  public customBlocks4: CustomBlock[] = [
    new CondNbClientBlock( 'NbClient' , null , null),
    new CondTempsBlock('Temps' , null , null),
    new NombreBlock('Nb' , null , null)

  ];


  public customBlocks: CustomBlock[] = this.customBlocks1.concat(this.customBlocks2.concat(this.customBlocks3.concat(this.customBlocks4)));

  public promotion = <Promotion>{};
  public event=<Event>{};

  constructor(ngxToolboxBuilder: NgxToolboxBuilderService, public promotionService : PromotionService,public eventService: EventService) {
    ngxToolboxBuilder.nodes = [
      new Category('Promotion', '#0f4f35', this.customBlocks1, null),
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

  /**
   * This method executes Blockly block string code
   */

  execute() {
    var code = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
    try {
      eval(code);

      //CREATION D'UNE PROMO
        if(this.promotion!=null){
        this.promotionService.addPromotion(this.promotion)
          .subscribe(
            promoCreated => {
                  alert("Votre nouvelle promotion : "+ promoCreated.title + " a été créé !")
            },
            error => {
              alert("Erreur : " + error);
            });}

      } catch (e) {
        alert(e);
      }
    console.log("Hello");
      console.log(code);
    }
}
