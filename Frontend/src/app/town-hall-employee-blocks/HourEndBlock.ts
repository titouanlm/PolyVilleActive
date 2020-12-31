import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class HourEndBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = HourEndBlock;
  }

  defineBlock() {
    this.block.appendDummyInput("hourEndBlock")
      .appendField("If end time greater than")
      .appendField(new Blockly.FieldDropdown([["17","17"], ["18","18"], ["19","19"], ["20","20"], ["21","21"], ["22","22"], ["23","23"], ["00","00"], ["01","01"], ["02","02"], ["03","03"], ["04","04"], ["05","05"]]), "H")
      .appendField("H")
      .appendField(new Blockly.FieldDropdown([["00","00"], ["05","05"], ["10","10"], ["15","15"], ["20","20"], ["25","25"], ["30","30"], ["35","35"], ["40","40"], ["45","45"], ["50","50"], ["55","55"]]), "M");
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(330);
    this.block.setTooltip("");
    this.block.setHelpUrl("");
  }

  toXML() {
    return '<block type="hourEndBlock"></block>';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
    //var value_condheurefin = Blockly.JavaScript.valueToCode(block, 'condHeureFin', Blockly.JavaScript.ORDER_ATOMIC);
    const dropdown_h = this.block.getFieldValue('H');
    const dropdown_m = this.block.getFieldValue('M');
    let timeInMinutes = parseInt(dropdown_h) * 60 + parseInt(dropdown_m);
    if(dropdown_h < 6){
      timeInMinutes+= (24*60);
    }
    var code = 'this.prohibitionRule.code += \'this.culturalEvent.heureFin > '+ timeInMinutes + '\';\n';
    code+= 'this.prohibitionRule.text += \' the end time is greater than '+ dropdown_h + 'H' +  dropdown_m + '\';\n';
    return code;
  }
}




