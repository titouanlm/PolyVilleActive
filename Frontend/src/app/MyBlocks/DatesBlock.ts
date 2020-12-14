import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class DatesBlock extends CustomBlock {

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = DatesBlock;
  }

  defineBlock() {

    this.block.appendDummyInput()
      .appendField('Date de debut :')
      .appendField(new Blockly.FieldDate('2020-02-20'), 'BEGIN_DATE');
    this.block.appendDummyInput()
      .appendField('Date de fin :')
      .appendField(new Blockly.FieldDate('2020-02-20'), 'END_DATE');

    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(195);
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }
  toXML() {
    return '<block type="dates"></block>';
  }

  toDartCode(block: CustomBlock): string | any[] {
    return 'Not implemented';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
    var begin_date=this.block.getFieldValue('BEGIN_DATE').toString();
    var end_date=this.block.getFieldValue('END_DATE').toString();
    return 'promo.startdate=' + begin_date + ';\npromo.enddate=' + end_date + ';\n';
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
