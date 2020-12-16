import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class NombreBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = NombreBlock;

  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField(new Blockly.FieldTextInput("0"), "nombre");
    this.block.setOutput(true, null);
    this.block.setColour(280);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
  }
  toXML() {
    return '<block type="Nb"></block>';
  }

  toDartCode(block: CustomBlock): string | any[] {
    return 'Not implemented';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
    var nombre = parseInt(this.block.getFieldValue('nombre'),10);
    // TODO: Assemble JavaScript into code variable.
    var code = nombre;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];

   // return code;
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
