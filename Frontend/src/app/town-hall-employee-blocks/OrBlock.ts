import {BlockMutator, CustomBlock} from "ngx-blockly";

export class OrBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = OrBlock;

  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField("  OR  ");
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(350);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
  }

  toXML() {
    return '<block type="or"></block>';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
    // ProhibitionRuleService.generatedCode = ProhibitionRuleService.generatedCode + ' && ';
    var code = 'this.prohibitionRule.code += \' || \';\n' ;
    code += 'this.prohibitionRule.nbOr += 1;\n';
    code += 'this.prohibitionRule.text += " OR If";\n' ;
    return code;
  }
}
