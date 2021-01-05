import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class EventBlock extends CustomBlock {

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = EventBlock;
  }

  /**
   * Define conditionals block
   */

  defineBlock() {
    this.block.appendDummyInput()
      .appendField("Titre")
      .appendField(new Blockly.FieldTextInput(""), "Titre");
    this.block.appendDummyInput()
      .appendField("Description")
      .appendField(new Blockly.FieldTextInput(""), "Description");
    this.block.appendDummyInput()
      .appendField("DateDebut")
      .appendField(new Blockly.FieldDate('2020-02-20'), "DateDebut");
    this.block.appendDummyInput()
      .appendField("DateFin")
      .appendField(new Blockly.FieldDate('2020-02-20'), "DateFin");
    this.block.appendDummyInput()
      .appendField("NumeroMagasin")
      .appendField(new Blockly.FieldTextInput(""), "NumeroMagasin");
    this.block.appendDummyInput()
      .appendField("MotsCles")
      .appendField(new Blockly.FieldTextInput(""), "MotsCles");
    this.block.appendStatementInput("Promotions")
      .setCheck("Promotion")
      .appendField("Promotions");
    this.block.appendStatementInput("Notifications")
      .setCheck("Notification")
      .appendField("Notifications");
    this.block.setColour(165);
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }

  toXML() {
    return '<block type="Event"></block>';
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
    var text_titre = this.block.getFieldValue('Titre');
    var text_description = this.block.getFieldValue('Description');
    var text_datedebut = this.block.getFieldValue('DateDebut');
    var text_datefin = this.block.getFieldValue('DateFin');
    var text_numeromagasin = this.block.getFieldValue('NumeroMagasin');
    var text_motscles = this.block.getFieldValue('MotsCles');
    var statements_promotions = Blockly.JavaScript.statementToCode(block, 'Promotions');
    var statements_notifications = Blockly.JavaScript.statementToCode(block, 'Notifications');
    var code='';

    if(text_motscles!==""){
     code = 'this.event.title="'+text_titre+'";\n'+
              'this.event.description="'+text_description+'";\n'+
              'this.event.startDate="'+text_datedebut+'";\n'+
              'this.event.endDate="'+text_datefin+'";\n'+
              'this.event.shopId='+text_numeromagasin+';\n'+
              'this.event.keywords="'+text_motscles+'";\n'+
              statements_promotions +
              statements_notifications;}
    else {
       code = 'this.event.title="'+text_titre+'";\n'+
        'this.event.description="'+text_description+'";\n'+
        'this.event.startDate="'+text_datedebut+'";\n'+
        'this.event.endDate="'+text_datefin+'";\n'+
        'this.event.shopId='+text_numeromagasin+';\n'+
        statements_promotions +
        statements_notifications;}

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
