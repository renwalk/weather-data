let data;
let rotation = 0;
let c;
let c2;

// here is the URL for where I'm going to pull my data
let url = "https://api.openweathermap.org/data/2.5/weather?q=New York&units=imperial&appid=353ad2895a332db56c5dcddfa8fc0bd7";

// setting up my high and low colors for my color scale
let lowColor = [16,193,201];
let highColor = [234, 78, 0];

function preload(){
 // load my data from the API 
  data = loadJSON(url);
}

function setup() {
  // create my canvas
  createCanvas(400,400);
  print(data); 
}


function draw() {
  background(255);
  noStroke(1);
  
  // here is where i draw my "feels like" ellipse
  let realTemp = data.main.temp; // get the real temp from data
  let feelsLikeTemp = data.main.feels_like; // get the "feels like" temp
  let diff = realTemp - feelsLikeTemp; // what is the diff in real temp and feels like temp?

    
  
  // now i want to know where does the feelLikeTemp sit
  // on a temperature scale from -30 to 100 (°F)
  // so i can give it a color
  let s = map(feelsLikeTemp, -30, 110, 0, 1);
  
  // for color, you use lerpColor instead of map
  // and "s" represents the "step" you are between
  // your first color and second color
  // (feel free to reference the lerpColor documentation)
  let c = lerpColor(color(lowColor), color(highColor), s);
  
  //set my fill to my calculated color "c"
  fill(c);
  let value = c;
    
  fill(value);
  rect(0, 0, 400, 400); 
  
  // now i want to know where does the feelLikeTemp sit
  // on a temperature scale from -30 to 100 (°F)
  // so i can give it a color
  let r = map(realTemp, -30, 110, 0, 1);
  let c2 = lerpColor(color(lowColor), color(highColor), r);
  
  //set my fill to my calculated color "c2"
  fill(c2)
  let value2 = c2;
  
  fill(value2);
  circle(width/2, height/2, width)
  

    
//     // this code below just shows drawing
//   // a set of cirlces at 10 steps along the way of my color scale
//   // to demonstrate the scale
//   for (let i = 0; i <= 100; i+= 10){ // go up in 10% increments
//     let s2 = i/100;
//     //print(s2);
//     let c3 = lerpColor(color(lowColor), color(highColor), s2);
    
//     fill(c3);
//     rect(250+i, 380, 8, 8);
//   }
  
  
  // this code below draws the little square
  // that rotates based on the wind speed
  fill(150); // set my fill to light gray
  
  // i want to use degrees, not radians
  // when talking about my rotation angle
  // so i swap that here:
  angleMode(DEGREES); 
  
  // get the wind speed from the data:
  let speed = data.wind.speed;
  //let angle = data.wind.speed;
  let direction = data.wind.deg;
  
  print('wind speed ' + speed, 'wind direction ' + direction, 'real temp ' + realTemp, 'feels like temp' + feelsLikeTemp);
 
  
  
    // Check the wind direction range and adjust rotation accordingly
  if (direction > 0 && direction <= 180) {
      // Clockwise rotation
      rotation += 0.25 * speed;
  } else if (direction > 180 && direction <= 360) {
      // Counter-clockwise rotation
      rotation -= 0.25 * speed;
  }

  // Reset the rotation if it completes a full rotation
  if (rotation > 360) {
      rotation -= 360;
  } else if (rotation < 0) {
      rotation += 360;
  }
    
  // in order to have my line rotate in place
  // i have to use the push(); and pop(); functions
  // try deleting the push, translate and pop functions
  // to see how it behaves differently without that
  // and you can also look at the reference
  push();
  translate(width/2,height/2);
  rotate(rotation);
  rect(-5, -5, width/2, 5);
  pop();
  
}

