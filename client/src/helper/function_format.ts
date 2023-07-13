// Format thời gian
export const formatDateTime = (dateTimeString: string): string => {
  const date = new Date(dateTimeString)

  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  const formattedDateTime = `${day}-${month}-${year} ${hours}giờ:${minutes}phút`

  return formattedDateTime
}
