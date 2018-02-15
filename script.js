var canvas  = document.querySelector('.c1');
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var density = 1;
var snowArray = [];
var wind = {
  speed: 0,
  currentSpeed: 0,
  stableSteps: 0,
  step: 0,
  stepsToChange: 0,
};
 


window.onresize = function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function Snow(){
  this.x = Math.random()*canvas.width;
  this.y = -20;
  this.air = Math.random();
  this.size = (25*this.air+15).toFixed(0) + 'px';
  this.color = 'rgba(255,255,255,' + (this.air + 0.1) + ')';
  this.speed = this.air*2+0.3;

  if (Math.random()<0.2){
    this.fontType = 'Calibri';
  }
  else if (Math.random()>0.6) {
    this.fontType = 'Times New Roman';          
  }
  else {
    this.fontType = 'Arial';          
  }

  //appearance wind 
  if (Math.random()<0.3) {
    if (wind.currentSpeed>0.5){
      this.x = -20;
      this.y = Math.random()*canvas.height;
    } else if(wind.currentSpeed<(-0.5)){
      this.x = canvas.width+20;
      this.y = Math.random()*canvas.height;      
    }
  }

  //randomSnowFlake
  if(Math.random()<0.05){
    this.speed = Math.random()*3+2;
  }
}



function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='#161a36';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  for(var i in snowArray){
    snowArray[i].x = snowArray[i].x + wind.currentSpeed*snowArray[i].speed;
    snowArray[i].y = snowArray[i].y + snowArray[i].speed;
    ctx.beginPath();
    ctx.fillStyle = snowArray[i].color;
    ctx.font = snowArray[i].size +' '+ snowArray[i].fontType;
    ctx.fillText('*',snowArray[i].x,snowArray[i].y);
    //ctx.fillRect(snowArray[i].x,snowArray[i].y,5,5);
  }  
  for(var i in snowArray){
    if(snowArray[i].y-20>canvas.height){
      snowArray.splice(i,1);
    }
  }
}


function windChange(){
  if(Math.random()<0.001 && wind.stepsToChange==0){
    wind.speed=Math.random() * 10 - 5;
    wind.stepsToChange = Math.round(Math.random() * 300 + 50);
    wind.step = (wind.speed-wind.currentSpeed)/wind.stepsToChange;
  }
  if(wind.stepsToChange>0){
    wind.currentSpeed = wind.currentSpeed+wind.step;
    wind.stepsToChange--;
  }
}

 setInterval(function(){
  if(Math.random()>0.1){
    for(var i = 0; i<density; i++){
      snowArray.push(new Snow());
    }
  }
  windChange();
  requestAnimationFrame(draw);
},20);
