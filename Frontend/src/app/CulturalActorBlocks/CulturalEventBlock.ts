import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class CulturalEventBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = CulturalEventBlock;


  }

  defineBlock() {
        this.block.appendDummyInput()
          .appendField("Titre      ")
          .appendField(new Blockly.FieldTextInput(""), "Titre");
        this.block.appendDummyInput()
              .appendField("Description        ")
              .appendField(new Blockly.FieldTextInput(""), "Description");
        this.block.appendDummyInput()
              .appendField("Date de début   ")
              .appendField(new Blockly.FieldTextInput(""), "DateDebut")
              .appendField("       Date de fin    ")
              .appendField(new Blockly.FieldTextInput(""), "DateFin");
        this.block.appendValueInput("heureDebut")
              .setCheck(null)
              .appendField("Heure de debut");
        this.block.appendValueInput("NAME")
              .setCheck(null)
              .appendField("Heure de fin");
        this.block.appendDummyInput()
              .appendField("Nombre de personne attendu")
              .appendField(new Blockly.FieldNumber(0, 0), "nbpersonne");
        this.block.appendDummyInput()
              .appendField("Lieu        ")
              .appendField(new Blockly.FieldTextInput(""), "lieu");
        this.block.appendDummyInput()
              .appendField("Type d'évènement    ")
              .appendField(new Blockly.FieldDropdown([["Théâtre","theatre"], ["Concert","concert"], ["Festival","festival"], ["Exposition","exposition"], ["Danse","danse"]]), "type");
        this.block.appendDummyInput()
              .appendField("Public attendu        ")
              .appendField(new Blockly.FieldDropdown([["Jeunes","jeune"], ["Personnes âgées","pesonneagee"], ["Enfants","enfant"], ["Tout public","toutpublic"]]), "public");
        this.block.setColour(165);
        this.block.setTooltip("");
        this.block.setHelpUrl("");
  }

  toXML() {
    return '<block type="culturalEvent"></block>';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
      var text_titre = this.block.getFieldValue('Titre');
      var text_description = this.block.getFieldValue('Description');
      var text_datedebut = this.block.getFieldValue('DateDebut');
      var text_datefin = this.block.getFieldValue('DateFin');
      var value_heuredebut = Blockly.JavaScript.valueToCode(block, 'heureDebut', Blockly.JavaScript.ORDER_ATOMIC);
      var value_heurefin = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
      var number_nbpersonne = this.block.getFieldValue('nbpersonne');
      var text_lieu = this.block.getFieldValue('lieu');
      var dropdown_type = this.block.getFieldValue('type');
      var dropdown_public = this.block.getFieldValue('public');

      var code ='this.culturalEvent.title='+text_titre+';\n'+
                'this.culturalEvent.description='+text_description+';\n'+
                'this.culturalEvent.datedebut='+text_datedebut+';\n'+
                'this.culturalEvent.datefin='+text_datefin+';\n'+
                'this.culturalEvent.heureDebut ='+ value_heuredebut+';\n'+
                'this.culturalEvent.heureFin ='+ value_heurefin+';\n'+
                'this.culturalEvent.nbrPresonneAttendu='+number_nbpersonne+';\n'+
                'this.culturalEvent.lieu='+text_lieu+';\n'+
                'this.culturalEvent.typeEvenement='+dropdown_type+';\n'+
                'this.culturalEvent.typePublic='+dropdown_public+';\n';
      return code;
  }
}
