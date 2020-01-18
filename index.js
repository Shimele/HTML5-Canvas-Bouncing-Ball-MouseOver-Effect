
//*step 1- creating and resizing a canvas
let canvas = document.querySelector("canvas");//select canvas from html
canvas.width = window.innerWidth;//set canvas width to equal window width
canvas.height= window.innerHeight;//set canvas height to equal window height
//to draw 2d objects in canvas, we need a 2d drawing space
let context = canvas.getContext("2d")
/*
//*step -2 drawing elements in the canvas
        //three main objects we can draw in a canvas
        //rectangles, arcs and lines
    //a) draw a rectangle
        //context.fillRect(x,y,width,height)//this draws a rectangle in canvas
        context.fillRect(100,100,100,100)//set x cordinate to 100px from the left of the screen
        //set y cord to 100px from top of screen.
        //set width and height to 100px respectively

        //playing around with the fillRect method
        context.fillStyle = "rgb(255,0,0,0.5)"//add color to rectangle
        context.fillRect(500,200,100,100)
        context.fillStyle = "rgb(0,0,255,0.5)"//notice rectangle takes color of fillStyle just before its declaration
        context.fillRect(20,250,100,100)
        context.fillRect(100,100,100,100)
        context.fillRect(400,300,100,100)

    //b) draw a line
        context.beginPath() // it says we want to start a path for our drawing
        context.moveTo(300,400)//points to where our drawing starts. Takes an x and y cordinate
        context.lineTo(100,20)//indicates direction our line will take. also takes an x and y cord.
        context.lineTo(300,200)
        context.strokeStyle = "#fa34a3"//add color to line
        context.stroke()//finally call a strock method for line to show
        //we can have multiple lineTo methods to keeps drawing lines across

    //c) draw an arc/circle
        //arc takes anumber of arguments(x-cord, y-cord, radius(size of circle), 
        //startAngle(angle to start drawing), endAngle(how long the circle would go on for),
        // anticlockwise?: boolean(true or false if circle should be drawn anti clock wise))
        context.beginPath();
        context.arc(320,300,50,0,Math.PI*2,false) //Math.PI*2 makes it go all d way round 360 degrees
        context.strokeStyle = "blue" //give color to circle line
        context.stroke()// for line to show
        //how to create multiple arc/circle using forloops
        for(let i = 0; i < 5; i++){
            let x = Math.random() * window.innerWidth; //give x coord a random value from 0 to the full width of window
            let y = Math.random() * window.innerHeight; //give y corrd a random value fom 0 to the full height of window
            context.beginPath();
            context.arc(x,y,50,0,Math.PI*2,false) 
            context.strokeStyle = "rgb(" + (Math.random() * 256) + "," + (Math.random() * 256) + "," + (Math.random() * 256); ")" //random rgb color
            context.stroke()
        }
*/

//*step -4 interract with canvas element

    //here we want to make balls that come in contact with mouse(cursor) grow in size

    //creat object to hold x and y coordinate of mouse
    let mouse = {
        x: undefined,
        y: undefined,
    }
    let maxRadius = 50;

    let colorArray = [
        "#AF1C74",
        "#2EC4B6",
        "#FF9F1C",
        "#FDFFFC",
    ]
window.addEventListener("mousemove", function(event){
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})


//*step -3 Animating elements

    //creat a circle object or constructor function where we will creat multiple new circle
    //so that each circle will have independent x,y and radius values
function Circle(x, y, radius, speedX, speedY){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.minRadius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
    this.draw = function(){
        context.beginPath();
        context.arc(this.x,this.y, this.radius,0,Math.PI*2,false)
        context.strokeStyle = this.color
        context.stroke()
        //context.fillStyle = this.color
        //context.fill()
    }
    this.update = function(){
    //to make ball bounce back when it touches both walls(x:right and left)
    //we will write a condition, when the x cordinate + radius(representing the right edge of circle)
    //or when the x cordinate - radius(representing the left edge of circle)
    //of ball is greater than or the inner width of screen or less than 0,
    //reverse the speed of the ball with -speed
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
        this.speedX = -this.speedX; //reverse speed of x coord
    }
    if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
        this.speedY = -this.speedY; //same as with X axis above
    }
    this.x += this.speedX //this is going to increase x's coord by speed's value at each loop
    //making the circle move right and left continually
    this.y += this.speedY //this is going to increase Y's coord by speed's value at each loop
    //making the circle move up and down continually
    this.draw()//include draw method in update function

    //add interractivty with mouse
    //if the distance bln cursor and coordinate x of circle is less than 50 and greater than -50
    if(mouse.x - this.x < 70 && mouse.x - this.x > -70 && mouse.y - this.y < 70 && mouse.y - this.y > -70){
        if(this.radius < maxRadius){//also if radius is less than the max radius assigned
            this.radius += 1; //grow radius by 1
        }
    }else if(this.radius > this.minRadius){
        this.radius -= 1;
    }
 }
}

    //creat an instance of Circle object like this
    /*let circle = new Circle(200,300, 50, 5, 5)*/
    //better still creat an instance of Circle object in a loop;
let circleArray = [] //which will be looped inside animate function to creat multiple independent balls 
for(let i = 0; i < 1000; i++){
    let x = Math.random() * innerWidth //setting an initial coord for x
    let y = Math.random() * innerHeight //setting an initial coord for x
    let radius = Math.random() * 3 +1;
    let speedX = (Math.random()- 0.5) *2;//random speed including -ve values to movement on x axis
    let speedY = (Math.random()-0.5) *2;//random speed including -ve to movement on y axis
    circleArray.push(new Circle(x,y,radius,speedX,speedY))//creat new instance of circle with given arguments and push in a new array
}


function animate(){//where all animation happen
    requestAnimationFrame(animate) //this will be creating a loop
    //it takes as parameter our animate function itself(callback)
    //so it will execute over and over everything inside this animate function
    context.clearRect(0,0,window.innerWidth, window.innerHeight)//not forgeting to clear our canvas for each loop
    //draw circle and update position
    //draw circle by loopx through circleArray and call update function to it

    canvas.width = window.innerWidth;
    canvas.height = this.window.innerHeight;

    for(let i = 0; i < circleArray.length; i++){
       circleArray[i].update()
        
    }
    
}
animate()

