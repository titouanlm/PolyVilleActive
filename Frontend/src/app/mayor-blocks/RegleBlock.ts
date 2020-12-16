
import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class RegleBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = RegleBlock;


  }

  defineBlock() {
    this.block.appendStatementInput("regle")
      .setCheck(null)
      .appendField("Règle");
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
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




