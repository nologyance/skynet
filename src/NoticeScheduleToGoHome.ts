import { Message, QuickReplyItem } from "@line/bot-sdk";
import * as dayjs from "dayjs";
import * as functions from "firebase-functions";
import { UserSchedule } from "./@types/Schedule";
import { db } from "./common/Firestore";
import { LineClient } from "./common/LineClient";
import { User } from "./common/User";
import { scheduleToGoHomeCandidate } from "./ScheduleToGoHomeCandidate";

export const noticeScheduleToGoHome = functions
  .region("asia-northeast1").pubsub.schedule("0 18 * * 1-5")
  .timeZone("Asia/Tokyo")
  .onRun(async () => {
    const client = new LineClient();
    await client.pushMessage(
      [User.USER_A, User.USER_B],
      createNoticeChangeMessageWithPreMessage(
        await createScheduleToGoHomeMessage()
      ));
  });

const createScheduleToGoHomeMessage = async (): Promise<string> => {
  const userASchedule = await getSchedule(User.USER_A, today());
  const userBSchedule = await getSchedule(User.USER_B, today());
  return `${User.USER_A.name} は ${userASchedule} 
  ${User.USER_B.name} は ${userBSchedule} に帰るそうです。`;
};

export const createNoticeChangeMessageWithPreMessage =
  (preMessage: string): Message => {
    return createNoticeChangeMessage(preMessage);
  };

export const createNoticeChangeMessage = (preMessage?: string): Message => {
  const defaultMessage = "予定を変更しますか？変更する場合は返信してください。";
  const displayMessage = preMessage ?
    `${preMessage}\n${defaultMessage}` : defaultMessage;
  return {
    type: "text",
    text: displayMessage,
    quickReply: {
      items: scheduleToGoHomeCandidate.map((time) => quickReply(time)),
    },
  };
};

export const quickReply = (time: string): QuickReplyItem => {
  return {
    type: "action",
    action: {
      type: "postback",
      label: `${time}に`,
      data: `update_${time}`,
      displayText: `「${time}」で登録しました`,
    },
  };
};

const today = () => dayjs().format("YYYY/MM/DD");

const getSchedule = async (user: User, date: string) => {
  const docRef = await db.schedule(date, user.enName).get();
  let data!: UserSchedule;
  docRef.forEach((doc) => {
    data = doc.data();
  });
  return data === undefined ? "(未登録)" : data.time;
};
