import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class HourBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = HourBlock;


  }

  defineBlock() {
      this.block.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["00","00"], ["01","01"], ["02","02"], ["03","03"], ["04","04"], ["05","05"], ["06","06"], ["07","07"], ["08","08"], ["09","09"], ["10","10"], ["11","11"], ["12","12"], ["13","13"], ["14","14"], ["15","15"], ["16","16"], ["17","17"], ["18","18"], ["19","19"], ["20","20"], ["21","21"], ["22","22"], ["23","23"]]), "H")
        .appendField("H")
        .appendField(new Blockly.FieldDropdown([["00","00"], ["05","05"], ["10","10"], ["15","15"], ["20","20"], ["25","25"], ["30","30"], ["35","35"], ["40","40"], ["45","45"], ["55","55"]]), "M");
      this.block.setOutput(true, null);
      this.block.setColour(230);
      this.block.setTooltip("");
      this.block.setHelpUrl("");
  }

  toXML() {
    return '<block type="hourBlock"></block>';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
    var dropdown_h = this.block.getFieldValue('H');
    var dropdown_m = this.block.getFieldValue('M');
    // TODO: Assemble JavaScript into code variable.
    var code = dropdown_h+':'+dropdown_m;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  }
}