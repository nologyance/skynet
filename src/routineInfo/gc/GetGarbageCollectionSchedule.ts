import dayjs from "dayjs";
import { now } from "../../common/DateUtils";

export const getGarbageCollectionSchedule = () => {
  return getGCSchedule(now());
};

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
