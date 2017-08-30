import { createSelector } from 'reselect';
import { reshapeNewsData, filterNewsBySearchTerm } from '../../utils/dataTransformations';

const newsSelector = state => state.rnnynews;

const reshapeNewsSelector = createSelector(
  [newsSelector],
  reshapeNewsData
);

export const allNewsSelector = createSelector(
  [reshapeNewsSelector],
  rnnynewsItems => rnnynewsItems
);
