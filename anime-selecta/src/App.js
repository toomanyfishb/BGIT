import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredAnime, setFeaturedAnime] = useState([]);
  const [randomAnime, setRandomAnime] = useState(null);
  const [selectedAnimeForDescription, setSelectedAnimeForDescription] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchFeaturedAnime();
    fetchRandomAnime();
  }, []);

  const fetchFeaturedAnime = async () => {
    try {
      const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              Page(page: 1, perPage: 6) {
                media(type: ANIME, sort: POPULARITY_DESC) {
                  id
                  title { romaji }
                  description
                  coverImage { medium }
                  averageScore
                  episodes
                }
              }
            }
          `
        })
      });
      const { data } = await response.json();
      setFeaturedAnime(data?.Page?.media || []);
    } catch (error) {
      console.error('Error fetching featured anime:', error);
    }
  };

  const fetchRandomAnime = async () => {
    try {
      const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              Media(id: ${Math.floor(Math.random() * 20000)}) {
                title { romaji }
                description
                coverImage { medium }
                averageScore
                episodes
              }
            }
          `
        })
      });
      const { data } = await response.json();
      setRandomAnime(data?.Media || null);
    } catch (error) {
      console.error('Error fetching random anime:', error);
    }
  };

  const handleAnimeClick = (anime) => {
    setSelectedAnimeForDescription(anime);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedAnimeForDescription(null);
    setIsModalOpen(false);
  };

  const handleRandomize = () => {
    fetchRandomAnime();
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
      </header>
      <section className="FeaturedAnime">
        <h2>Featured Anime</h2>
        <div className="AnimeList">
          {featuredAnime.map((anime) => (
            <div key={anime.id}>
              <AnimeCard anime={anime} onClick={() => handleAnimeClick(anime)} />
            </div>
          ))}
        </div>
      </section>
      <section className="RandomAnime">
        <h2>Random Anime</h2>
        {randomAnime && (
          <div>
            <AnimeCard anime={randomAnime} onClick={() => handleAnimeClick(randomAnime)} />
          </div>
        )}
        <button onClick={handleRandomize} className="RandomizeButton">Randomize</button>
      </section>
      {selectedAnimeForDescription && isModalOpen && (
        <AnimeDescriptionModal anime={selectedAnimeForDescription} onClose={handleCloseModal} />
      )}
      <footer className="Footer">
        <p>© 2024 Anime Selecta</p>
        <p>Created by Mobolaji Babalola</p>
      </footer>
    </div>
  );
}


const AnimeCard = ({ anime, onClick }) => (
  <div className="AnimeCard" onClick={onClick}>
    <img src={anime.coverImage.medium} alt={anime.title.romaji} />
    <p>{anime.title.romaji}</p>
  </div>
);

const AnimeDescriptionModal = ({ anime, onClose }) => (
  <div className="AnimeDescriptionModal">
    <div className="ModalContent">
      <span className="CloseButton" onClick={onClose}>×</span>
      <h2>{anime.title.romaji}</h2>
      <div className="Description">
        <p><strong>Description:</strong></p>
        <p>{anime.description}</p>
      </div>
      <div className="Info">
        <p><strong>Episodes:</strong> {anime.episodes}</p>
        <p><strong>Average Score:</strong> {anime.averageScore}</p>
      </div>
    </div>
  </div>
);


export default App;
