// Команда
$(function(){
  const accordItems = $('.accordeon__item');
  const accordName = $('.accordeon__name');
  const activ = 'accordeon__item--activ';

  accordName.on('click', function(){
    let clickName = $(this).closest(accordItems);
    if(clickName.hasClass(activ)){
      clickName.removeClass(activ);
    }
      else{
        clickName.addClass(activ).siblings().removeClass(activ);
      }
  })
});

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

$(function(){
  const mItem = $('.menu__item');
  const mName = $('.menu__name');
  const mActiv = 'menu__item--active';

  mName.on('click', function(){
    let mClick = $(this).closest(mItem);
    if(mClick.hasClass(mActiv)){
      mClick.removeClass(mActiv);
    }
      else{
        mClick.addClass(mActiv).siblings().removeClass(mActiv);
      }
  })
});


// карта

ymaps.ready(init);

  var placemarks = [
    {
      latitude: 59.97,
      longitude: 30.31,
      hintContent: '<div class="map__hint">ул. Литераторов, д. 19</div>',
      balloonContent: [
        '<div class="map__balloon">',
        '<img class="map__img" src="img/elements/map-marker.png" alt="Бургер"/>',
        'Самые вкусные бургеры у нас!',
        '</div>'
      ]
    },
    {
      latitude: 59.94,
      longitude: 30.25,
      hintContent: '<div class="map__hint">Малый проспект В О, д 64</div>',
      balloonContent: [
        '<div class="map__balloon">',
        '<img class="map__img" src="img/elements/map-marker.png" alt="Бургер"/>',
        'Самые вкусные бургеры у нас!',
        '</div>'
      ]
    },
    {
      latitude: 59.93,
      longitude: 30.34,
      hintContent: '<div class="map__hint">наб. реки Фонтанки, д. 56</div>',
      balloonContent: [
        '<div class="map__balloon">',
        '<img class="map__img" src="img/elements/map-marker.png" alt="Бургер"/>',
        'Самые вкусные бургеры у нас!',
        '</div>'
      ]
    },
    {
      latitude: 59.92,
      longitude: 30.50,
      hintContent: '<div class="map__hint">ул. Лопатина, д. 48</div>',
      balloonContent: [
        '<div class="map__balloon">',
        '<img class="map__img" src="img/elements/map-marker.png" alt="Бургер"/>',
        'Самые вкусные бургеры у нас!',
        '</div>'
      ]
    }
  ],
    geoObjects = [];

  function init() {
    var map = new ymaps.Map('map', {
      center: [59.94, 30.32],
      zoom: 12,
      controls: ['zoomControl'],
      behaviors: ['drag']
    });

  for (var i = 0; i < placemarks.length; i++) {
    geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude],
      {
        hintContent: placemarks[i].hintContent,
        balloonContent: placemarks[i].balloonContent.join('')
      },
      {
        iconLayout: 'default#image',
        iconImageHref: 'img/elements/map-marker.png',
        iconImageSize: [46, 57],
        iconImageOffset: [-23, -57],
        iconImageClipRect: [[415, 0], [461, 57]]
      });
  }
    var clusterer = new ymaps.Clusterer({
      clusterIcons: [
        {
          href: 'img/elements/map-marker.png',
          size: [100, 100],
          offset: [-50, -50]
        }
      ],
      clusterIconContentLayout: null
    });

    map.geoObjects.add(clusterer);
    clusterer.add(geoObjects);
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

$(function(){
  const compil = $('.compile');
  const composit = $('.composit');

  compil.on('click', function(e){
    e.preventDefault();
    var clickCompil = $(this).children(composit).last(); 
    if(clickCompil.css('display') == 'none'){
      clickCompil.css('display', 'block');
    }
    else{
      clickCompil.css('display', 'none');
    }
  });
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

// Модалка комментария
$(function(){
  const comBtn = $('.comment__btn');
  const comItem = $('.comment__item');
  const nohover = $('.nohover');
  const modalCom = $('.modalcom');
  const modalClose = $('.modalcom__closing');
  const elem = $('.comment__list');

  comBtn.on('click', function(event){
    event.preventDefault();
    var modal = $(this).parent().last().siblings().css('display', 'flex');
    if(modal.css('display') == 'flex'){
      comItem.addClass('nohover').removeClass('comment__item');
    }
  })

  modalClose.on('click', function(event){
    event.preventDefault();
    modalCom.css('display', 'none');

        if (modalCom.css('display') == 'none'){
          
       elem.children().addClass('comment__item').removeClass('nohover');

    }
  })
});
