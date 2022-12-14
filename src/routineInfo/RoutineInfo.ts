import * as functions from "firebase-functions";
import { dayOfWeek, days } from "../common/DateUtils";
import { LineClient } from "../common/LineClient";
import { User } from "../common/User";
import { dailyContent, getUpdatedEvent } from "./DailyContent";
import { createWeeklyContent } from "./WeeklyContent";

export const routineInfo = functions
  .region("asia-northeast1").pubsub.schedule("0 7 * * 1-5")
  .timeZone("Asia/Tokyo")
  .onRun(async () => {
    const client = new LineClient();
    const altText = `おはようございます。
    今日も人類を滅ぼすために頑張りましょう🤖`;

    try {
      client.pushMessage(
        [User.USER_A, User.USER_B],
        {
          type: "flex",
          altText: altText,
          contents: await dailyContent(),
        }
      );

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
  client.pushMessage(
    [User.USER_A, User.USER_B],
    {
      type: "flex",
      altText: "今週の予定",
      contents: await createWeeklyContent(),
    }
  );
};

const pushUpdatedEventOfThisWeekMessage = async (client: LineClient) => {
  const updatedEvent = await getUpdatedEvent();
  if (updatedEvent !== null) {
    client.pushMessage(
      [User.USER_A, User.USER_B],
      {
        type: "flex",
        altText: "予定の変更",
        contents: updatedEvent,
      },
    );
  }
};
