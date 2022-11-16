//setup
var c = document.createElement("canvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
document.body.appendChild(c);
var ctx = c.getContext("2d");


var pts = [];
while (pts.length < 254) {
    while (pts.includes(val = Math.floor(Math.random() * 255)));
    pts.push(val);
}

pts.push(pts[0]);


var lerp = (a, b, t) => a + (b - a) * (1 - Math.cos(t * Math.PI)) / 2;




var noise = x => {
    x = x * 0.01 % 254;
    return lerp(pts[Math.floor(x)], pts[Math.ceil(x)], x - Math.floor(x));
}







//init
var bgcolor = "#ff4301";
var foreColor = "#4a3f35";
var lineColor = "#2f2519";
var linewidth = 5;
var offset = -10;
var yRatio = .4;
var t = 0;
var speed = 0;
var playing = true;

//araç
var player = new function () {
    this.x = c.width / 2;
    this.y = 50;
    this.truck = new Image();
    this.truck.src = "g.png";
    this.rot = 0;
    this.ySpeed = 0;
     this.rSpeed = 0;

     //interface
     this.startBtn = new Image();
     this.startBtn.src = "baslatt.svg";



     this.draw = function(){

        var p1 = (c.height * .9) - noise(this.x + t) * yRatio;
        var p2 = (c.height * .9) - noise(this.x + t + 5) * yRatio;
         var gnd = 0;
        var offlset = 38;

      if(p1 - offlset > this.y){
      this.ySpeed += 0.1;
      }else{
        this.ySpeed -= this.y - (p1 - 40);
        this.y = p1 - 40;
        gnd = .1;

      }
     if(playing || gnd && Math.abs(this.rot) > Math.PI * .5){
        playing = false;
        this.rSpeed = 1;
        this.x -= speed * 5;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "32px Impact";
        ctx.fillStyle = "white";
        ctx.fillText("OYUN BİTTİ", c.width / 2, c.height / 3);
        ctx.drawImage(this.startBtn,0,0,50,50);
     }





  
      var angle = Math.atan2((p2 - offset) - this.y, (this.x + 5) - this.x);
      if(gnd && playing){
        this.rot -= (this.rot - angle) * 0.5;
        this.rSpeed = this.rSpeed - (angle - this.rot);
      }
      
     this.rot -= this.rSpeed * 0.1;
     if(this.rot > Math.PI) this.rot = -Math.PI;
     if(this.rot < -Math.PI) this.rot = Math.PI;


       this.y += this.ySpeed;
        ctx.save();
      ctx.translate(this.x,this.y);
      ctx.rotate(this.rot);
     ctx.drawImage(this.truck,-40,-40,80,80);
     ctx.restore();

     }

}




//draw 
function draw() {
    speed -= (speed - 1) * 0.01;
    t += 5 * speed;

//arka plan renk
    ctx.fillStyle = bgcolor;
    ctx.fillRect(0, 0, c.width, c.height);
//player
    player.draw();

    //ground
    ctx.fillStyle = foreColor;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = linewidth;
    ctx.beginPath();
    ctx.moveTo(offset, c.height - offset);
    for (let i = offset; i < c.width - offset; ++i) {
        ctx.lineTo(i, (c.height * .9) - noise(i + t) * yRatio);
    }

    ctx.lineTo(c.width - offset, c.height - offset)
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    requestAnimationFrame(draw);

    
}


draw();

