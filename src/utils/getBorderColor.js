const getBorderColor = (voteAverage) => {
  if (voteAverage >= 7) {
    return '#66e900'
  } else if (voteAverage >= 5) {
    return '#e9d100'
  } else if (voteAverage >= 3) {
    return '#e97e00'
  } else {
    return '#e90000'
  }
}

export default getBorderColor
