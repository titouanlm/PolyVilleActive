import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class AlorsBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = AlorsBlock;


  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField("Alors    ")
      .appendField(new Blockly.FieldCheckbox("TRUE"), "NAME");
    this.block.setPreviousStatement(true, null);
    this.block.setColour(130);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
  }

  toXML() {
    return '<block type="alors"></block>';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
    var checkbox_decision = this.block.getFieldValue('NAME') == 'TRUE';
    // TODO: Assemble JavaScript into code variable.
    var code = '){\nthis.decision ='+ checkbox_decision+';\n}';
    return code;
  }
}




