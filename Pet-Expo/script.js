//adding event listeners to the card in  the index.html page
document.addEventListener('DOMContentLoaded',() => {
    const petTypeCard = document.querySelectorAll ('#pets .card');

//getting the type of pet from the card click 
    petTypeCard.forEach(card => {
        card.addEventListener('click', () => {
            const petType = card.getAttribute('data-type');
            window.location.href = `gallery.html?type=${petType}`;
        });
    });
});

//fetching API data to be shown in the gallery page as well as the popup modal and implementing the search bar
document.addEventListener('DOMContentLoaded', () =>{
    const petCardsContainer = document.getElementById('pet-cards');
    const petModal = document.getElementById('petModal');
    const modalContent = document.getElementById('modal-details');
    const modalClose = document.querySelector('.close');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');


    if(petCardsContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const petType = urlParams.get('type');
        if(petType) {
            fetchPets(petType);
        }
    }

    function fetchPets(type) {
        let apiURL;

        switch(type) {
            case 'dogs' :
                apiURL = 'https://freetestapi.com/api/v1/dogs';
                break;
            
            case 'cats':
                apiURL = 'https://freetestapi.com/api/v1/cats';
                break;
            
            case 'birds':
                apiURL = 'https://freetestapi.com/api/v1/birds';
                break;

            default:
                console.error('Unknown pet type:', type);
                return;
        }

        fetch(apiURL)
        .then(response => response.json())
        .then(data => displayPets(data))
        .catch(error => console.error('Error fetching pets:', error));
    }

    //displaying the pet's data in form of cards
    function displayPets(pets){
        petCardsContainer.innerHTML = '';
        pets.forEach(pet => {
            const petCard = document.createElement('div');
            petCard.className = 'pet-card';
            petCard.innerHTML = `
            <img src= "${pet.image}" alt="${pet.name}">
            <h2>${pet.name}</h2>
            <p>Origin: ${pet.origin}</p>
            `;
            petCard.addEventListener('click', () => openModal(pet));
            petCardsContainer.appendChild(petCard);
        });
    }

    //creating the popup modal for each of the cards
    function openModal(pet){
        modalContent.innerHTML = `
            <img src= "${pet.image}" alt="${pet.name}">
            <h2>${pet.name}</h2>
            <p>Origin: ${pet.origin}</p>
        `;

        for (const [key, value] of Object.entries(pet)) {
            if (key !== 'image' && key !=='name' && key !=='origin'){
                modalContent.innerHTML += `<p><strong>${key.charAt(0).toUpperCase()+ key.slice(1)}</strong> ${value}</p>`;
            }
        }
    
        petModal.style.display='flex';
    }
    

        modalClose.addEventListener('click', ()=>{
            petModal.style.display = 'none';
        });

    window.addEventListener('click', (event) =>{
        if(event.target == petModal){
            petModal.style.display = 'none';
        }
    });

    searchButton.addEventListener('click', ()=>{
        const searchTerm = searchInput.value.trim().toLowerCase();
        if(searchTerm !== ''){
            filterPets(searchTerm);
        }
    });

    function filterPets(searchTerm){
        const petCards = document.querySelectorAll('.pet-card');
        petCards.forEach(card => {
            const petName = card.querySelector('h2').textContent.toLowerCase();
            if(petName.includes(searchTerm)){
                card.style.display= 'block';
            }else{
                card.style.display = 'none';
            }
        });
    }

});

