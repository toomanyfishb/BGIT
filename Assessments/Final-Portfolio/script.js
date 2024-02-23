// Fetching featured anime for the Home Page
fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({
        query: `
            query {
                Page(page: 1, perPage: 6) {
                    media(type: ANIME) {
                        id
                        title {
                            romaji
                        }
                        coverImage {
                            medium
                        }
                    }
                }
            }
        `
    })
})
.then(response => response.json())
.then(data => {
    const featuredSection = document.querySelector('.featured');
    data.data.Page.media.forEach(anime => {
        const animeCard = document.createElement('div');
        animeCard.classList.add('anime-card');

        const animeImage = document.createElement('img');
        animeImage.src = anime.coverImage.medium;
        animeImage.alt = anime.title.romaji;

        const animeTitle = document.createElement('h3');
        animeTitle.textContent = anime.title.romaji;

        animeCard.appendChild(animeImage);
        animeCard.appendChild(animeTitle);
        featuredSection.appendChild(animeCard);
    });
})
.catch(error => console.error('Error fetching featured anime:', error));

// Dynamically populating the questionnaire form for the Find My Anime Page
const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life'];

const genreSelect = document.createElement('select');
genreSelect.name = 'genre';
genres.forEach(genre => {
    const option = document.createElement('option');
    option.value = genre.toLowerCase();
    option.textContent = genre;
    genreSelect.appendChild(option);
});

const durationSlider = document.createElement('input');
durationSlider.type = 'range';
durationSlider.name = 'duration';
durationSlider.min = 0;
durationSlider.max = 60;
durationSlider.value = 30; // Default to 30 minutes

const episodeSlider = document.createElement('input');
episodeSlider.type = 'range';
episodeSlider.name = 'episode-length';
episodeSlider.min = 0;
episodeSlider.max = 50;
episodeSlider.value = 25; // Default to 25 episodes

const form = document.querySelector('.questionnaire form');
form.appendChild(genreSelect);
form.appendChild(document.createElement('br'));
form.appendChild(document.createTextNode('Duration (minutes):'));
form.appendChild(durationSlider);
form.appendChild(document.createElement('br'));
form.appendChild(document.createTextNode('Number of Episodes:'));
form.appendChild(episodeSlider);
