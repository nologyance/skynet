import { QuickReplyItem } from "@line/bot-sdk";

export type toQuickReplyItemProp = {
    label: string,
    data: string,
    displayText: string,
}

export const toQuickReplyItem = (
  { label, data, displayText }: toQuickReplyItemProp
) : QuickReplyItem => {
  return {
    type: "action",
    action: {
      type: "postback",
      label: label,
      data: data,
      displayText: displayText,
    },
  };
};
