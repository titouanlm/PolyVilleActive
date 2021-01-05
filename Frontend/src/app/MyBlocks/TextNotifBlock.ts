import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class TextNotifEventBlock extends CustomBlock {

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = TextNotifEventBlock;
  }

  /**
   * Define conditionals block
   */

  defineBlock() {
    this.block.appendDummyInput()
      .appendField('Texte de la notification')
      .appendField(new Blockly.FieldTextInput('Un article acheté, le 2ème est à -70% !! Venez profiter de cet offre avant le 18 décemebre. '), 'NOTIF_TEXT');
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(150);
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }

  toXML() {
    return '<block type="TextNotif"></block>';
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
    var text_notif = this.block.getFieldValue('NOTIF_TEXT');
    var code = 'notif.text=\''+text_notif+'\';\n';

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
