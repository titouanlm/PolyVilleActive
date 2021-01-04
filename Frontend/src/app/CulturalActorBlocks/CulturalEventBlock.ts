import {BlockMutator, CustomBlock} from 'ngx-blockly';
import { DatePipe } from '@angular/common';

declare var Blockly: any;

export class CulturalEventBlock extends CustomBlock {
  currentDate: string = new Date().toString();
  datePipe = new DatePipe('en-US').transform(this.currentDate,'yyyy-MM-dd')

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = CulturalEventBlock;

  }

  defineBlock() {
        this.block.appendDummyInput()
          .appendField("Event title      ")
          .appendField(new Blockly.FieldTextInput(""), "Titre");
        this.block.appendDummyInput()
              .appendField("Description        ")
              .appendField(new Blockly.FieldTextInput(""), "Description");
        this.block.appendDummyInput()
          .appendField("Event type    ")
          .appendField(new Blockly.FieldDropdown([["Théâtre","theatre"], ["Concert","concert"], ["Festival","festival"], ["Exposition","exposition"], ["Danse","danse"]]), "type");
        this.block.appendDummyInput()
          .appendField("expected audience        ")
          .appendField(new Blockly.FieldDropdown([["Young","young"], ["Old","old"], ["Adult","adult"], ["Children","children"], ["Everyone","everyone"]]), "public");
        this.block.appendDummyInput()
              .appendField("Start date   ")
          .appendField(new Blockly.FieldDate(this.datePipe), "DateDebut")
              .appendField("       End date    ")
          .appendField(new Blockly.FieldDate(this.datePipe), "DateFin");
        this.block.appendValueInput("heureDebut")
              .setCheck(null)
              .appendField("Start time");
        this.block.appendValueInput("NAME")
              .setCheck(null)
              .appendField("End time");
        this.block.appendDummyInput()
              .appendField("Number of people expected")
              .appendField(new Blockly.FieldNumber(1, 1), "nbpersonne");
        this.block.setColour(165);
        this.block.setTooltip("");
        this.block.setHelpUrl("");
  }

  toXML() {
    return '<block type="culturalEvent"></block>';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
      var text_titre = this.block.getFieldValue('Titre');
      var text_description = this.block.getFieldValue('Description');
      var text_datedebut = this.block.getFieldValue('DateDebut');
      var text_datefin = this.block.getFieldValue('DateFin');
      var value_heuredebut = Blockly.JavaScript.valueToCode(block, 'heureDebut', Blockly.JavaScript.ORDER_ATOMIC);
      var value_heurefin = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
      var number_nbpersonne = this.block.getFieldValue('nbpersonne');
      var dropdown_type = this.block.getFieldValue('type');
      var dropdown_public = this.block.getFieldValue('public');


      var code ='this.culturalEvent.title=\''+text_titre+'\';\n'+
                'this.culturalEvent.description=\''+text_description+'\';\n'+
                'this.culturalEvent.dateDebut=\''+text_datedebut+'\';\n'+
                'this.culturalEvent.dateFin=\''+text_datefin+'\';\n'+
                'this.culturalEvent.heureDebut ='+ value_heuredebut+';\n'+
                'this.culturalEvent.heureFin ='+ value_heurefin+';\n'+
                'this.culturalEvent.nbrPresonneAttendu='+number_nbpersonne+';\n'+
                'this.culturalEvent.typeEvenement=\''+dropdown_type+'\';\n'+
                'this.culturalEvent.typePublic=\''+dropdown_public+'\';\n';
      return code;
  }

}
