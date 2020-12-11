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
    var title=this.block.getFieldValue('TITLE');
    var description=this.block.getFieldValue('DESCRIPTION');
    var code ='var promo=new Promotion();\npromo.title='+title+';\npromo.description='+description+';\n';
    return code;
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
