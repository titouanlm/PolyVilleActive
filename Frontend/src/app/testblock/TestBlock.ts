import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class TestBlock extends CustomBlock {

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = TestBlock;
  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField(this.type);
    this.block.setOutput(true, 'Input');
    this.block.setColour(30);
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }

  toXML() {
    return '<block type="test"></block>';
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
