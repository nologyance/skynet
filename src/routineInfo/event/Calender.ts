import {
  now,
  formatDate,
  formatDateTime,
  formatEndDate,
  getNextMonday,
  yesterday,
} from "../../common/DateUtils";
// eslint-disable-next-line
import { calendar_v3, google } from "googleapis";
import { convertCreator } from "../../common/User";
import dayjs = require("dayjs");

export const getEventsInNextMondayOnlyUpdatedFromYesterday = () => {
  return getEventsInNextMonday(yesterday());
};

export const getEventsInNextMonday =
  async (updatedMin?: dayjs.Dayjs) => {
    const res = await getResponse(updatedMin ?? now(), updatedMin);
    const events = res?.data.items;
    if (!events?.length) {
      return console.log("No event found.");
    }
    return mapResponse(events);
  };

const getResponse = (
  timeMin: dayjs.Dayjs, updatedMin?: dayjs.Dayjs) => {
  return calendar.events.list(
    Object.assign({}, {
      calendarId: process.env.CALENDAR_ID,
      timeMax: getNextMonday(now()).format(),
      timeMin: timeMin.format(),
      singleEvents: true,
      orderBy: "startTime",
      auth: auth,
    }, {
      updatedMin: updatedMin?.format(),
    }
    ));
};

const auth = process.env.NODE_ENV?.toString() === "test" ?
  new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_AUTH_KEY_FILE,
    scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
  }) :
  new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
  });
const calendar = google.calendar({ version: "v3", auth: auth });

// eslint-disable-next-line
const mapResponse = (events: calendar_v3.Schema$Event[]) => {
  return events.map((event) => {
    return {
      creator: convertCreator(event.creator?.email),
      title: event.summary,
      startTime: getDateTime(event).start,
      endTime: getDateTime(event).end,
      updatedAt: event.updated,
    };
  });
};

// eslint-disable-next-line
const getDateTime = ({ start, end }: calendar_v3.Schema$Event) => {
  return {
    start: start?.dateTime ?
      formatDateTime(start?.dateTime) : formatDate(start?.date),
    end: end?.dateTime ?
      formatDateTime(end?.dateTime) : formatEndDate(end?.date),
  };
};
