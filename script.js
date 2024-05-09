const form = document.getElementById('smoothieForm');

function Smoothie(size, base, ingridients, customerName ) {
  this.size = size;
  this.base = base;
  this.ingridients = ingridients;
  this.customerName = customerName;

  // Function to show completed order to customer
  this.description = function () {
    let description = `Thank you, ${this.customerName}! You ordered ${this.size} ${this.base}-based smoothie with `;
    for (let i = 0; i < this.ingridients.length; i++) {
      if (i === this.ingridients.length - 1) {
        description += this.ingridients[i] + '.';
      } else {
        description += this.ingridients[i] + ', ';
      }
    }
    return description;
  };
}

function showSmoothieImage(ingredients) {
  // Define the base path for the images
  const basePath = 'images/';
  let imageName = 'hero'; // Default image
  
  // Check for ingredients based on the color priority
  if (ingredients.includes('Cocoa')) {
    imageName = 'cocoa';
  } else if (ingredients.includes('Blueberries')) {
    imageName = 'blueberries';
  } else if (ingredients.includes('Kiwi')) {
    imageName = 'kiwi';
  } else if (ingredients.includes('Strawberries')) {
    imageName = 'strawberries';
  } else if (ingredients.includes('Mango')) {
    imageName = 'mango';
  } else if (ingredients.includes('Pineapples')) {
    imageName = 'pineapples';
  } else{
    imageName = 'bananas';
  }

  // Update the src attribute of the image element to display the selected smoothie image
  document.getElementById('smoothieImage').src = basePath + imageName + '.jpg';
}



function onSubmit(e) {
  e.preventDefault();

  // Get value from radio buttons
  const sizeElement = document.querySelector('input[name="size"]:checked');
  let size = '';
  if (sizeElement) {
    size = sizeElement.value;
  } 

  // Get value from array
  const ingridients = [];
  var checkedValues = document.querySelectorAll('.ingridients:checked');

  for (let i=0; i<checkedValues.length; i++) {
    ingridients.push(checkedValues[i].value);
  }

  // Get value with .value
  const base = document.getElementById('bases').value;

  const quantity = document.getElementById('quantity').value;

  const name = document.getElementById('name').value;

  const phone = document.getElementById('phone').value;

  if (base === '' || ingridients.length === 0 || size === '' || quantity === '' || name === '' || phone === '') {
    alert('Please fill in all fields');
    return;
  }

  const newDrink = new Smoothie(size, base, ingridients, name);

  const description = document.getElementById('description');
  description.innerHTML = newDrink.description();

  console.log(size, base, ingridients, quantity, name, phone);

  showSmoothieImage(ingridients);

  blink();
}

form.addEventListener('submit', onSubmit);

// Function to get attention, that order is completed (instead of pop-up window)
function blink() {
  var f = document.getElementById('description');
  var count = 0; 
  var interval = 1500; 

  
  var intervalId = setInterval(function() {
    f.style.visibility = (f.style.visibility == 'hidden' ? '' : 'hidden');
    count++; 
    if (count >= 10) { 
      clearInterval(intervalId);
      f.style.visibility = ''; // Make sure the element is visible after the last blink
    }
  }, interval);
}