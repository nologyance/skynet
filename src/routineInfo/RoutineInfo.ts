import * as functions from "firebase-functions";
import { dayOfWeek, days } from "../common/DateUtils";
import { LineClient } from "../common/LineClient";
import { dailyContent, getUpdatedEvent } from "./DailyContent";
import { createWeeklyContent } from "./WeeklyContent";

export const routineInfo = functions
  .region("asia-northeast1").pubsub.schedule("0 7 * * 1-5")
  .timeZone("Asia/Tokyo")
  .onRun(async () => {
    const client = new LineClient();
    try {
      client.pushFlexMessage(await dailyContent(),
        `おはようございます。
        今日も人類を滅ぼすために頑張りましょう🤖`);

      if (dayOfWeek() === days["Mon"]) {
        pushEventOfThisWeekMessage(client);
      } else {
        pushUpdatedEventOfThisWeekMessage(client);
      }
    } catch (e) {
      console.error(e);
    }
  });

const pushEventOfThisWeekMessage = async (client: LineClient) => {
  client.pushFlexMessage(await createWeeklyContent(), "今週の予定");
};

const pushUpdatedEventOfThisWeekMessage = async (client: LineClient) => {
  const updatedEvent = await getUpdatedEvent();
  if (updatedEvent !== null) {
    client.pushFlexMessage(updatedEvent, "予定の変更");
  }
};
