import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class NotifTempsBlock extends CustomBlock {

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = NotifTempsBlock;
  }

  /**
   * Define conditionals block
   */

  defineBlock() {
    this.block.appendValueInput("durée")
      .setCheck("Number")
      .appendField("Envoyer la notification");
    this.block.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["jour(s)","jours"], ["heure(s)","heures"], ["minutes(s)","minutes"]]), "temps");
    this.block.appendDummyInput()
      .appendField("aprés le debut de la promotion.");
    this.block.setInputsInline(true);
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(105);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
  }

  toXML() {
    return '<block type="NotifTemps"></block>';
  }

  toDartCode(block: CustomBlock): string | any[] {
    return 'Not implemented';
  }

  /**
   * This method transform a block into code
   *
   * @param block Blockly's block considered
   * @return a string code of a targetted block
   */

  toJavaScriptCode(block: CustomBlock): string | any[] {
    var value_temps = Blockly.JavaScript.valueToCode(block, 'durée', Blockly.JavaScript.ORDER_NONE);
    var dropdown_temps = this.block.getFieldValue('temps');
    var code ='notif.temps_declanchement='+value_temps+'notif.temps='+dropdown_temps+';\n';
    return code;
  }

  toLuaCode(block: CustomBlock): string | any[] {
    return 'Not implemented';
  }

  toPHPCode(block: CustomBlock): string | any[] {
    return 'Not implemented';
  }

  toPythonCode(block: CustomBlock): string | any[] {
    return 'Not implemented';
  }
}
