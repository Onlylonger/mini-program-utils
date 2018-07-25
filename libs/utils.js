export const getUnixTimeInfo = unixTimeStamp => {
  if (typeof timeStamp !== 'number')
    throw new Error('timeStamp must be number type')
  const curDate = new Date(v * 1000)
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
