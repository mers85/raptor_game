$(document).ready(function() {
  jumping = false;
  raptor = $(".raptor");
  raptor.css({top: '563px', left: '12px' });

  newCactus();
  cactusInterval = setInterval(moveCactus, 3000)
  $lives = 5;

  $score = 500;

  $( document ).keydown(function(e) {

    if (e.which == 38){
      if (jumping === true){
        return false;
      } else{
        jump();
      }
    } else if (e.which == 39){
      raptorGoForward();
    }else if (e.which == 37){
      raptorGoBack();
    }

  });

  var jumpHeight = 200;
  function jump() {
    jumping = true;
    y = parseInt(raptor.css('top'));
    $(raptor).stop().animate({'top':parseInt(y)-jumpHeight+"px"},100,function(){
      $(raptor).stop().animate({'top': y +"px"}, 800, function(){
        jumping = false;
      });
    });
  }

  function updateLives(){
    for (var i = 0; i < $lives; i++){
      var life = $("<img id='lives' src='img/lives_img.gif'>");
      $(".livesUbuntu p").append(life);
    }
  }

  function raptorGoForward(){
    var speed = 10;
    var left = parseInt(raptor.css('left'));
    raptor.css('left', (left + speed)+ "px");
  }

  function raptorGoBack(){
    var speed = 10;
    var left = parseInt(raptor.css('left'));
    raptor.css('left', (left - speed)+ "px");
  }

});


function moveCactus(){
  $(".cactus").each(function(i, obj){
    var cac = $(obj);
    var speed = 2400;
    var left = parseInt(cac.css("left"));
    cac.css("left", (left - speed) + "px");
  })
  newCactus();
}

function newCactus() {
  var cac = $("<div  class='cactus'><img src='img/cactus.png'></div>");
  var cacPosition = cac.css( {top: '563px', left: '2200px' });
  $("body").append(cacPosition);
  var checkCollision = setInterval(function(){collision(cac)}, 500);
  var checkInterval = setInterval(function(){ checkCactus(checkCollision, cac, checkInterval); }, 500)
}

function checkCactus(checkCollision, cac, checkInterval){

  if (cac.position().left <= 12){
    cac.remove();
    clearInterval(checkCollision);
    clearInterval(checkInterval);
  }

  if (collision(cac)){
    $lives -= 1
    console.log($lives);
    clearInterval(checkInterval);
    clearInterval(checkCollision);
  }

  if ($lives === 0){
    clearInterval(cactusInterval);
    console.log('Game Over');
  }

  sumScore(cac);
}

function sumScore(cac){
  if (collision(cac)){
    $score -= 100;
  } else if (($lives > 0) && (jumping === true) && ($(".raptor").get(0).getBoundingClientRect().right > cac.get(0).getBoundingClientRect().left) && ($(".raptor").get(0).getBoundingClientRect().bottom > cac.get(0).getBoundingClientRect().top)) {
    $score += 100;
  }
  $('#score').text($score);
}



function collision(cactus){
  var cactus = cactus.get(0).getBoundingClientRect();
  var raptor = $(".raptor").get(0).getBoundingClientRect();

  if ( (raptor.left <= cactus.left) && ((raptor.right >= cactus.left)) && (raptor.bottom >= cactus.top) ){
    console.log('collision');
    return true;
  }

}
