// Format thời gian
export const formatDateTime = (dateTimeString: string): string => {
  const date = new Date(dateTimeString)

  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  const formattedDateTime = `Ngày ${day} tháng ${month} năm ${year} (${hours}h:${minutes}m)`

  return formattedDateTime
}
