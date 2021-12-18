$(document).ready(function() { 
  $("body").css("display", "none"); /** body (здесь и далее) означает, что эффект применяется ко всей странице. Можно изменить на идентификаторы любых элементов (#content, .comments и т.д.) */ 

  $("body").fadeIn(500); /** время появления в миллисекундах */ 
   
  $("a.nav__link").click(function(event){ /** a.nav__link означает, что данное решение будет работать только при нажатии на ссылки с классом (class) "nav__link" (можно изменить на свой) */ 
  event.preventDefault(); 
  linkLocation = this.href; 
  $("body").fadeOut(500, redirectPage); /** время изчезания в миллисекундах */ 
  }); 

  function redirectPage() { 
  window.location = linkLocation; 
  } 
  }); 