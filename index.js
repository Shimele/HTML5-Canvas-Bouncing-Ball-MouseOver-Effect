//*step 1- creating and resizing a canvas
let canvas = document.querySelector("canvas");//select canvas from html
canvas.width = window.innerWidth;//set canvas width to equal window width
canvas.height= window.innerHeight;//set canvas height to equal window height
//to draw 2d objects in canvas, we need a 2d drawing space
let context = canvas.getContext("2d")

//*step -2 drawing in a canvas
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