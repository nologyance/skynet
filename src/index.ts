import { askScheduleToGoHome } from "./AskScheduleToGoHome";
import { noticeScheduleToGoHome } from "./NoticeScheduleToGoHome";
import { routineInfo } from "./routineInfo/RoutineInfo";
import { lineWebhook } from "./webhook/Webhook";

exports.lineWebhook = lineWebhook;
exports.askScheduleToGoHome = askScheduleToGoHome;
// NOTE: このfunctionにCalenderにアクセスできるサービスアカウントを紐付けている
exports.routineInfo = routineInfo;
exports.noticeScheduleToGoHome = noticeScheduleToGoHome;
