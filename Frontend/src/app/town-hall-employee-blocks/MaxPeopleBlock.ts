import {BlockMutator, CustomBlock} from 'ngx-blockly';
import {ProhibitionRuleService} from "../../services/prohibitionRule.service";

declare var Blockly: any;

export class MaxPeopleBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = MaxPeopleBlock;


  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField("If number of expected people is over")
      .appendField(new Blockly.FieldNumber(999999999, 1), "max");
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(315);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
  }

  toXML() {
    return '<block type="maxPeople"></block>';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
    var number_max = this.block.getFieldValue('max');
   // ProhibitionRuleService.generatedCode = ProhibitionRuleService.generatedCode + 'this.culturalevent.nbrPresonneAttendu > "'+number_max+'";\n';
    var code = 'this.prohibitionRule.numberMaxPeopleExpected="'+number_max+'";\n'
      + 'this.prohibitionRule.code = this.prohibitionRule.code + \'this.culturalEvent.nbrPresonneAttendu > '+number_max + '\';\n' ;

    return code;
  }
}




