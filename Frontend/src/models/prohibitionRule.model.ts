export interface ProhibitionRule {
  id: number;
  createdBy: string;
  type: string;
  numberMaxPeopleExpected?: number;
  numberMinPeopleExpected?: number;
  numberMinEventDuration?: number;
  numberMaxEventDuration?: number;
  operandShowHallCondition?: string;
  percentageShowHallCondition? : number;
  endHourMax? : number;
  targetPeople?: string[];
  code: string;
  text: string;
}
