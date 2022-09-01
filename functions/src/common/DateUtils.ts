import dayjs = require("dayjs");
import timezone = require("dayjs/plugin/timezone")
import utc = require("dayjs/plugin/utc")

dayjs.extend(timezone);
dayjs.extend(utc);

export const now = () => {
  return dayjs().tz("Asia/Tokyo");
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
    case 0:
      return date.add(1, "day").startOf("d");
    case 1:
      return date.add(1, "week").startOf("d");
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      return date.add(1, "week").subtract(date.day() - 1).startOf("d");
    default:
      return date.startOf("d");
  }
};

export const getLastMonday = (date: dayjs.Dayjs) => {
  switch (date.day()) {
    case 0:
      return date.subtract(6, "day").startOf("d");
    case 1:
      return date.subtract(1, "week").startOf("d");
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
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
