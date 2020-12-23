import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class MinPeople extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = MinPeople;


  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField("If number of expected people under ")
      .appendField(new Blockly.FieldNumber(999999999, 1), "max");
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(315);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
  }

  toXML() {
    return '<block type="minPeople"></block>';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
    var number_min = this.block.getFieldValue('min');
    // TODO: Assemble JavaScript into code variable.
    var code = 'this.culturalevent.nbrPresonneAttendu<=='+number_min+'\n';
    return code;
  }
}
