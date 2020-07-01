export interface LogItem {
    ageInDays: number;
    animalId: number;
    cowId: number;
    daysInLactation: number;
    deletable: boolean;
    endDateTime: number;
    eventId: number;
    healthIndex: number;
    heatIndexPeak: number;
    lactationNumber: number;
    minValueDateTime: number;
    reportingDateTime: number;
    startDateTime: number;
    type: string;
    newGroupId: number;
    newGroupName: string;
    currentGroupId: number;
    currentGroupName: string;
    destinationGroup: number;
    destinationGroupName: string;
    daysInPregnancy: number;
    oldLactationNumber: number;
    newborns: number;
    calvingEase: string;
    alertType: string;
    key?: string;
}
