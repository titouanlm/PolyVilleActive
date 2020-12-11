import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class CondTempsBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = CondTempsBlock;


  }

  defineBlock() {

    this.block.appendValueInput("nombre_clients")
      .setCheck("Number")
      .appendField("Declancher la promotion");
    this.block.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["jour(s)","jours"], ["heure(s)","heures"], ["minutes(s)","minutes"]]), "temps");
    this.block.appendDummyInput()
      .appendField(" avant la date de debut de la promotion.");
    this.block.setInputsInline(true);
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(105);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
  }
  toXML() {
    return '<block type="Temps"></block>';
  }

  toDartCode(block: CustomBlock): string | any[] {
    return 'Not implemented';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {

    var value_temps = Blockly.JavaScript.valueToCode(block, 'nombre_clients', Blockly.JavaScript.ORDER_NONE);
    var dropdown_temps = this.block.getFieldValue('temps');
    var code ='var Cond=new Condition();\nCond.type=\'NB_CUSTOMERS\';\n'+value_temps+'Cond.temps='+dropdown_temps+';\n';
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
