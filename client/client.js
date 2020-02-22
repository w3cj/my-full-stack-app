console.log('hello world!');
const form = document.querySelector('form');
const loadingImage = document.querySelector('img');
loadingImage.style.display = 'none';
console.log(form);
function formSubmitted(event) {
    event.preventDefault();
    form.style.display = 'none';
    loadingImage.style.display = 'block';
    console.log('the form was submitted!')
    const formData = new FormData(form);
    const name = formData.get('name');
    console.log(name);
    const content = formData.get('content');
    console.log(content);
}
form.addEventListener('submit', formSubmitted);