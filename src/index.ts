import { askScheduleToGoHome } from "./AskScheduleToGoHome";
import { routineInfo } from "./routineInfo/RoutineInfo";
import { noticeScheduleToGoHome } from "./NoticeScheduleToGoHome";
import { lineWebhook } from "./Webhook";

exports.lineWebhook = lineWebhook;
exports.askScheduleToGoHome = askScheduleToGoHome;
// NOTE: このfunctionにCalenderにアクセスできるサービスアカウントを紐付けている
exports.routineInfo = routineInfo;
exports.noticeScheduleToGoHome = noticeScheduleToGoHome;
