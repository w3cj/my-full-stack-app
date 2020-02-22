console.log('hello world!');
const messagesElement = document.querySelector('#messages');
const form = document.querySelector('form');
const loadingImage = document.querySelector('img');

loadingImage.style.display = 'none'; // hide the image when the page loads
console.log(form);

async function formSubmitted(event) {
    event.preventDefault();
    form.style.display = 'none';
    loadingImage.style.display = 'block';
    console.log('the form was submitted!')
    const formData = new FormData(form);
    const name = formData.get('name');
    console.log(name);
    const content = formData.get('content');
    console.log(content);
    const message = {
        name,
        content
    };
    const url = 'http://localhost:5000/create';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(message),
    });
    const json = await response.json();
    console.log(json);
    form.style.display = 'block'; // show the form
    loadingImage.style.display = 'none'; // show the image
    listMessages();
}
form.addEventListener('submit', formSubmitted);

async function listMessages() {
    messagesElement.innerHTML = ''; // Clear the existing messages
    loadingImage.style.display = 'block'; // show the loading image
    const url = 'http://localhost:5000/list';
    const response = await fetch(url);
    const messages = await response.json();
    for (let i = 0; i < messages.length; i++) {
        const message = messages[i];
        const messageDiv = document.createElement('div');

        const nameElement = document.createElement('h3');
        nameElement.textContent = message.name;
        messageDiv.appendChild(nameElement);

        const contentElement = document.createElement('p');
        contentElement.textContent = message.content;
        messageDiv.appendChild(contentElement);

        messagesElement.appendChild(messageDiv);
    }
    loadingImage.style.display = 'none'; // hide the loading image
}

listMessages();