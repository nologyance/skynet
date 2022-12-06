import { getLastMonday, now } from "../../src/common/DateUtils";
import { getEventsInNextMonday }
  from "../../src/routineInfo/event/Calender";
import { getUpdatedEvent } from "../../src/routineInfo/DailyContent";
it("createMessage", async () => {
  expect(await getEventsInNextMonday()).toBe("a");
});

it("acreateMessage", async () => {
  expect(await getUpdatedEvent()).toBe("a");
});

it("aacreateMessage", async () => {
  expect(await getLastMonday(now()).format()).toBe("a");
});

