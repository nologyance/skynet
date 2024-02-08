import dayjs, { extend } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

extend(timezone);
extend(utc);

export const now = () => {
  return dayjs().tz("Asia/Tokyo");
};

export const days = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export const dayOfWeek = () => {
  return dayjs().add(1, "day").day();
};

export const theDayOfWeek = (date: dayjs.Dayjs) => {
  return date.add(1, "day").day();
};

export const yesterday = () => {
  return now().subtract(1, "day");
};
export const getNextMonday = (date: dayjs.Dayjs) => {
  switch (date.day()) {
    case days.Sun:
      return date.add(1, "day").startOf("d");
    case days.Mon:
      return date.add(1, "week").startOf("d");
    case days.Tue:
    case days.Wed:
    case days.Thu:
    case days.Fri:
    case days.Sat:
      return date.add(1, "week").subtract(date.day() - 1).startOf("d");
    default:
      return date.startOf("d");
  }
};

export const getLastMonday = (date: dayjs.Dayjs) => {
  switch (date.day()) {
    case days.Sun:
      return date.subtract(6, "day").startOf("d");
    case days.Mon:
      return date.subtract(1, "week").startOf("d");
    case days.Tue:
    case days.Wed:
    case days.Thu:
    case days.Fri:
    case days.Sat:
      return date.subtract(date.day() - 1, "day").startOf("d");
    default:
      return date.startOf("d");
  }
};

export const formatDate = (date: string | null | undefined) => {
  if (date !== null) {
    return dayjs(date).tz("Asia/Tokyo").format("MM/DD");
  }
  return "";
};

/**
 * MM/DD形式の日付を返す
 * Googleカレンダーは終日の予定を24:00までとみなすため、EndDateから1を引く
 * @param {Date} date 日付文字列
 * @return {string} 日付
 */
export const formatEndDate = (date: string | null | undefined): string => {
  if (date !== null) {
    return dayjs(date).subtract(1, "day")
      .tz("Asia/Tokyo").format("MM/DD");
  }
  return "";
};

export const formatDateTime = (dateTime: string | null | undefined) => {
  if (dateTime !== null) {
    return dayjs(dateTime).tz("Asia/Tokyo").format("MM/DD HH:mm");
  }
  return "";
};
