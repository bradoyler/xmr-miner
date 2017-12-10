
export default function getTS () {
  const dd = new Date()
  const hour = (dd.getHours() < 10 ? '0' : '') + dd.getHours()
  const min = (dd.getMinutes() < 10 ? '0' : '') + dd.getMinutes()
  const sec = (dd.getSeconds() < 10 ? '0' : '') + dd.getSeconds()
  return `${hour}:${min}:${sec}`
}
