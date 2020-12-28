import {BlockMutator, CustomBlock} from 'ngx-blockly';
import {ProhibitionRuleService} from "../../services/prohibitionRule.service";

declare var Blockly: any;

export class CondTypeBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator,...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = CondTypeBlock;


  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField("If event type   = ")
      .appendField(new Blockly.FieldDropdown([["Théatre","theatre"], ["Concert","concert"], ["Exposition","exposition"], ["Festival","festival"], ["Danse","danse"], ["All","all"]]), "type");
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
  }

  toXML() {
    return '<block type="condtype"></block>';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
    var dropdown_type = this.block.getFieldValue('type');
    // TODO: Assemble JavaScript into code variable.
   // ProhibitionRuleService.generatedCode = ProhibitionRuleService.generatedCode + 'this.culturalevent.typeEvenement=== \''+dropdown_type+'\'\n';
    var code = 'this.prohibitionRule.code = this.prohibitionRule.code + \'this.culturalEvent.typeEvenement === "'+dropdown_type + '"\';\n' ;

    //'this.culturalevent.typeEvenement=== \''+dropdown_type+'\'\n';
    return code;
  }
}




