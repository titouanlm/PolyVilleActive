import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class NumberPeopleExpectedBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = NumberPeopleExpectedBlock;
  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField("If the number of people expected is not between ")
      .appendField(new Blockly.FieldNumber(0, 0), "min")
      .appendField("  and  ")
      .appendField(new Blockly.FieldNumber(1000000, 1), "max");
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(330);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
  }

  toXML() {
    return '<block type="nbPeopleExpected"></block>';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
    const number_min = this.block.getFieldValue('min');
    const number_max = this.block.getFieldValue('max');
    var code = 'this.prohibitionRule.numberMinPeopleExpected="' + number_min + '";\n' +
      'this.prohibitionRule.numberMaxPeopleExpected="' + number_max + '";\n' +
      'this.prohibitionRule.code +=  \'(this.culturalEvent.nbrPresonneAttendu < ' + number_min + ' || this.culturalEvent.nbrPresonneAttendu > ' + number_max + ')\';\n';
    code += 'this.prohibitionRule.text += \' the expected number of people is less than \"'+ number_min + '\" or greater than \"' + number_max + '\"\';\n';
    return code;
  }
}
