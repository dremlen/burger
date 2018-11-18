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

close.addEventListener('click', function(){
  mobMenu.style.display = 'none';
});