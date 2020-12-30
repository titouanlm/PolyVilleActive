import {BlockMutator, CustomBlock} from 'ngx-blockly';

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
      .appendField(new Blockly.FieldDropdown([["Not specified","all"], ["Théatre","theatre"], ["Concert","concert"], ["Exposition","exposition"], ["Festival","festival"], ["Danse","danse"]]), "type");

    this.block.appendStatementInput("Additional conditions")
      .setCheck(null)
      .appendField("Additional conditions");

    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    Blockly.HSV_SATURATION =0.6;
    Blockly.HSV_VALUE = 0.81;
    this.block.setColour(44);
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }

  toXML() {
    return '<block type="prohibitionRule"></block>';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
    const type = this.block.getFieldValue('type');
    const statements_condition = Blockly.JavaScript.statementToCode(block, 'Additional conditions');
    let code;
    code = 'this.prohibitionRule.type="' + type + '";\n';
    code += 'this.prohibitionRule.targetPeople = [];\n';
    code += 'this.prohibitionRule.nbAnd = 0;\n';
    code += 'this.prohibitionRule.nbOr = 0;\n';
    code += 'this.prohibitionRule.code = "if(";\n';
    code += 'this.prohibitionRule.text = \"It is forbidden to create an event\";\n';
    if (type!="all"){
      code += 'this.prohibitionRule.code += \' this.culturalEvent.typeEvenement === "'+ type +'"\';\n';
      code += 'this.prohibitionRule.text += \' of type \"'+ type +'\"\';\n';
    }else{
      code += 'this.prohibitionRule.code += "true";\n';
    }

    code += 'this.prohibitionRule.code += "){";\n';

    if(statements_condition){
      code += 'this.prohibitionRule.text += \" If\";\n';
      code += 'this.prohibitionRule.code += " if( ";\n';
      code +=  statements_condition;
      code += 'this.prohibitionRule.code += "){this.verified=true}}";\n';
    }else{
      code += 'this.prohibitionRule.code += "this.verified=true}";\n';
    }

    code += 'this.prohibitionRule.text += \".\";\n';
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


