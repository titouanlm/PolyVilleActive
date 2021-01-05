import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class TitreBlock extends CustomBlock {

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = TitreBlock;
  }

  /**
   * Define conditionals block
   */

  defineBlock() {

    this.block.appendDummyInput()
      .appendField('Titre')
      .appendField(new Blockly.FieldTextInput(''), 'TITLE');
    this.block.appendDummyInput()
      .appendField('Description')
      .appendField(new Blockly.FieldTextInput(''), 'DESCRIPTION');
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(180);
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }

  toXML() {
    return '<block type="titredescription"></block>';
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
   var title=this.block.getFieldValue('TITLE');
   var description=this.block.getFieldValue('DESCRIPTION');
   var code ='this.promotion.title="'+title+'";\nthis.promotion.description="'+description+'";\n';
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
