import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class CondNbPersonneBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = CondNbPersonneBlock;


  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField("Si nombre de personne attendu compris entre  ")
      .appendField(new Blockly.FieldNumber(0, 0), "min")
      .appendField("   et   ")
      .appendField(new Blockly.FieldNumber(999999999, 1), "max");
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
  }

  toXML() {
    return '<block type="condnbpersonne"></block>';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
    var number_min = this.block.getFieldValue('min');
    var number_max = this.block.getFieldValue('max');
    // TODO: Assemble JavaScript into code variable.
    var code = 'this.culturalevent.nbrPresonneAttendu <= '+number_max+' && this.culturalevent.nbrPresonneAttendu >= '+number_min+'\n';
    return code;
  }
}




