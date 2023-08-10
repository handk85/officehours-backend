import { google, calendar_v3 } from "googleapis";
import { calendar_id, office_hour } from "./config";

export { listEvents };

function getWeekdayIndex(day: string): number {
  return [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ].indexOf(day.toLowerCase());
}

function getDateWithTimezone(str: string): Date {
  const s = new Date(str);
  return new Date(s.getTime() - s.getTimezoneOffset() * 60000);
}

// Remove meetings outsides of office hours
async function filterEvents(events: calendar_v3.Schema$Event[]) {
  const filtered = events.filter((event) => {
    if (!event.start || !event.start.dateTime) {
      return false;
    }

    const start_date = getDateWithTimezone(event.start.dateTime);
    if (getWeekdayIndex(office_hour.weekday) !== start_date.getDay()) {
      return false;
    }

    const office_hour_start = new Date(start_date);
    office_hour_start.setHours(office_hour.start.hour);
    office_hour_start.setMinutes(office_hour.start.minute);
    const office_hour_end = new Date(start_date);
    office_hour_end.setHours(office_hour.end.hour);
    office_hour_end.setMinutes(office_hour.end.minute);

    return start_date >= office_hour_start && start_date <= office_hour_end;
  });

  return filtered.map((event) => {
    return {
      start: event.start!.dateTime!,
      end: event.end!.dateTime!,
    };
  });
}

async function listEvents(ctx: any): Promise<string> {
  const calendar = google.calendar({ version: "v3" });
  const res = await calendar.events.list({
    calendarId: calendar_id,
    timeMin: new Date().toISOString(),
    auth: ctx.client,
    singleEvents: true,
    orderBy: "startTime",
  });
  const events = res.data.items;
  if (!events || events.length === 0) {
    console.log("No upcoming events found.");
    ctx.throw(400, "No upcoming events found");
    return "";
  }

  const filtered = await filterEvents(events);

  return JSON.stringify(filtered);
}
