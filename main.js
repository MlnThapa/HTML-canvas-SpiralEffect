const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height=window.innerHeight;

const mouse = {
    x:innerWidth/2,
    y:innerHeight/2
}

//For colors
const colors =['#2d3a54','#5a4894','#a950a1','#ff7cae','#043353','#18A4e0','#d3dde6'];


addEventListener('mousemove',event=>{
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

addEventListener('resize',event =>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
})

function randomIntFromRange(min,max){
    return Math.floor(Math.random() * (max-min+1)+min);
}

function randomColor(colors){
    return colors[Math.floor(Math.random()*colors.length)];
}

function Particle(x,y,radius,color){
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.color=color;
    this.radians=Math.random()*Math.PI*2;
    this.velocity=0.05;
    this.distanceFromCenter=randomIntFromRange(50,120);
    this.lastMouse={x:x,y:y};


    this.update=()=>{
        //move this point over time
        const lastPoint={x:this.x,
        y:this.y}
        this.radians+=this.velocity;
        

        //drag Effect
        this.lastMouse.x+=(mouse.x-this.lastMouse.x)*0.05;
        this.lastMouse.y+=(mouse.y-this.lastMouse.y)*0.05;
        
        
        //mouse movement
        this.x=this.lastMouse.x+Math.cos(this.radians)*this.distanceFromCenter;
        this.y= this.lastMouse.y+Math.sin(this.radians)*this.distanceFromCenter;
        this.draw(lastPoint);
    };

    this.draw = (lastPoint)=>{
        c.beginPath();
        c.strokeStyle=this.color;
        c.lineWidth=this.radius;
        c.moveTo(lastPoint.x,lastPoint.y);
        c.lineTo(this.x,this.y);
        c.stroke();
        c.closePath();
    }
}

let particles;
function init(){
    particles=[];
    for(let i=0;i<100;i++){
        const radius = (Math.random()*2) +1;
        particles.push(new Particle(canvas.width/2,canvas.height/2,radius,randomColor(colors)));
    }
}


function animate(){
    requestAnimationFrame(animate);
    c.fillStyle='rgba(255,255,255,0.05)';
    c.fillRect(0,0,canvas.width,canvas.height);

    particles.forEach(particle=>{
        particle.update();
    })
}

init();
animate();