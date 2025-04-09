const API_KEY = '__OMDB_API_KEY__'; // replaced at build time

async function getImdbID(title) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(title)}&type=series`);
  const data = await res.json();
  if (data.Response === 'False') {
    alert('TV show not found.');
    return null;
  }
  document.getElementById('poster').src = data.Poster || '';
  document.getElementById('titleHeader').textContent = `${data.Title} IMDb Episode Ratings`;
  return { imdbID: data.imdbID, totalSeasons: parseInt(data.totalSeasons), title: data.Title };
}

async function getAllRatings(imdbID, totalSeasons) {
  let ratings = [], labels = [];
  for (let s = 1; s <= totalSeasons; s++) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&Season=${s}`);
    const data = await res.json();
    if (!data.Episodes) {
      ratings.push([]); labels.push([]); continue;
    }
    ratings.push(data.Episodes.map(ep => parseFloat(ep.imdbRating)));
    labels.push(data.Episodes.map(ep => `S${s}E${ep.Episode}: ${ep.Title} (${ep.imdbRating})`));
  }
  return { ratings, labels };
}

function plotHeatmap(ratings, labels, totalSeasons, title) {
  const maxEpisodes = Math.max(...ratings.map(s => s.length));
  const z = Array.from({ length: maxEpisodes }, (_, ep) =>
    ratings.map(season => season[ep] || null));
  const text = Array.from({ length: maxEpisodes }, (_, ep) =>
    labels.map(season => season[ep] || ''));

  const data = [{
    z, text,
    x: Array.from({ length: totalSeasons }, (_, i) => `Season ${i + 1}`),
    y: Array.from({ length: maxEpisodes }, (_, i) => `Ep ${i + 1}`),
    type: 'heatmap',
    colorscale: [[0, 'green'], [0.5, 'yellow'], [1, 'red']],
    hoverinfo: 'text', hoverongaps: false
  }];

  const layout = {
    title: `${title} IMDb Episode Ratings`,
    xaxis: { title: 'Season' },
    yaxis: { title: 'Episode' }
  };

  Plotly.newPlot('heatmap', data, layout);
}

async function handleSearch() {
  const title = document.getElementById('titleInput').value;
  if (!title) return;
  const meta = await getImdbID(title);
  if (!meta) return;
  const { ratings, labels } = await getAllRatings(meta.imdbID, meta.totalSeasons);
  plotHeatmap(ratings, labels, meta.totalSeasons, meta.title);
}

window.onload = () => {
  document.getElementById('titleInput').value = "The Office";
  handleSearch();
};
