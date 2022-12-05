import * as functions from "firebase-functions";
import { dayOfWeek } from "../common/DateUtils";
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

      if (dayOfWeek() === 1) {
        client.pushFlexMessage(await createWeeklyContent(), "今週の予定");
      } else {
        const updatedEvent = await getUpdatedEvent();
        if (updatedEvent !== undefined) {
          client.pushFlexMessage(updatedEvent, "予定の変更");
        }
      }
    } catch (e) {
      console.error(e);
    }
  });
