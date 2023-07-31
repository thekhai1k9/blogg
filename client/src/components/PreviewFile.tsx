export const PreviewFile = async (files: any) => {
  if (!files.length) {
    return null
  }
  return files.map((file: any) => <img src={file?.fileName} alt='Hình ảnh' />)
}
