const DATA_TIME_FORMAT = 'YYYY-MM-DD'
//dayjs默认是不支持转化utc格式的日期字符串的，需要下面这三步操作来拓展dayjs
import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'
dayjs.extend(utc)

export function formatUtcString(utcString: string, format: string = DATA_TIME_FORMAT): string {
  //格式化utc字符串
  return dayjs.utc(utcString).format(format)
}
