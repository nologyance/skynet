import { Message, QuickReplyItem } from "@line/bot-sdk";
import dayjs from "dayjs";
import * as functions from "firebase-functions";
import { UserSchedule } from "./@types/Schedule";
import { db } from "./common/Firestore";
import { LineClient } from "./common/LineClient";
import { User } from "./common/User";

export const noticeScheduleToGoHome = functions
  .region("asia-northeast1").pubsub.schedule("0 18 * * 1-5")
  .timeZone("Asia/Tokyo")
  .onRun(async () => {
    const client = new LineClient();
    await client.pushMessage(
      [User.USER_A, User.USER_B],
      createNoticeChangeMessageWithPreMessage(await createMessage()));
  });

const createMessage = async (): Promise<string> => {
  return messageFrom(
    await getSchedule(User.USER_A.enName, today()),
    await getSchedule(User.USER_B.enName, today())
  );
};

const messageFrom = (userASchedule: string, userBSchedule: string) => {
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
      items: [
        "19:00まで",
        "19:30くらい",
        "20:00くらい",
        "20:30くらい",
        "21:00くらい",
        "21:30過ぎるくらい",
      ].map((time) => quickReply(time)),
    },
  };
};

export const quickReply = (time: string): QuickReplyItem => {
  return {
    type: "action",
    action: {
      type: "postback",
      label: time + "に",
      data: `update_${time}`,
      displayText: "「" + time + "」で登録しました",
    },
  };
};


const today = () => dayjs().format("YYYY/MM/DD");

const getSchedule = async (user: string, date: string) => {
  const docRef = await db.schedule(date, user).get();
  let data!: UserSchedule;
  docRef.forEach((doc) => {
    data = doc.data();
  });
  // return data === undefined ? "(未登録)" : data.time;
  if (data === undefined) {
    return "(未登録)";
  }
  return data.time;
};
