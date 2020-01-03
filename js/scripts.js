const body = document.querySelector('body');
const gallery = document.getElementById('gallery');
const modalDiv = document.createElement('div');


function fetchData(url) {
    return fetch(url)
        .then(data => data.json())
        .catch(error => console.log('There is a problem: ', error))
};


fetchData('https://randomuser.me/api/?results=12&nat=us')
    .then(data => data.results)
    .then(people => generatePage(people))


function generatePage(people) {
    createGallery(people);
    createModal(people);
    hideModals();
    eventListner();
};


function createGallery(people) {
    let html = ''
    for (let person of people) {
        html += `
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src=${person.picture.large} alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                    <p class="card-text">${person.email}</p>
                    <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
                </div>
            </div>
    `
    };
    gallery.innerHTML = html;
};


function createModal(people) {
    let html = ''
    for (let person of people) {
        html += `
            <div class="modal-container">    
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src=${person.picture.large} alt="profile picture">
                        <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
                        <p class="modal-text">${person.email}</p>
                        <p class="modal-text cap">${person.location.city}</p>
                        <hr>
                        <p class="modal-text">${person.cell}</p>
                        <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
                        <p class="modal-text">Birthday: ${person.dob.date.substring(5, 10)}</p>
                    </div>
                </div>
            
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
        `
    }
    modalDiv.innerHTML = html;
    body.appendChild(modalDiv);
};


function hideModals() {
    Array.from(modalDiv.children).forEach(modal => modal.style.display = 'none');
};

function eventListner() {
    const cardArray = Array.from(gallery.children);
    const modalArray = Array.from(modalDiv.children);

    const firstPrev = modalArray[0].getElementsByClassName('modal-prev btn')[0];
    const lastNext = modalArray[modalArray.length - 1].getElementsByClassName('modal-next btn')[0];

    disableButton(firstPrev);
    disableButton(lastNext);

    cardArray.forEach((card, i) => {
        card.addEventListener('click', () => {
            modalArray[i].style.display = 'block';
        })
    });

    modalArray.forEach(modal => {
        modal.addEventListener('click', () => {

            if (event.target.textContent === 'X' || event.target.className === 'modal-container') {
                modal.style.display = 'none';

            } else if (event.target.id === "modal-prev") {
                modal.style.display = 'none';
                modal.previousElementSibling.style.display = 'block';

            } else if (event.target.id === "modal-next") {
                modal.style.display = 'none';
                modal.nextElementSibling.style.display = 'block'
            }
        })
    })

}


function disableButton(button) {
    button.disabled = true;
    button.style.backgroundColor = 'grey';
    button.style.color = 'black'
}