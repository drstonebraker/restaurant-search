const updateCurrentResults = function updateCurrentResults(hits) {
  const { currentResults } = this.state;
  const newResults = Object.assign({}, currentResults, { hits });

  this.setState({ currentResults: newResults });
};

export default updateCurrentResults;
