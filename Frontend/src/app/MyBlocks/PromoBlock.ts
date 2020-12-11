import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class PromoBlock extends CustomBlock {

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = PromoBlock;
  }

  defineBlock() {
    this.block.appendStatementInput('PROMOTION')
      .setCheck(null)
      .appendField(this.type);
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

  toJavaScriptCode(block: CustomBlock): string | any[] {
    var statements_promotion = Blockly.JavaScript.statementToCode(block, 'PROMOTION');
    var code='create promo\n';
    return statements_promotion;
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
