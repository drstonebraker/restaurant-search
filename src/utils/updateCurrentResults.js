let timeoutID;

const updateCurrentResults = function updateCurrentResults(hits) {

  clearAllTimers();
  this.state.currentResults.hits = [];

  const recursiveUpdate = () => {
    const { currentResults } = this.state;
    if (hits.length === 0) return;


    const nextChunk = hits.splice(0, 5);
    const newHits = currentResults.hits.concat(nextChunk);

    const newResults = Object.assign({}, currentResults, { hits: newHits });

    this.setState({ currentResults: newResults }, () => {
      setTimeout(() => recursiveUpdate(), 0);
    });
  };

  recursiveUpdate();
};

function clearAllTimers() {
  let id = window.setTimeout(function() {}, 0);
  while (id--) window.clearTimeout(id);
}

export default updateCurrentResults;
