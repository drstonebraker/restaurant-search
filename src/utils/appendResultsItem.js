const appendResultsItem = (restaurant) => {
  const resultsList = document.querySelector('#results__list');

  const li = document.createElement('li');

  li.textContent = restaurant.name;

  resultsList.appendChild(li);

  // const itemsList = hits.map(restaurant => (
  //   <ResultsItem restaurant={restaurant} key={restaurant.objectID} />
  // ));

  // return itemsList;
};

export default appendResultsItem;
