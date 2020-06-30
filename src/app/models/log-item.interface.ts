export interface LogItem {
    ageInDays: number;
    animalId: number|string;
    cowId: number;
    daysInLactation: number;
    deletable: boolean;
    endDateTime: number;
    eventId: number;
    healthIndex: number;
    lactationNumber: number;
    minValueDateTime: number;
    reportingDateTime: number;
    startDateTime: number;
    type: string;
    key?: string;
}
