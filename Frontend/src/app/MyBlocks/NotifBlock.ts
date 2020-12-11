import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class NotifBlock extends CustomBlock {

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = NotifBlock;
  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField('Programmer l\'envoie des notifications?   Oui ')
      .appendField(new Blockly.FieldCheckbox('FALSE'), 'NOTIF_YES')
      .appendField('    Non')
      .appendField(new Blockly.FieldCheckbox('FALSE'), 'NOTIF_NO');
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(90);
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }
  toXML() {
    return '<block type="notification"></block>';
  }

  toDartCode(block: CustomBlock): string | any[] {
    return 'Not implemented';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
    var checkbox_notif_yes = this.block.getFieldValue('NOTIF_YES') == 'TRUE';
    var checkbox_notif_no = this.block.getFieldValue('NOTIF_NO') == 'TRUE';
    var code='promo.notif_on='+checkbox_notif_yes+';\n';
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
