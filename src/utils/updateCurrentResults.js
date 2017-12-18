import appendResultsItem from './appendResultsItem'


const updateCurrentResults = function updateCurrentResults(newResults) {
  clearAllTimers();
  const { hits } = newResults;
  newResults.hits = [];
  this.state.currentResults = newResults;

  const resultsList = document.querySelector('#results__list');
  resultsList.innerHTML = '';

  hits.forEach((restaurant) => {
    setTimeout(() => appendResultsItem(restaurant), 0);
  });

  // const recursiveUpdate = () => {
  //   const { currentResults } = this.state;
  //   if (hits.length === 0) return;


  //   const nextChunk = hits.splice(0, 5);
  //   const newHits = currentResults.hits.concat(nextChunk);

  //   const updatedResults = Object.assign({}, currentResults, { hits: newHits });

  //   this.setState({ currentResults: updatedResults }, () => {
  //     setTimeout(() => recursiveUpdate(), 0);
  //   });
  // };

  // recursiveUpdate();
};

function clearAllTimers() {
  let id = window.setTimeout(function() {}, 0);
  while (id--) window.clearTimeout(id);
}

export default updateCurrentResults;
