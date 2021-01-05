import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class AndBlock extends CustomBlock {

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = AndBlock;
  }

  /**
   * Define a conditional Blockly block
   */

  defineBlock() {
    this.block.appendDummyInput()
      .appendField("  AND  ");
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
  }

  toXML() {
    return '<block type="and"></block>';
  }

  /**
   * This method transform a block into code
   *
   * @param block Blockly's block considered
   * @return a string code of a targetted block
   */

  toJavaScriptCode(block: CustomBlock): string | any[] {
    var code = 'this.prohibitionRule.code += " && ";\n' ;
    code += 'this.prohibitionRule.text += " AND If";\n' ;
    return code;
  }
}




