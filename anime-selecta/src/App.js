import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredAnime, setFeaturedAnime] = useState([]);
  const [randomAnime, setRandomAnime] = useState(null);

  useEffect(() => {
    // Fetch featured anime
    fetchFeaturedAnime();

    // Fetch random anime
    fetchRandomAnime();
  }, []);

  const fetchFeaturedAnime = async () => {
    try {
      const response = await fetch('https://api.jikan.moe/v3/top/anime/1');
      const data = await response.json();
      setFeaturedAnime(data.top.slice(0, 6));
    } catch (error) {
      console.error('Error fetching featured anime:', error);
    }
  };

  const fetchRandomAnime = async () => {
    try {
      const response = await fetch('https://api.jikan.moe/v3/anime/' + Math.floor(Math.random() * 5000) + '/stats');
      const data = await response.json();
      setRandomAnime(data);
    } catch (error) {
      console.error('Error fetching random anime:', error);
    }
  };

  const handleSearch = async () => {
    // Implement search functionality here
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Anime Selecta</h1>
        <input
          type="text"
          placeholder="Search for anime..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </header>
      <section className="FeaturedAnime">
        <h2>Featured Anime</h2>
        <div className="AnimeList">
          {featuredAnime.map((anime) => (
            <div key={anime.mal_id} className="AnimeCard">
              <img src={anime.image_url} alt={anime.title} />
              <p>{anime.title}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="RandomAnime">
        <h2>Random Anime</h2>
        {randomAnime && (
          <div className="AnimeCard">
            <p>{randomAnime.title}</p>
            <p>Episodes: {randomAnime.episodes}</p>
            <p>Score: {randomAnime.score}</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;

