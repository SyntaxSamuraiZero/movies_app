const truncateDescription = (text, maxLength) => {
  if (text.length <= maxLength) return text

  let truncatedText = text.slice(0, maxLength)

  if (truncatedText.charAt(truncatedText.length - 1) !== ' ') {
    truncatedText = truncatedText.slice(0, truncatedText.lastIndexOf(' '))
  }

  return truncatedText + '...'
}

export default truncateDescription
