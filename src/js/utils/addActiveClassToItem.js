const addActiveClassToItem = (list, position) => {
  //   console.log('addActiveClassToItem', position);
  if (!list) return false;

  for (let i = 0; i < list.length; i++) {
    if (list[i].classList.contains('autocomplete-item--active')) {
      list[i].classList.remove('autocomplete-item--active');
    }
  }

  if (position >= list.length) position = 0;
  else if (position < 0) position = list.length - 1;
  //   console.log('addActiveClassToItem after', position);
  list[position].classList.add('autocomplete-item--active');
};

export default addActiveClassToItem;
