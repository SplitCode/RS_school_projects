
const apiKey = 'RQVsKWs76wW1DBXgxzf5UrxIdmZ_Zj96y8C2IHrPMwI';

const imageContainer = document.querySelector('.image-container');
const searchInput = document.getElementById('search');
const searchButton = document.querySelector('.searchButton');
const clearSearch = document.querySelector('.clearSearch');

const searchImages = () => {
    const query = searchInput.value.trim();
    if (query !== '') {
        fetchImages(query);
    }
}

const fetchImages = async (query) => {
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&client_id=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error loading images');
        }

        const data = await response.json();
        displayImages(data.results);
    } catch (error) {
        console.error('Error loading images:', error);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const randomQueries = ['nature', 'city', 'animals', 'food', 'travel', 'fox', 'flowers', 'mountaine', 'dogs', 'sport', 'cats', 'random', 'winter', 'autumn', 'spring', 'summer', 'cars'];
    const randomIndex = Math.floor(Math.random() * randomQueries.length);
    const randomQuery = randomQueries[randomIndex];
    fetchImages(randomQuery);
    // fetchImages('random');
    searchInput.focus();
});

searchInput.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        searchImages();
    }
})

searchButton.addEventListener('click', searchImages);


//-----------------default clear search--------------------
// clearSearch.addEventListener('click', )


const displayImages = (images) => {
    imageContainer.innerHTML = '';

    images.forEach((image) => {
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('image');
        const img = document.createElement('img');
        img.src = image.urls.small;
        img.alt = image.alt_description;
        img.style.width = '380px';
        img.style.height = '257px';

        imageDiv.appendChild(img);
        imageContainer.appendChild(imageDiv);
    });
}




