import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class PromoBlock extends CustomBlock {

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = PromoBlock;
  }

  /**
   * Define conditionals block
   */

  defineBlock() {
    this.block.appendStatementInput('PROMOTION')
      .setCheck(null)
      .appendField(this.type);
    this.block.setNextStatement(true,null);
    this.block.setPreviousStatement(true, null);
    this.block.setColour(330);
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }

  toXML() {
    return '<block type="promotion"></block>';
  }

  toDartCode(block: CustomBlock): string | any[] {
    return 'Not implemented';
  }

  /**
   * This method transform a block into code
   *
   * @param block Blockly's block considered
   * @return a string code of a targetted block
   */

  toJavaScriptCode(block: CustomBlock): string | any[] {
    return Blockly.JavaScript.statementToCode(block, 'PROMOTION');
  }

  toLuaCode(block: CustomBlock): string | any[] {
    return 'Not implemented';
  }

  toPHPCode(block: CustomBlock): string | any[] {
    return 'Not implemented';
  }

  toPythonCode(block: CustomBlock): string | any[] {
    return 'Not implemented';
  }
}
