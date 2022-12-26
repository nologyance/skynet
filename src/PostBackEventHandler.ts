import * as line from "@line/bot-sdk";
import { Message } from "@line/bot-sdk";
import { saveSchedule } from "./common/Firestore";
import { LineClient } from "./common/LineClient";
import { toQuickReplyItem } from "./common/MessageFactory";
import { User, userIdOf } from "./common/User";
import { scheduleToGoHomeCandidate } from "./ScheduleToGoHomeCandidate";

export const handleEvent = (event: line.PostbackEvent) => {
  if (event.postback.data.startsWith("first_")) {
    firstReplyAction(event);
  } else if (event.postback.data.startsWith("update_")) {
    updatedReplyAction(event);
  } else if (event.postback.data.startsWith("completed_")) {
    completedReplyAction(event);
  } else {
    console.error("unknown postback data");
  }
};

const firstReplyAction = (event: line.PostbackEvent) => {
  if (event.source.userId === undefined) return;
  const time = event.postback.data.replace("first_", "");
  saveSchedule(event.source.userId, time);
};

const updatedReplyAction = async (event: line.PostbackEvent) => {
  if (event.source.userId === undefined) return;
  const time = event.postback.data.replace("update_", "");
  if (time === "変更なし") {
    return;
  }
  // FIXME: DBも更新する
  // saveSchedule(event.source.userId, time);
  const client = new LineClient();
  if (userIdOf(event.source.userId) === User.USER_A) {
    await client.pushMessage(
      [User.USER_B],
      noticeChangeMessage(`${User.USER_A.name}はやっぱり${time}に帰るそうです。`)
    );
  } else {
    await client.pushMessage(
      [User.USER_A],
      noticeChangeMessage(`${User.USER_B.name}はやっぱり${time}に帰るそうです。`)
    );
  }
};

const completedReplyAction = async (event: line.PostbackEvent) => {
  if (event.source.userId === undefined) return;
  const time = event.postback.data.replace("completed_", "");
  if (time === "変更なし") {
    return;
  }
  const client = new LineClient();
  if (userIdOf(event.source.userId) === User.USER_A) {
    const message = `${User.USER_A.name}はやっぱり${time}に帰るそうです。`;
    await client.pushMessage(
      [User.USER_B],
      { type: "text", text: message }
    );
  } else {
    const message = `${User.USER_B.name}はやっぱり${time}に帰るそうです。`;
    await client.pushMessage(
      [User.USER_A],
      { type: "text", text: message }
    );
  }
};

export const noticeChangeMessage = (preMessage: string): Message => {
  const NO_CHANGE = "変更なし";
  const noChangeItem = toQuickReplyItem({
    label: NO_CHANGE,
    data: `completed_${NO_CHANGE}`,
    displayText: `「${NO_CHANGE}」で登録しました`,
  });

  const candidateItem = scheduleToGoHomeCandidate
    .map((candidate) => toQuickReplyItem({
      label: `${candidate}に`,
      data: `completed_${candidate}`,
      displayText: `「${candidate}」で登録しました`,
    }));

  return {
    type: "text",
    text: preMessage + "\n" + "予定を変更しますか？変更する場合は返信してください。",
    quickReply: {
      items: [noChangeItem, ...candidateItem],
    },
  };
};
