export interface CalendarListEntry {
  accessRole: string;
  backgroundColor: string;
  colorId: string;
  conferenceProperties: {
      allowedConferenceSolutionTypes: string[];
  };
  defaultReminders: any[];
  etag: string;
  foregroundColor: string;
  id: string;
  kind: string;
  summary: string;
  timeZone: string;
}
