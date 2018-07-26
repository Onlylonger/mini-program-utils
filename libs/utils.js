/**
 * 获取unix时间戳的 各个时间段
 * @param {number | string} unixTimeStamp 时间戳,单位秒
 * @return {object}
 */

export const getUnixTimeInfo = unixTimeStamp => {
  const curDate = new Date(unixTimeStamp * 1000)
  const year = curDate.getFullYear()
  const month = `0${curDate.getMonth() + 1}`.slice(-2)
  const date = `0${curDate.getDate()}`.slice(-2)
  const hours = `0${curDate.getHours()}`.slice(-2)
  const mins = `0${curDate.getMinutes()}`.slice(-2)
  const seconds = `0${curDate.getSeconds()}`.slice(-2)
  return {
    year,
    month,
    date,
    hours,
    mins,
    seconds
  }
}

/**
 * 产生自增整形数组
 * @param {number} begin
 * @param {number} end
 * @param {number} addNum
 * @return {number[]}
 */
export const getOrderNumberAry = (begin, end, addNum = 1) => {
  const ary = []
  for (let i = begin; i <= end; i = i + addNum) {
    ary.push(i)
  }
  return ary
}

/**
 *获取某年某月 具体天数
 * @param {number} year
 * @param {number} month
 * @return {number[]}
 */
export const getMonthDay = (year, month) => {
  // 判断是否闰年
  const isLeapYear = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)
  let array

  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      array = getOrderNumberAry(1, 31)
      break
    case 4:
    case 6:
    case 9:
    case 11:
      array = getOrderNumberAry(1, 30)
      break
    case 2:
      array = isLeapYear ? getOrderNumberAry(1, 29) : getOrderNumberAry(1, 28)
      break
    default:
      throw new Error('month is invalid')
  }
  return array
}
