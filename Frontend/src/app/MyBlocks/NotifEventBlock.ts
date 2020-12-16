import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class NotifEventBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = NotifEventBlock;


  }

  defineBlock() {

    this.block.appendDummyInput()
      .appendField('Notification');
    this.block.appendDummyInput()
      .appendField('Texte de la notification')
      .appendField(new Blockly.FieldTextInput('Un article acheté, le 2ème est à -70% !! Venez profiter de cette offre avant le 18 décemebre. '), 'NOTIF_TEXT');
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(230);
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }
  toXML() {
    return '<block type="NotifEvent"></block>';
  }

  toDartCode(block: CustomBlock): string | any[] {
    return 'Not implemented';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
    var text_notif = this.block.getFieldValue('Texte de la notification');
    var code ='this.event.notification.text='+text_notif+';\n';
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
