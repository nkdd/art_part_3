var gameState = 0;
var canvas;
var database;
var drawing = [];
var currentPath = [];
var saveDrawing;
var isDrawing = false;
var gotData,errData;
var drawing,dbdrawing;

function setup(){
    canvas = createCanvas(600,400);
    canvas.mousePressed(startPath);
    canvas.parent('canvasContainer')
    database = firebase.database();
    var saveButton = select('#saveButton');
    saveButton.mousePressed(saveDrawing);
    var clearButton = select('#clearButton');
    clearButton.mousePressed(clearDrawing);
    var ref = database.ref('drawings');
    ref.on('value',gotData,errData);
}

function startPath(){
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function endPath(){
 isDrawing = false;
}

function draw(){
    background("black");
    if(mouseIsPressed){
      point = {
        x : mouseX,
        y : mouseY
      }
      currentPath.push(point);
    }
    
    stroke(300);
    strokeWeight(10);
    noFill();
    for(var i = 0;i < drawing.length; i ++){
      var path = drawing[i];
      beginShape();
      for(var j = 0;j < path.length; j ++){
      vertex(path[j].x,path[j].y)
    }
  
    endShape();
  }
    
  }

  function saveDrawing(){
    var ref = database.ref('drawing');
    var data={
      name:'Lekhya',
      drawing :'Drawing'
    }
    var result = ref.push(data,dataSent);
  }
  function dataSent(status){
      console.log(status);
  }

  function gotData(data){
    var drawing = data.val();
    var keys = Object.keys(isDrawing);

    for(var i = 0;i<keys.length;i++){
    var key = keys[i];
    console.log(key);
   var li = createElement('li','');
   var ahref = createA('#',key);
   ahref.mousePressed(showDrawing);
   ahref.parent(li);
   li.parent('drawinglist');}
  }

  function errData(err){
    console.log(err);
  }

  function showDrawing(){
    var key = this.html();
    var ref = database.ref('drawings/'+key);
    ref.on('value',oneDrawing,errData);
  }
    function oneDrawing(data){
      var dbdrawing = data.val();
      drawing = dbdrawing.drawing;
      console.log(drawing);
  }

  function clearDrawing(){
    drawing =[];
  }