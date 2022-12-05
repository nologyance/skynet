import dayjs = require("dayjs");
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
    client.pushMessage(await createMessage());
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

const today = () => dayjs().format("YYYY/MM/DD");

const getSchedule = async (user: string, date: string) => {
  const docRef = await db.schedule(date, user).get();
  let data!: UserSchedule;
  docRef.forEach((doc) => {
    data = doc.data();
  });
  if (data === undefined) {
    return "(未登録)";
  }
  return data.time;
};
