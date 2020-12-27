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
      .appendField(new Blockly.FieldDropdown([["Théatre","theatre"], ["Concert","concert"], ["Exposition","exposition"], ["Festival","festival"], ["Danse","danse"], ["All","all"]]), "type");

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
    //Partie création des attributs de la règle
    const codeCreationAttribut = 'this.prohibitionRule.type="' + type + '";\n' + statements_condition;

    //Partie création de la règle en programmation
    const codeCreationRuleConditions = "if(this.event.type === '"+type+"'){ }";


    return codeCreationAttribut;
  }
}

//SI il y a des salles disponibles pour l'évènement cette période la
//NOMBRE DE POMPIER/POLICIER DISPO
//PERIODE
//NOMBRE D'EVENEMENT DU MEME TYPE DANS LA MEME PERIODE
//rules of prohibition
//mandatory rules


