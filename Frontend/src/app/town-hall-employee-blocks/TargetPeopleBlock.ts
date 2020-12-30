import {BlockMutator, CustomBlock} from 'ngx-blockly';
import {ProhibitionRuleService} from "../../services/prohibitionRule.service";

declare var Blockly: any;

export class TargetPeopleBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = TargetPeopleBlock;
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
    var code = ' this.prohibitionRule.targetPeople.push(\'' + dropdown_targetpeople + '\');\n'
              + 'this.prohibitionRule.code += \'this.culturalEvent.typePublic === "'+dropdown_targetpeople + '"\';\n' ;
    code += 'this.prohibitionRule.text += \' the target audience is \"' + dropdown_targetpeople + '\"\';\n';
    return code;
  }
}




