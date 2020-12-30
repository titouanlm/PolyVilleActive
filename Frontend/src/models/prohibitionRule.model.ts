export interface ProhibitionRule {
  id: number;
  createdBy: string;
  type: string;
  numberMaxPeopleExpected?: number;
  numberMinPeopleExpected?: number;
  targetPeople?: string[];
  code: string;
  text: string;
}
