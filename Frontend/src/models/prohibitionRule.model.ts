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
  targetPeople?: string[];
  nbAnd:number;
  nbOr:number;
  code: string;
  text: string;
}
