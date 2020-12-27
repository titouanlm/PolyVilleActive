import {BlockMutator, CustomBlock} from 'ngx-blockly';
import {TownHallEmployeeBlocksComponent} from "./town-hall-employee-blocks.component";
import {ProhibitionRuleService} from "../../services/prohibitionRule.service";

declare var Blockly: any;

export class ProhibitionRuleBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = ProhibitionRuleBlock;
  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField('Prohibition Rule');
    this.block.appendDummyInput()
      .appendField("Type of cultural event*")
      .appendField(new Blockly.FieldDropdown([["Théatre","theatre"], ["Concert","concert"], ["Exposition","exposition"], ["Festival","festival"], ["Danse","danse"], ["No specified","all"]]), "type");

    this.block.appendStatementInput("Additional conditions")
      .setCheck(null)
      .appendField("Additional conditions");

    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(315);
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }

  toXML() {
    return '<block type="prohibitionRule"></block>';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
    const type = this.block.getFieldValue('type');
    const statements_condition = Blockly.JavaScript.statementToCode(block, 'Additional conditions');

  /*  if (type!="all"){
      ProhibitionRuleService.generatedCode = ProhibitionRuleService.generatedCode +'if( this.culturalevent.typeEvenement=== \''+type+'\' && '+statements_condition+ '){}'; //\nthis.decision ='+ checkbox_decision+';\n
    }
    else ProhibitionRuleService.generatedCode = ProhibitionRuleService.generatedCode +'if('+statements_condition+ '){}';
*/
    let code;

    if (type!="all"){
      code = 'this.prohibitionRule.type="' + type + '";\n'
        + 'this.prohibitionRule.code = \'if( this.culturalEvent.typeEvenement === "'+type+'"\';\n'
        + 'this.prohibitionRule.code = this.prohibitionRule.code + " && ";\n'
        + statements_condition
        + 'this.prohibitionRule.code = this.prohibitionRule.code + "){this.verified=true}else this.verified=false";\n';
    }
    else{
        code = 'this.prohibitionRule.type="' + type + '";\n'
          +'this.prohibitionRule.code = \'if(\';\n'
          + statements_condition
          + 'this.prohibitionRule.code = this.prohibitionRule.code + "){this.verified=true}else this.verified=false";\n';
    }


    return code;
  }
}
//\''+text_titre+'\';\n'+
//SI il y a des salles disponibles pour l'évènement cette période la
//NOMBRE DE POMPIER/POLICIER DISPO
//PERIODE
//NOMBRE D'EVENEMENT DU MEME TYPE DANS LA MEME PERIODE
//rules of prohibition
//mandatory rules


