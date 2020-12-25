import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class EtBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = EtBlock;


  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField("  Et  ");
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(350);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
  }

  toXML() {
    return '<block type="et"></block>';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
    // TODO: Assemble JavaScript into code variable.
    var code = ' && ';
    return code;
  }
}




