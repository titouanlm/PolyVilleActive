import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class PeopleTypeBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = PeopleTypeBlock;
  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField("If target people are")
      .appendField(new Blockly.FieldDropdown([["Young","young"], ["Old","old"], ["Adult","adult"], ["Children","children"], ["Everyone","everyone"]]), "targetPeople");
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(315);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
  }

  toXML() {
    return '<block type="targetPeople"></block>';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
    const dropdown_targetpeople = this.block.getFieldValue('targetPeople');
    // TODO: Assemble JavaScript into code variable.
    const code = ' this.prohibitionRule.targetPeople="' + dropdown_targetpeople + '";\n';
    return code;
  }
}




