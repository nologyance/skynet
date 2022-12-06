import dayjs from "dayjs";
import { getGCSchedule }
  from "../../src/routineInfo/gc/GetGarbageCollectionSchedule";

it("getGarbageCollectionSchedule", () => {
  expect(getGCSchedule(dayjs("2021-10-17 7:00:00")))
    .toBe("なし");
  expect(getGCSchedule(dayjs("2021-10-18 7:00:00")))
    .toBe("普通ゴミ");
  expect(getGCSchedule(dayjs("2021-10-19 7:00:00")))
    .toBe("容器包装プラスチック");
  expect(getGCSchedule(dayjs("2021-10-20 7:00:00")))
    .toBe("なし");
  expect(getGCSchedule(dayjs("2021-10-21 7:00:00")))
    .toBe("普通ゴミ");
  expect(getGCSchedule(dayjs("2021-10-22 7:00:00")))
    .toBe("資源ゴミ");
  expect(getGCSchedule(dayjs("2021-10-23 7:00:00")))
    .toBe("なし");
});
