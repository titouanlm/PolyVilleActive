import { Component, OnInit } from '@angular/core';
import {
  Category,
  COLOUR_CATEGORY,
  CustomBlock,
  FUNCTIONS_CATEGORY,
  LISTS_CATEGORY,
  LOGIC_CATEGORY,
  LOOP_CATEGORY,
  MATH_CATEGORY,
  NgxBlocklyConfig,
  NgxBlocklyGeneratorConfig,
  NgxToolboxBuilderService,
  Separator,
  TEXT_CATEGORY,
  VARIABLES_CATEGORY
} from 'ngx-blockly';
import {TestBlock} from './TestBlock';


@Component({
  selector: 'app-testblock',
  templateUrl: './testblock.component.html',
  styleUrls: ['./testblock.component.scss']
})
export class TestblockComponent {


  public config: NgxBlocklyConfig = {};

  public customBlocks: CustomBlock[] = [
    new TestBlock('test', null, null)
  ];


  constructor(ngxToolboxBuilder: NgxToolboxBuilderService) {
    ngxToolboxBuilder.nodes = [
      new Category('Test', '#FF00FF', this.customBlocks, null),
      LOGIC_CATEGORY,
      LOOP_CATEGORY,
      MATH_CATEGORY,
      TEXT_CATEGORY,
      new Separator(), // Add Separator
      LISTS_CATEGORY,
      COLOUR_CATEGORY,
      VARIABLES_CATEGORY,
      FUNCTIONS_CATEGORY
    ];
    this.config.toolbox = ngxToolboxBuilder.build();
    this.config.scrollbars = false;
  }

  public generatorConfig: NgxBlocklyGeneratorConfig = {
    dart: true,
    javascript: true,
    lua: true,
    php: true,
    python: true,
    xml: true
  };


  onCode(code: string) {
    console.log(code);
  }

}
