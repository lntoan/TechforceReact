import moment from 'moment';

const getMultimediaUrlByFormat = (multimedia, format) => {
  if (!multimedia) {
    return '';
  }
  const matchingFormat = multimedia.find(media => media.format === format);
  if (!matchingFormat) {
    return '';
  }
  return (matchingFormat.url.length>0 ? matchingFormat.url : '');
};

export const reshapeNewsData = rnnyReducer => (
  rnnyReducer.map(({ abstract, byline, geo_facet, multimedia, published_date, title, url }) => ({
    id: url,
    description: abstract || '',
    author: byline ? byline.replace('By ', '') : '',
    location: geo_facet.length > 0 ? geo_facet[0] : '',
    imageUrl: getMultimediaUrlByFormat(multimedia, 'thumbLarge'),
    date: moment(published_date).format('MMM Do YYYY'),
    title: title,
    url: url
  }))
);

export const filterNewsBySearchTerm = (newsItems, searchTerm) => {
  // returns an empty list if you haven't typed anything
  if (searchTerm.length === 0) {
    return [];
  }
  return newsItems.filter(({ description, author, title }) => (
    description.toLowerCase().indexOf(searchTerm) > -1 ||
    author.toLowerCase().indexOf(searchTerm) > -1 ||
    title.toLowerCase().indexOf(searchTerm) > -1
  ));
};
