import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class PromoEventBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = PromoEventBlock;
  }

  defineBlock() {

    this.block.appendDummyInput()
      .appendField('Promotion');
    this.block.appendDummyInput()
      .appendField('Titre')
      .appendField(new Blockly.FieldTextInput(''), 'Title_promo');
    this.block.appendDummyInput()
      .appendField('Description')
      .appendField(new Blockly.FieldTextInput(''), 'Description_promo');

    this.block.appendDummyInput()
      .appendField('Start Date')
      .appendField(new Blockly.FieldDate('2020-02-20'), 'Start_Date_promo');
    this.block.appendDummyInput()
      .appendField('End Date')
      .appendField(new Blockly.FieldDate('2020-02-20'), 'End_Date_promo');
    this.block.setPreviousStatement(true,null);
    this.block.setNextStatement(true, null);
    this.block.setColour(315);
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }
  toXML() {
    return '<block type="PromoEvent"></block>';
  }

  toDartCode(block: CustomBlock): string | any[] {
    return 'Not implemented';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
    const title = this.block.getFieldValue('Title_promo');
    var description=this.block.getFieldValue('Description_promo');
    var startDate=this.block.getFieldValue('Start_Date_promo').toString();
    var endDate=this.block.getFieldValue('End_Date_promo').toString();

    return'this.event.promotions=[];\n'+ 'this.promotion.title="' + title + '";\nthis.promotion.description="' + description
      + '";\nthis.promotion.startDate="' + startDate + '";\nthis.promotion.endDate="' + endDate + '";\n'
      +'this.event.promotions.unshift(this.promotion);\n';
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
