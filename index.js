

function getRandomImages(num) {
  fetch(`https://dog.ceo/api/breeds/image/random/${num}`)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson, 'random'))
    .catch(error => console.log(error.message));
}

function getBreedImage(breed) {
  fetch(`https://dog.ceo/api/breed/${breed.toLowerCase()}/images/random`)
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.status === 'error') {
        displayResults(breed, 'not found');
      } else {
        displayResults(responseJson, 'breed')
      }
    })
    .catch(error => {
      console.log('No breed', error.message);
    });
}

function generateNotFound(breed) {
  return `<h2>${breed} not found</h2>`;
}

function generateRandomResults(dogs) {
  return dogs.reduce((dogImages, dog) =>
    dogImages += `<img src="${dog}">`, '');
}

function generateBreedResults(breed) {
  return `<img src="${breed}">`;
}

function displayResults(response, type) {
  let dogImagesHTML = '';
  if (type === 'random') {
    dogImagesHTML = generateRandomResults(response.message);
  } else if (type === 'breed') {
    dogImagesHTML = generateBreedResults(response.message);
  } else if (type === 'not found') {
    dogImagesHTML = generateNotFound(response);
  }
  $('section.results').html(dogImagesHTML);
  //display the results section
  $('.results').removeClass('hidden');
}

function watchRandomForm() {
  $('form.js-random').submit(event => {
    event.preventDefault();
    let num = $('input#num-dogs').val();
    getRandomImages(num);
  });
}

function watchBreedForm() {
  $('form.js-breed').submit(event => {
    event.preventDefault();
    let breed = $('input#breed').val();
    getBreedImage(breed);
  });
}

$(function () {
  console.log('App loaded! Waiting for submit!');
  watchRandomForm();
  watchBreedForm();
});