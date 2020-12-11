import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class CondNbClientBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = CondNbClientBlock;


  }

  defineBlock() {

    this.block.appendValueInput("nombre_clients")
      .setCheck("Number")
      .appendField("Declancher la promotion quand il y a ");
    this.block.appendDummyInput()
      .appendField("clients dans mon magasin.");
    this.block.setInputsInline(true);
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(230);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
  }
  toXML() {
    return '<block type="NbClient"></block>';
  }

  toDartCode(block: CustomBlock): string | any[] {
    return 'Not implemented';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
    var value_nombre_clients = Blockly.JavaScript.valueToCode(block, 'nombre_clients', Blockly.JavaScript.ORDER_NONE);

    var code ='var Cond=new Condition();\nCond.type=\'NB_CUSTOMERS\';\n'+value_nombre_clients;

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
