import credentials from "./credentials.json";
import { OfficeHour } from "./types";

const calendar_id = process.env.calendar_id ?? credentials.calendar_id;
const client_email = process.env.client_email ?? credentials.client_email;
const private_key = process.env.private_key ?? credentials.private_key;

const office_hour: OfficeHour = {
  weekday: "Tuesday",
  start: {
    hour: 14,
    minute: 0,
  },
  end: {
    hour: 16,
    minute: 0,
  },
  duration: 30,
};

export { calendar_id, client_email, private_key, office_hour };
