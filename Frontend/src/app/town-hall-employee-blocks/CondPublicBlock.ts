import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class CondPublicBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = CondPublicBlock;


  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField("Si public attendu  =  ")
      .appendField(new Blockly.FieldDropdown([["Jeunes","jeune"], ["Personnes agées","personnesagee"], ["Enfants","enfant"], ["Tout public","tout"]]), "publicattendu");
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
  }

  toXML() {
    return '<block type="condpublic"></block>';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
    var dropdown_publicattendu = this.block.getFieldValue('publicattendu');
    // TODO: Assemble JavaScript into code variable.
    var code = ' this.culturalevent.typePublic === \''+dropdown_publicattendu+'\'';
    return code;
  }
}




