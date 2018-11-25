// Команда
const accName = document.querySelectorAll('.accordeon__name');
const accItem = document.querySelectorAll('.accordeon__item');
const activ = 'accordeon__item--activ';

for(i=0; i<accName.length; i++){
  accName[i].addEventListener('click', function(){
    for(i=0; i<accItem.length; i++){
      if (accItem[i].classList.contains(activ)){
        accItem[i].classList.remove(activ);
      }     
      this.parentNode.classList.add(activ);
      }
    }   
  )
};


// Мобильное меню

const menuLink = document.querySelector('.hamburger-menu-link');
const mobMenu  = document.querySelector('.mobail');
const close    = document.querySelector('.mobail__closing');

menuLink.addEventListener('click', function(event){
  event.preventDefault();
  mobMenu.style.display = 'block';
});

close.addEventListener('click', function(event){
  event.preventDefault();
  mobMenu.style.display = 'none';
});


// Меню 

const mItem = document.querySelectorAll('.menu__item');
const mName = document.querySelectorAll('.menu__name');
const mActiv = 'menu__item--active';

for(i=0; i<mName.length; i++){
  mName[i].addEventListener('click', function(){
    for(n=0; n<mItem.length; n++){
      if (mItem[n].classList.contains(mActiv)){
        mItem[n].classList.remove(mActiv);
      }
      this.parentNode.classList.add(mActiv);
    }
  });
}

// карта

ymaps.ready(init);

function init(){
  var map = new ymaps.Map('map',{
    center:[59.94, 30.32],
    zoom: 12,
    controls:['zoomControl'],
    behaviors:['drag']
  });
}

// Слайдер

const left = document.querySelector('.slaider__scrool-left');
const right = document.querySelector('.slaider__scrool-reght');
const slaids = document.querySelector('.slaider__list');
const minRight = 0;
const maxRight = 400;
const step = 100;
let currentRight = 0;  

slaids.style.right= currentRight;

right.addEventListener('click', function(e){
  e.preventDefault();
  if(currentRight<maxRight){
     currentRight +=step; 
  }
  else{
    currentRight = 0;
    slaids.style.right = 0;
  }
  slaids.style.right = currentRight + "vw";
});

left.addEventListener('click', function(e){
  e.preventDefault();
  if(currentRight > minRight){
    currentRight -=step;
  }
  else{
    currentRight = maxRight;
  }
  slaids.style.right = currentRight + "vw";
});


// Отправка формы

const form = document.querySelector('.form');
const orderBtn = document.querySelector('.form__btn');

orderBtn.addEventListener('click', function(event){
  event.preventDefault();

  if(validateFofm(form)){
    const data = {
      name:form.elements.name.value,
      tel:form.elements.tel.value,
      street: form.elements.street.value,
      house: form.elements.house.value,
      housing: form.elements.housing.value,
      room: form.elements.room.value,
      floor: form.elements.floor.value,
      comment: form.elements.comment.value
    };
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.send(JSON.stringify(data));
    xhr.addEventListener('load', function(){
      const modalForm = document.querySelector('.modal');
      const modBtn = document.querySelector('.modal__btn');
      modalForm.style.display ='flex';
      modBtn.addEventListener('click', function(event){
        event.preventDefault();
        modalForm.style.display = 'none';
      }) 
       });
    }
});

function validateFofm(form){
  let valid = true;

  if(!validateFild(form.elements.name)){
    valid = false;
  }
  if(!validateFild(form.elements.tel)){
    valid = false;
  }
  if(!validateFild(form.elements.street)){
    valid = false;
  }
  if(!validateFild(form.elements.house)){
    valid = false;
  }
  if(!validateFild(form.elements.room)){
    valid = false;
  }
  return valid;
}
function validateFild(blocks){
  if(!blocks.checkValidity()){
    blocks.nextElementSibling.textContent = blocks.validationMessage;
    return false;
  }
    else{
      blocks.nextElementSibling.textContent = '';
      return true;
    }
}