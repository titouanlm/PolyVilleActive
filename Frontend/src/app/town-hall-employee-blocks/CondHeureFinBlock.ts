
import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class CondHeureFinBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = CondHeureFinBlock;


  }

  defineBlock() {
    this.block.appendValueInput("condHeureFin")
      .setCheck(null)
      .appendField("Si heure de fin supérieur à");
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
  }

  toXML() {
    return '<block type="condheurefin"></block>';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
    var value_condheurefin = Blockly.JavaScript.valueToCode(block, 'condHeureFin', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'this.culturalevent.heureFin > '+value_condheurefin;
    return code;
  }
}




