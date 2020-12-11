import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class NotifFrequenceBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = NotifFrequenceBlock;


  }

  defineBlock() {

    this.block.appendValueInput("durée")
      .setCheck("Number")
      .appendField("Envoyer la notification chaque");
    this.block.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["jour(s) ","jours"], ["heure(s) ","heures"], ["",""]]), "temps");
    this.block.appendDummyInput()
      .appendField(".");
    this.block.setInputsInline(true);
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(270);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
  }
  toXML() {
    return '<block type="NotifFrequence"></block>';
  }

  toDartCode(block: CustomBlock): string | any[] {
    return 'Not implemented';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {

    var value_frequence = Blockly.JavaScript.valueToCode(block, 'durée', Blockly.JavaScript.ORDER_NONE);
    var dropdown_temps = this.block.getFieldValue('temps');
    var code ='notif.frequence='+value_frequence+'notif.temps_frequence='+dropdown_temps+';\n';
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
