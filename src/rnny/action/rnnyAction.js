import NYT_API_KEY from '../../config/rnny/nytApiKey';

export const loadRNNYNews = () => {
  console.log(loadRNNYNews);
  const req = fetch(`https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=${NYT_API_KEY}`);
  return {
    type: 'LOAD_RNNYNEWS',
    payload: req.then(response => response.json())
  };
};
