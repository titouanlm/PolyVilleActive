import {BlockMutator, CustomBlock} from "ngx-blockly";

declare var Blockly: any;

export class DurationBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = DurationBlock;
  }

  /**
   * Define a conditional Blockly block
   */

  defineBlock() {
    this.block.appendDummyInput()
      .appendField("If the duration of the event is not from ")
      .appendField(new Blockly.FieldNumber(1, 1), "min")
      .appendField("  to  ")
      .appendField(new Blockly.FieldNumber(10, 1), "max")
      .appendField("  days.  ")
    ;
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(330);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
  }

  toXML() {
    return '<block type="eventDuration"></block>';
  }

  /**
   * This method transform a block into code
   *
   * @param block Blockly's block considered
   * @return a string code of a targetted block
   */

  toJavaScriptCode(block: CustomBlock): string | any[] {
    const dayMin = this.block.getFieldValue('min');
    const dayMax = this.block.getFieldValue('max');
    var code = 'this.prohibitionRule.numberMinEventDuration="' + dayMin + '";\n' +
      'this.prohibitionRule.numberMaxEventDuration="' + dayMax + '";\n' +
      'this.prohibitionRule.code +=  \'(this.culturalEvent.nbDayDuration <= ' + dayMin + ' || this.culturalEvent.nbDayDuration >= ' + dayMax + ')\';\n';
    code += 'this.prohibitionRule.text += \' the duration of the event is less than '+ dayMin + ' days or more than ' + dayMax + ' days\';\n';
    return code;
  }
}
