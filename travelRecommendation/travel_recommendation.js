function navigateTo(targetView) {
    document.getElementById('home-view').classList.add('hidden');
    document.getElementById('results-view').classList.add('hidden');
    document.getElementById('about-view').classList.add('hidden');
    document.getElementById('contact-view').classList.add('hidden');
    const searchWrapper = document.getElementById('search-wrapper');

    if (targetView === 'home') {
        document.getElementById('home-view').classList.remove('hidden');
        document.getElementById('results-view').classList.remove('hidden');
        searchWrapper.classList.remove('hidden');
    } else {
        document.getElementById(`${targetView}-view`).classList.remove('hidden');
        searchWrapper.classList.add('hidden');
    }
}

function executeSearch() {
    const query = document.getElementById('search-input').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('results-container');
    const resultsTitle = document.getElementById('results-title');
    resultsContainer.innerHTML = '';
    resultsTitle.style.display = 'none';

    if (!query) return;

    fetch('travel_recommendation_api.json')
        .then(res => res.json())
        .then(data => {
            let matchedItems = [];
            if (query === 'beach' || query === 'beaches') {
                matchedItems = data.beaches;
            } else if (query === 'temple' || query === 'temples') {
                matchedItems = data.temples;
            } else if (query === 'country' || query === 'countries') {
                data.countries.forEach(c => matchedItems.push(...c.cities));
            }

            if (matchedItems.length > 0) {
                resultsTitle.style.display = 'block';
                matchedItems.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'result-card';
                    card.innerHTML = `
                        <img src="${item.imageUrl}" alt="${item.name}">
                        <div class="result-card-body">
                            <h3>${item.name}</h3>
                            <p>${item.description}</p>
                        </div>
                    `;
                    resultsContainer.appendChild(card);
                });
            } else {
                resultsTitle.style.display = 'block';
                resultsContainer.innerHTML = `<p style="color: #ff9100;">No items found. Try searching beach, temple, or country.</p>`;
            }
        });
}

function clearFields() {
    document.getElementById('search-input').value = '';
    document.getElementById('results-container').innerHTML = '';
    document.getElementById('results-title').style.display = 'none';
}

document.getElementById('btnSearch').addEventListener('click', executeSearch);
document.getElementById('btnClear').addEventListener('click', clearFields);