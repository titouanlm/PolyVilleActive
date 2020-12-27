export interface ProhibitionRule {
  id: number;
  employeeId: number;
  type: string;
  numberMaxPeopleExpected?: number;
  numberMinPeopleExpected?: number;
  targetPeople?: string;
  code: string;
}
