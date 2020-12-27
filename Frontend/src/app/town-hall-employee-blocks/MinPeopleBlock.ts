import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class MinPeopleBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = MinPeopleBlock;
  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField("If number of expected people is under")
      .appendField(new Blockly.FieldNumber(0, 1), "min");
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
    //ProhibitionRuleService.generatedCode = ProhibitionRuleService.generatedCode + 'this.culturalevent.nbrPresonneAttendu < "'+number_min+'";\n';
    var code = 'this.prohibitionRule.numberMinPeopleExpected="'+number_min+'";\n'
      + 'this.prohibitionRule.code = this.prohibitionRule.code + \'this.culturalEvent.nbrPresonneAttendu < '+number_min + '\';\n' ;

    return code;
  }
}
