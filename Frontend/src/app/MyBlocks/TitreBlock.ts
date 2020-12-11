import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class TitreBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = TitreBlock;


  }

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

  toJavaScriptCode(block: CustomBlock): string | any[] {
   var title=this.block.getFieldValue('TITLE');
   var description=this.block.getFieldValue('DESCRIPTION');
    return 'All good';
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
