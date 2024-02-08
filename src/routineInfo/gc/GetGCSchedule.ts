import * as dayjs from "dayjs";
import { now } from "../../common/DateUtils";

export const getGCScheduleNow = () => {
  return getGCSchedule(now());
};


/**
 * Returns the garbage collection schedule based on the given date.
 * @param {Date} date - 日付
 * @return {string} ごみ収集のスケジュール
 * - "普通ゴミ" for Mondays and Thursdays.
 * - "容器包装プラスチック" for Tuesdays.
 * - "資源ゴミ" for Fridays.
 * - "なし" for all other days.
 */
export const getGCSchedule = (date: dayjs.Dayjs) => {
  switch (dayjs(date).day()) {
    case 1:
    case 4:
      return "普通ゴミ";
    case 2:
      return "容器包装プラスチック";
    case 5:
      return "資源ゴミ";
    default:
      return "なし";
  }
};
