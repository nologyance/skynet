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
    try {
      pushDailyMessage();

      if (dayOfWeek() === days["Mon"]) {
        pushEventMessageForThisWeek();
      } else {
        pushUpdatedEventMessageForThisWeek();
      }
    } catch (e) {
      console.error(e);
    }
  });

const pushDailyMessage = async () => {
  const altText = `おはようございます。
  今日も人類を滅ぼすために頑張りましょう🤖`;

  new LineClient().pushMessage(
    [User.USER_A, User.USER_B],
    {
      type: "flex",
      altText: altText,
      contents: await dailyContent(),
    }
  );
};

const pushEventMessageForThisWeek = async () => {
  new LineClient().pushMessage(
    [User.USER_A, User.USER_B],
    {
      type: "flex",
      altText: "今週の予定",
      contents: await createWeeklyContent(),
    }
  );
};

const pushUpdatedEventMessageForThisWeek = async () => {
  const updatedEvent = await getUpdatedEvent();
  if (updatedEvent !== null) {
    new LineClient().pushMessage(
      [User.USER_A, User.USER_B],
      {
        type: "flex",
        altText: "予定の変更",
        contents: updatedEvent,
      },
    );
  }
};
