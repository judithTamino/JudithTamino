const ratingItem = document.querySelectorAll('.rating__item');
let rating;

for(let i = 0; i < ratingItem.length; i++) {
  ratingItem[i].addEventListener('click', () => {
    rating = ratingItem[i].innerHTML; 
    let item = ratingItem[0]; 

    while(item) {
      if(item.tagName === 'LI')
        item.classList.remove('rating__item-active');
  
      item = item.nextSibling;
    }
    ratingItem[i].classList.add('rating__item-active')
  });
}

const submitButton = document.querySelector('.rating__btn');
const userRatind = document.querySelector('.rate');
const ratingSection = document.querySelector('.rating');
const thankSection = document.querySelector('.thank');

submitButton.addEventListener('click', () => {
  
  if (rating === undefined)
    alert("please choose rating");
  else {
    ratingSection.classList.add('hidden');
    thankSection.classList.remove('hidden');

    userRatind.innerHTML = rating;
  }  
});