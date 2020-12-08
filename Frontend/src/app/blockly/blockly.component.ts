import { Component, OnInit } from '@angular/core';
import {NgxBlocklyConfig, NgxBlocklyGeneratorConfig} from 'ngx-blockly';

declare var Blockly: any;

@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.scss']
})
export class BlocklyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public config: NgxBlocklyConfig = {
    toolbox: ' <xml id="toolbox" style="display: none">' +
      '<category name="Variables" custom="VARIABLE" colour="330"></category>' +
    '<category name="Functions" custom="PROCEDURE" colour="330"></category>' +
    '<category name="Logic" colour="210">' +
    '<block type="controls_if"></block>' +
      '<block type="logic_compare"></block>' +
    '<block type="logic_operation"></block>' +
    '<block type="logic_boolean"></block>' +
    '</category>' +
    '<category name="Loops" colour="120">' +
    '<block type="controls_whileUntil"></block>' +
      '<block type="controls_repeat_ext"></block>' +
    '<block type="controls_for"></block>' +
    '</category>' +
    '<category name="Math" colour="230">' +
    '<block type="math_number"></block>' +
      '<block type="math_arithmetic"></block>' +
    '</category>' +
    '<category name="Functions" colour="290" custom="PROCEDURE"></category>' +
    '<category name="Texte" colour="150">' +
    '<block type="text"></block>' +
      '<block type="text_print"></block>' +
    '</category>' +
      '</xml>',
    scrollbars: false,
    trashcan: true
  };

  public generatorConfig: NgxBlocklyGeneratorConfig = {
    dart: true,
    javascript: true,
    lua: true,
    php: true,
    python: true,
    xml: true
  };

  execute() {
    var code = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);

    try {
      eval(code);
    } catch (e) {
      alert(e);
    }
    console.log(code);
  }
}
