import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class CondTypeBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = CondTypeBlock;


  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField("Si type d'évènement   = ")
      .appendField(new Blockly.FieldDropdown([["Théatre","theatre"], ["Concert","concert"], ["Exposition","exposition"], ["Festival","festival"], ["Danse","danse"]]), "type");
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
    var code = 'this.culturalevent.typeEvenement===;'+dropdown_type+'\n';
    return code;
  }
}




