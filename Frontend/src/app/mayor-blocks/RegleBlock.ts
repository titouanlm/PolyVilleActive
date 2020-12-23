
import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class RegleBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = RegleBlock;


  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField('Rule of prohibition');
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
    return '<block type="regle"></block>';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
    var statements_condition = Blockly.JavaScript.statementToCode(block, 'regle');
  // TODO: Assemble JavaScript into code variable.
    var code = 'if('+statements_condition;
    return code;
  }
}

//SI il y a des salles disponibles pour l'évènement cette période la
//NOMBRE DE POMPIER/POLICIER DISPO
//PERIODE
//NOMBRE D'EVENEMENT DU MEME TYPE DANS LA MEME PERIODE
//rules of prohibition
//mandatory rules


