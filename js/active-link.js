window.onload = function(){
  let nav__links = document.querySelectorAll('.nav__link');
  for (let i = 0; i < nav__links.length; ++i)
      if (nav__links[i].href === window.location.href) 
          nav__links[i].className += ' active';
};