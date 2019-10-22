var yyy = document.getElementById('myCanvas');
var context = yyy.getContext('2d');
var getWidth = 5;
var getColor = 'black';
var eraserEnabled = false;

autoSetCanvasSize(yyy)

listenToUser(yyy)


/******/

function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function() {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
    
  }
}

function drawCircle(x, y, radius) {
  context.beginPath()
  context.fillStyle = 'black'
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill()
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.strokeStyle = getColor
  context.moveTo(x1, y1) // 起点
  context.lineWidth = getWidth
  context.lineTo(x2, y2) // 终点
  context.stroke()
  context.closePath()
}

function listenToUser(canvas) {
  var using = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }

  if(document.body.ontouchstart !== undefined) {
    
    canvas.ontouchstart = function(aaa){
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      console.log(x,y)
      using=true
      if (eraserEnabled) {
        context.clearRect(x-15, y-15, 30, 30)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.ontouchmove = function(aaa){
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY

      if (!using) {return}

      if (eraserEnabled) {
        context.clearRect(x-15, y-15, 30, 30)
      } else {
        var newPoint = {
          "x": x,
          "y": y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function(){
      using = false
    }
  }else{
    canvas.onmousedown = function(aaa) {
      var x = aaa.clientX
      var y = aaa.clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x-15, y-15, 30, 30)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.onmousemove = function(aaa) {
      var x = aaa.clientX
      var y = aaa.clientY

      if (!using) {return}

      if (eraserEnabled) {
        context.clearRect(x-15, y-15, 30, 30)
      } else {
        var newPoint = {
          "x": x,
          "y": y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.onmouseup = function() {
      using = false
    }
  }
}

/* Canvas Function List*/
//Edit brush color
black.onclick= function(){
  getColor = 'black'
  black.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  return getColor
}
red.onclick = function(){
  getColor = 'red'
  red.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  black.classList.remove('active')
  return getColor
}
green.onclick=function(){
  getColor = 'green'
  green.classList.add('active')
  red.classList.remove('active')
  blue.classList.remove('active')
  black.classList.remove('active')
  return getColor
}
blue.onclick=function(){
  getColor = 'blue'
  blue.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
  black.classList.remove('active')
  return getColor
}

//Edit brush width
thin.onclick = function(){
  getWidth = 5;
  thin.classList.add('active')
  bold.classList.remove('active')
}
bold.onclick = function(){
  getWidth = 10
  bold.classList.add('active')
  thin.classList.remove('active')
}

//Switch between eraser and brush
eraser.onclick = function() {
  eraserEnabled =true
  eraser.classList.add('active')
  brush.classList.remove('active')
}
brush.onclick = function(){
  eraserEnabled = false
  brush.classList.add('active')
  eraser.classList.remove('active')
}

//Clear all 
clear.onclick=function(){
  context.clearRect(0,0,yyy.width,yyy.height)
}

//Save your work
save.onclick=function(){
  var url = yyy.toDataURL('image/png')
  var imgLink=document.createElement('a')
  document.body.appendChild(imgLink)
  imgLink.href=url
  imgLink.download='canvas_'
  imgLink.click()
}