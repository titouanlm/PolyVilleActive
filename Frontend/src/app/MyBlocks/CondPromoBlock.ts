import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class CondPromoBlock extends CustomBlock {

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = CondPromoBlock;
  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField('Déclencher la promotion quand la condition sur')
      .appendField(new Blockly.FieldDropdown([['la date', 'DATE_COND'], ['le nombre de personnes dans le magasin', 'CUSTUMORS_NB_COND'], ['', '']]), 'PROMO_CONDITION')
      .appendField('est validée.');
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(120);
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }
  toXML() {
    return '<block type="condpromo"></block>';
  }

  toDartCode(block: CustomBlock): string | any[] {
    return 'Not implemented';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
    return 'Not implemented';
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
