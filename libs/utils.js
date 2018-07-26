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
