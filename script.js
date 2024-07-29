
const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  // Your form handling logic here (see next step)
  
const formData = new FormData(form);

fetch(form.action, {
  method: "POST",
  body: formData
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch(error => {
  console.error('Error:', error);
});
});
