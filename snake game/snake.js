
class Snake{
    constructor(x, y, size){
        this.x = x
        this.y = y
        this.size = size
        this.tail = [{x:this.x, y:this.y}]
        this.rotateX = 0
        this.rotateY = 1

    }

    move(){
        var newRect;
        if(this.rotateX == 1){
            newRect = {
                x: this.tail[this.tail.length - 1].x + this.size,
                y: this.tail[this.tail.length - 1].y
            }
        }else if(this.rotateX == -1){
            newRect = {
                x: this.tail[this.tail.length - 1].x - this.size,
                y: this.tail[this.tail.length - 1].y
            }
        
        }else if(this.rotateY == 1){
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y + this.size
            } 
        }
        else if(this.rotateY == -1){
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y - this.size
            } 
        }

        this.tail.shift()
        this.tail.push(newRect)
    }
     
}

class Apple{
    constructor(){
        console.log("apple")
        console.log(snake.size)
        var isTouching;
        while(true){
            isTouching = false;
            this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size
            this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size
            for(var i = 0; i < snake.tail.length;i++){
                if(this.x == snake.tail[i].x && this.y == snake.tail[i].y){
                    isTouching = true
                }
            }
            console.log(this.x, this.y)
            if(!isTouching){
                break;
            }
            this.color = "red"
            this.size = snake.size
            
        }
        this.color = "red"
            this.size = snake.size
    }
}


var canvas = document.getElementById("canvas")

var snake = new Snake(20,20,20);

var apple = new Apple();

var canvasContext = canvas.getContext('2d');

var eatingApple = true;

window.onload = ()=>{
    gameLoop();
}

function gameLoop(){
    setInterval(show, 1000/15)
}

function show(){
    update();
    draw();
}

function update(){
    canvasContext.clearRect(0,0, canvas.width, canvas.height)
    console.log("update")
    snake.move()
    eatApple()
    checkHitTail()
    checkHitWall();
}

function checkHitTail() {
    var head = snake.tail[snake.tail.length - 1];
    for (var i = 0; i < snake.tail.length - 2; i++) {
      if (head.x == snake.tail[i].x && head.y == snake.tail[i].y) {
        if (snake.tail.length - 1 == 2 && i == 0) {
          continue; 
        } else {
          alert("You ate your own tail! Your score is " + (snake.tail.length - 1));
          location.reload();
        }
      }
    }
  }

function checkHitWall(){
    var headTail = snake.tail[snake.tail.length -1]
    if(headTail.x == - snake.size){
        headTail.x = canvas.width - snake.size
    } else if(headTail.x == canvas.width){
        headTail.x = 0
    } else if(headTail.y == - snake.size){
        headTail.y = canvas.width - snake.size
    } else if(headTail.y == canvas.height){
        headTail.y = 0
    }
}

function eatApple(){
    if(snake.tail[snake.tail.length - 1].x == apple.x &&
        snake.tail[snake.tail.length - 1].y == apple.y){
            snake.tail[snake.tail.length] = {x:apple.x, y:apple.y}
            apple = new Apple();
        }

}



function draw(){

    
    createRect(0,0,canvas.width, canvas.height, "black")
    createRect(0,0, canvas.width, canvas.height)

    for(var i =0; i < snake.tail.length; i++){
        createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5,
            snake.size - 5, snake.size - 5, 'lightgreen')
    }

    if(snake.rotateX == 1){
        var img = new Image()
        img.src = "headRight.png"
        canvasContext.drawImage(img, snake.tail[snake.tail.length-1].x, snake.tail[snake.tail.length-1].y, snake.size, snake.size)
    }else if(snake.rotateX == -1){
        var img = new Image()
        img.src = "headLeft.png"
        canvasContext.drawImage(img, snake.tail[snake.tail.length-1].x, snake.tail[snake.tail.length-1].y, snake.size, snake.size)
    }else if(snake.rotateY == 1){
        var img = new Image()
        img.src = "headDown.png"
        canvasContext.drawImage(img, snake.tail[snake.tail.length-1].x, snake.tail[snake.tail.length-1].y, snake.size, snake.size)
    }else if(snake.rotateY == -1){
        var img = new Image()
        img.src = "headUp.png"
        canvasContext.drawImage(img, snake.tail[snake.tail.length-1].x, snake.tail[snake.tail.length-1].y, snake.size, snake.size)
    }

    canvasContext.fillStyle = "#00FF42"
    canvasContext.font = "20px Arial"
    canvasContext.fillText("Score:"+(snake.tail.length -1), 
        canvas.width -120, 18);
    
    var appImg = new Image()
    appImg.src = "apple.png"
    canvasContext.drawImage(appImg, apple.x, apple.y, apple.size, apple.size)

}

function createRect(x,y,width,height,color){
    canvasContext.fillStyle = color
    canvasContext.fillRect(x,y,width,height)
}

window.addEventListener("keydown", (event)=>{
    setTimeout(()=>{
        if(event.keyCode == 37 && snake.rotateX != 1){
            snake.rotateX = -1
            snake.rotateY = 0;
        } else if(event.keyCode == 38 && snake.rotateY != 1){
            snake.rotateX = 0
            snake.rotateY = -1;
        } else if(event.keyCode == 39 && snake.rotateX != -1){
            snake.rotateX = 1
            snake.rotateY = 0;
        } else if(event.keyCode == 40 && snake.rotateY != -1){
            snake.rotateX = 0
            snake.rotateY = 1;
        }
    }, 1)
})