import {BlockMutator, CustomBlock} from 'ngx-blockly';
import {ProhibitionRuleService} from "../../services/prohibitionRule.service";

declare var Blockly: any;

export class CondHeureFinBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = CondHeureFinBlock;
  }

  defineBlock() {
    this.block.appendValueInput("condHeureFin")
      .setCheck(null)
      .appendField("If end time greater than");
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(330);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
  }

  toXML() {
    return '<block type="condheurefin"></block>';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
    var value_condheurefin = Blockly.JavaScript.valueToCode(block, 'condHeureFin', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'this.prohibitionRule.code = this.prohibitionRule.code + \'this.culturalEvent.heureFin > "'+value_condheurefin + '"\';\n' ;
// 'this.culturalevent.heureFin > \''+value_condheurefin+'\'';
    return code;
  }
}




