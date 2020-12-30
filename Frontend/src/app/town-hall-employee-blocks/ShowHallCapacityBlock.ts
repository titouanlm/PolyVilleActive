import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class ShowHallCapacityBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = ShowHallCapacityBlock;
  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField("If the number of people expected is ")
      .appendField(new Blockly.FieldDropdown([["lower","<"], ["superior",">"]]), "operand")
      .appendField(" than ")
      .appendField(new Blockly.FieldDropdown([["10","10"], ["20","20"],["30","30"], ["40","40"], ["50","50"], ["60","60"], ["70","70"], ["80","80"],["90","90"], ["100","100"]]), "percentage")
      .appendField(" % of the show hall capacity.")
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(330);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
  }

  toXML() {
    return '<block type="showHallCapacity"></block>';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
    const operand = this.block.getFieldValue('operand');
    const percentage = this.block.getFieldValue('percentage');
    let operandToString = "";
    if(operand === "<"){
      operandToString="lower";
    }else{
      operandToString="superior";
    }
    var code = 'this.prohibitionRule.operandShowHallCondition="' + operand + '"\n';
    code += 'this.prohibitionRule.percentageShowHallCondition=' + percentage + '\n';
    code += 'this.prohibitionRule.code += \'this.culturalEvent.fillingPercentageShowHall ' + operand + percentage + ' \';\n' ;
    code += 'this.prohibitionRule.text += \' the number of people expected is ' + operandToString + ' than ' + percentage + '% of the show hall capacity\';\n';
    return code;
  }
}
