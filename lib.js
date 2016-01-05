var mTitles = [
    "ANT MAN", "AVENGERS", "CREED", "FURIOUS 7", "HUNGAR GAMES", "MAD MAX", "MISSION IMPOSSIBLE", "THE REVENANT", "SAN ANDREAS", "SPECTRE", "STAR WARS", "TAKEN", "TERMINATOR", "TOMORROW LAND",
    "ANT MAN", "AVENGERS", "CREED", "FURIOUS 7", "HUNGAR GAMES", "MAD MAX", "MISSION IMPOSSIBLE", "THE REVENANT", "SAN ANDREAS", "SPECTRE", //"STAR WARS","TAKEN","TERMINATOR","TOMORROW LAND"
];//"STAR WARS","TAKEN","TERMINATOR","TOMORROW LAND"
var colors = [
    'violet', '#5BCBB0', 'violet', 'red', 'yellow', '#ffda6b', 'red', 'yellow',
    'violet', '#5BCBB0', 'violet', 'red', 'yellow', '#ffda6b', 'red', 'yellow',
    'violet', '#5BCBB0', 'violet', 'red', 'yellow', '#ffda6b', 'red', 'yellow', //'violet', '#5BCBB0','violet', 'red',
]
var movieImages = [
    "/images/antman.png", "/images/avangers.png", "/images/creed.png", "/images/furious.png", "/images/hunger.png", "/images/madmax.png", "/images/mission.png",
    "/images/revenant.png", "/images/sanandreas.png", "/images/spectre.png", "/images/starwars.png", "/images/taken.png", "/images/terminator.png", "/images/tomorrowland.png",
    "/images/antman.png", "/images/avangers.png", "/images/creed.png", "/images/furious.png", "/images/hunger.png", "/images/madmax.png", "/images/mission.png",
    "/images/revenant.png", "/images/sanandreas.png", "/images/spectre.png", //"/images/starwars.png", "/images/taken.png", "/images/terminator.png", "/images/tomorrowland.png"
];
var step1 = 100, step2 = 173.05, step3 = 245.6, step4 = 318, step5 = 390,step6 = 462.5, step12 = 896;
var wparts = 360 / movieImages.length, completeCircleItems = 24, spinIterator = 0, 
        startSpinTime = 0, endSpinTime = 0, spinIteratorSumma = 0, globRotate = 0, isClickAble = true, isScrollAble = true, isKeyNavigable = true;
var wdegree = movieImages.length * 15 / 24;
var warc = (wdegree * (Math.PI / 12)) / 15;
var startAngle = 0, w, h, grd = null,globI = 0, initVar = 0, direction = true, circleIterator = 1;angleArr = [];rotwI = 0, circlesForwardSteps = 5;
arc = Math.PI / 12, //15Deg,..pi/6 = 30deg ...
spinTimeout = null, oneStepAngle = 12.470, spinningUp = false, spinningDown = true,
movieTitle = null, enterAnimate = false,
startPos = 0,
endPos = 0,
spinArcStart = 10,
spinTime = 0,
spinTimeTotal = 0,
donat = null,
centerLevel = 500,
insideRadius = 385,
outsideRadius = 550,
textRadius = 350,
imageRadius = 535,
spikeRadius = 650,
ctx = null,
canvas = null,
angle = 0,
spinAngle = 0,
sampleArr = new Array(),
posObj = {};

function drawDonut(X, Y, oRadius, iRadius, sRadian, eRadian) {
    ctx.save();
    ctx.beginPath();
    
    //ctx.arc(this.x, this.y, this.spikeRadius, this.sRadian, this.eRadian, false); // Inner: CW
    ctx.arc(X, Y, oRadius, sRadian, eRadian, false); // Outer: CCW
    ctx.arc(X, Y, iRadius, eRadian, sRadian, true); // Inner: CW
    ctx.stroke();
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;
    ctx.fill();
    ctx.closePath();
}
function getDonatPart(id) {
    for (var i = 0; i < sampleArr.length; i++) {
        if (sampleArr[i].getId() == id) {
            return sampleArr[i];
        }
    }
    return false;
}

function pushDonatPartIntoArray(donat) {
    sampleArr.push(donat);
}

function DonatPart(id, X, Y, oRadius, iRadius, spikeRadius, sRadian, eRadian, i, angle, arc, cIterator) {
    this.id = id;
    this.x = X;
    this.y = Y;
    this.aktPosition = i;
    this.originalPosition = i;
    this.oRadius = oRadius;
    this.iRadius = iRadius;
    this.spikeRadius = spikeRadius;
    this.sRadian = sRadian;
    this.eRadian = eRadian;
    this.angle = angle;
    this.anglePos = angleArr[i];
    this.arc = arc;
    this.image = movieImages[i];
    this.title = mTitles[i];
    this.transX = Math.cos(angle + arc / 2) * imageRadius;
    this.transY = centerLevel + Math.sin(angle + arc / 2) * imageRadius;
    this.rotation = angle + arc / 6;
    this.angelPositionStr = 'PI/12*' + cIterator;
    this.angelPosition = Math.PI / 12 * cIterator;
    this.stepsToFocus = this.initializeStepsToFocus(cIterator);

}
DonatPart.prototype.initializeStepsToFocus = function (iterator) {
    var steps = 0;
    if (iterator <= 12) { //if < 180 degree
        steps = -iterator;
    }
    else { // > 180 degree
        steps = completeCircleItems - iterator;
    }
    return steps;
}
DonatPart.prototype.getStepsToFocus = function () {
    return this.stepsToFocus;
}
DonatPart.prototype.setStepsToFocus = function (steps) {
    this.stepsToFocus = steps;
}
DonatPart.prototype.setContext = function (ctx) {
    this.ctx = ctx;
}
DonatPart.prototype.getContext = function () {
    return this.ctx;
}
DonatPart.prototype.getAktPosition = function () {
    return this.aktPosition;
}
DonatPart.prototype.getOriginalPosition = function () {
    return this.originalPosition;
}
DonatPart.prototype.getAngle = function () {
    return this.angle;
}
DonatPart.prototype.setAngle = function (angle) {
    this.angle = angle;
}
DonatPart.prototype.getTitle = function () {
    return this.title;
}
DonatPart.prototype.getTransX = function () {
    return this.transX;
}
DonatPart.prototype.getTransY = function () {
    return this.transY;
}
DonatPart.prototype.getArc = function () {
    return this.arc;
}
DonatPart.prototype.getImage = function () {
    return this.image;
}
DonatPart.prototype.setAktPosition = function () {
    var pos = Math.round(this.angle / this.arc);
    if (pos == movieImages.length) {
        return 0;
    }
    return pos;
}
DonatPart.prototype.calculateStepsToFocus = function (direction) {            
    var steps = defineRotation(circlesForwardSteps);
    var akt = this.getStepsToFocus();   
    if (Math.abs(akt) == 12) {
        akt = -akt;
    }
    if (direction == true) {
        steps = akt - steps;
    } else {
        steps = akt + steps;
    }
    if (Math.abs(steps) > 12) {
        if (steps < 0) {
            steps = completeCircleItems - Math.abs(steps);
        } else if (steps > 0) {
            steps = Math.abs(steps) - completeCircleItems;
        }
    }
    return steps;
}
DonatPart.prototype.setAttributes = function (angle, arc, i, direction, cIterator) {
    this.sRadian = angle;
    this.eRadian = angle + arc;
    this.originalPosition = i;
    this.angle = angle;
    this.arc = arc;
    this.anglePos = angleArr[i];
    this.rotation = angle + arc / 6;
    this.aktPosition = this.setAktPosition();
    this.transX = Math.cos(angle + arc / 2) * imageRadius;
    this.transY = centerLevel + Math.sin(angle + arc / 2) * imageRadius;
    this.angelPositionStr = 'PI/12*' + cIterator;
    this.angelPosition = Math.PI / 12 * cIterator;
    
    if (spinIterator === circlesForwardSteps) {
        this.stepsToFocus = this.calculateStepsToFocus(direction);
    }
}

DonatPart.prototype.getId = function () {
    return this.id;
}
DonatPart.prototype.checkId = function (id) {
    return this.id;
}
/**
 * 
 * @param {type} ctx
 * void ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
 * x: The x coordinate of the arc's center.
 * y: The y coordinate of the arc's center.
 * @returns {undefined}
 */
DonatPart.prototype.drawToContext = function (ctx, i) {

    //This save() method pushes the current state onto the stack!     
    ctx.save();
    ctx.beginPath();
//        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
//    ctx.moveTo(this.spikeRadius + this.eRadian, this.eRadian + i);
    //ctx.lineTo(this.sRadian,this.spikeRadius);
    ctx.arc(this.x, this.y, this.oRadius, this.sRadian, this.eRadian, false); // Outer: CCW
    ctx.arc(this.x, this.y, this.iRadius, this.eRadian, this.sRadian, true); // Inner: CW
//    ctx.arc(this.x, this.y, this.spikeRadius, this.sRadian, this.eRadian, false); // Inner: CW 
    
    this.setContext(ctx);

    grd = ctx.createLinearGradient(-30, 0, -195, 0);

    ctx.translate(Math.cos(this.angle + this.arc / 2) * imageRadius, centerLevel + Math.sin(this.angle + this.arc / 2) * imageRadius);
    ctx.rotate(this.angle + this.arc / 4);

    ctx.closePath();
    ctx.clip();//cut off pixels outside the arc recangle 
    /// clear anything inside it
    ctx.clearRect(0, 0, w, h);
    
    setApproptiateAttributes(this, i);
    
    //This restore() method pops the top state on the stack, restoring the context to that state.
    ctx.restore();
}
function joinPath(array) {
    var res = '';
    for (var i = 0; i < array.length; i++) {
        res += array[i].join(' ') + ' ';
    }
    return res;
}

function setApproptiateAttributes(donat, i) {
    setImage(donat.image);
    grd.addColorStop(0, 'rgba(0,0,0,0)');
    grd.addColorStop(1, colors[i]);
    ctx.fillStyle = grd;
    ctx.fill();
    //text
    ctx.fillStyle = '#fff';
    ctx.fillText(donat.title, -135, -40);
    //ctx.fillText(donat.title, -135 , -40);  
    ctx.stroke();
}
function textDesign() {
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.font = '14px Helvetica, Arial';
    ctx.shadowBlur = 3;
    ctx.shadowColor = "#eee";
    ctx.textAlign = "left";
    ctx.imageSmoothingEnabled = true;
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;
}

function drawCenterHorizontalLine(x1, x2, y) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#fff";
    ctx.lineCap = 'round';
    var adaptedY = y;
    ctx.beginPath();
    ctx.moveTo(x1, adaptedY);
    ctx.lineTo(x2, adaptedY);
    ctx.stroke();
}
function setImage(image) {
    var cimg = document.createElement('img');
    cimg.src = image;
    var imgWidth = 165;
    var imgHeight = 135;
    var img = new Image();
    img.src = image;
    ctx.save();
    ctx.drawImage(img, 0, 0, cimg.width, cimg.height, -150, -70, imgWidth, imgHeight);
    ctx.restore();
}
function setImageOld(image) {
    var imgWidth = 192;
    var imgHeight = 144;
    var img = new Image();
    img.src = image;
    ctx.save();
    ctx.drawImage(img, -165, -70, imgWidth, imgHeight);
    ctx.restore();
}
function mouseScrollEventHandler(event) {
    var delta = 0;    
    if(!isClickAble || !isScrollAble || !isKeyNavigable){
//        console.log('Not scrollable yet!');
    }else{
        isScrollAble = false;
        circlesForwardSteps = 15;
        if (!event)
            event = window.event;
        // normalize the delta
        if (event.wheelDelta) {
            // IE and Opera
            delta = event.wheelDelta / 60;
        } else if (event.detail) {
            delta = -event.detail / 2;
        }
        if (delta < 0) { //down
            spinningWheel('down', step3);           
        } else {//up
            spinningWheel('up', step3);           
        }
        animateCentralCarousel();
    }
}


function keyDownEventHandler(e) {
    var keyDown = 40, keyUp = 38, pressedKey = 0;        
    if(!isClickAble || !isScrollAble || !isKeyNavigable){
//        console.log('Not key navigable yet!');
    }else{
        pressedKey = e.keyCode;
        isKeyNavigable = false;
        circlesForwardSteps = 5;
        switch(pressedKey){
            case keyDown:{             
                 spinningWheel('down', step1);   
                 break; 
            }
            case keyUp:{
                 spinningWheel('up', step1);             
                 break; 
            }
            default:{
                isKeyNavigable = true;    
            }
        }
        animateCentralCarousel();
    }    
}


function removeEventListenersFromCanvas(){
    canvas.removeEventListener('mousedown',moveCircleEvent, false);
    canvas.removeEventListener('mouseup',moveCircleEventUp, false);
    canvas.removeEventListener("mousewheel",mouseScrollEventHandler, false);
    //MOZILLA
    canvas.removeEventListener('DOMMouseScroll',mouseScrollEventHandler, false);
    //keyboard events handler
    window.removeEventListener( 'keydown',keyDownEventHandler, false);
}

function addEventListenersToCanvas(){
    canvas.addEventListener('mousedown', moveCircleEvent);
    canvas.addEventListener('mouseup', moveCircleEventUp);
    canvas.addEventListener("mousewheel", mouseScrollEventHandler, false);
    //MOZILLA
    canvas.addEventListener('DOMMouseScroll', mouseScrollEventHandler, false);
    //keyboard events handler
    window.addEventListener( 'keydown', keyDownEventHandler, true);
}

function checkFocusPositionItem(){
    var focusObj = null;
    for (var i = 0; i < sampleArr.length; i++) {
        focusObj = sampleArr[i];        
        if(focusObj.getStepsToFocus() === 0){
            visualizeSelectedItem(focusObj);
            break;
        }
    }
}

function spinningWheel(direction, step) {
    switch(direction){
        case 'up':{
            spin(false, oneStepAngle, step);       
            break;
        }
        case 'down':{
            spin(true, oneStepAngle, step);       
            break;
        }
    }
}

function getChar(event) {

  if (event.which == null) {
    return String.fromCharCode(event.keyCode) // IE
  } else if (event.which!=0 && event.charCode!=0) {
    return String.fromCharCode(event.which)   // the rest
  } else {
    return null // special key
  }
}

function moveCircleEvent(e) {
    startPos = e.clientY;
}

function moveCircleEventUp(e) {
    endPos = e.clientY;
    if(!isClickAble || !isScrollAble || !isKeyNavigable){
//        console.log('Not clickable yet!');
    }else{
        isClickAble = false;  
        circlesForwardSteps = 5;
        if (startPos < endPos) { //wanted to spin the wheel
            spinningWheel('down',step1);
    //            spin(true,15,100);
        } else if (startPos > endPos) {
    //             spin(false,15,100);
            spinningWheel('up',step1);        
        } else {
            var mousePos = getMousePos(canvas, e);
            checkDonatsByCoordinates(mousePos.x, mousePos.y);       
        }  
    }    
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function setAktualAnglesByPosition() {
    var pos = 0;
    for (var i = 0; i < sampleArr.length; i++) {
        var akt = sampleArr[i];
        pos = Math.round(akt.getAngle() / akt.getArc());
        akt.setAngle(posObj[pos]);
    }
}

function visualizeSelectedItem(aktObj) {    
    $(".movie-detail-layer").css('visibility', 'visible');
    $(".title").html(aktObj.getTitle());
    $(".image-wrap > img").attr('src', aktObj.getImage());
    $(".itemid").html('<p>' + aktObj.getId() + '</p>');
}

function checkDonatsByCoordinates(pagex, pagey) {
    var x0 = 0, y0 = 500, x1 = pagex, y1 = pagey, retVal = false;
    var distance = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));// distance from start point of the wheel to the clicked event cordinates
    if (distance >= insideRadius && distance <= outsideRadius) { // if inside the doughnut part
        for (var i = 0; i < sampleArr.length; i++) {
            var aktObj, akt_ctx, degree, posAngle;
            aktObj = sampleArr[i];
            akt_ctx = createNewObjectContext(aktObj);
            if (akt_ctx.isPointInPath(pagex, pagey)) {
                isClickAble = false;
                retVal = true;
                visualizeSelectedItem(aktObj);
                animateCentralCarousel();
                moveToFocus(aktObj.getStepsToFocus());
//                $('.slick-slide').trigger('slideClick.slick');                  
                break;
            }
        }
        if(!retVal){
            isClickAble = true;
        }
    }else{ 
        isClickAble = true;
    }
}

function animateCentralCarousel() {
    $('.slick-wrapper').hide('slow', function () {
    });
    setTimeout(function () {
        $('.slick-wrapper').show('slow', function () {
            //$(".movie-detail-layer").css('visibility', 'hidden');
        });
    }, 1000)
}
function moveToFocus(steps) {
//    console.log('steps to focus:' + steps);
    var msteps = Math.abs(steps);
    var direction = (steps < 0) ? 'up' : 'down';
    var stepsToFocus = 0;
    switch (msteps) {
        case 1:{
            circlesForwardSteps = 5;
            stepsToFocus = step1;
            break;
        }
        case 2:{
            circlesForwardSteps = 10;
            stepsToFocus = step2;
            break;
        }
        case 3:{
            circlesForwardSteps = 15;
            stepsToFocus = step3;
            break;
        }
        case 4:{
            circlesForwardSteps = 20;
            stepsToFocus = step4;
            break;
        }
        case 5:{
            circlesForwardSteps = 24;
            stepsToFocus = step5;
            break;
        }
        case 6:{
            circlesForwardSteps = 29;
            stepsToFocus = step6;
            break;
        }
    }    
    spinningWheel(direction,stepsToFocus);
}

function createNewObjectContext(obj) {
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, obj.oRadius, obj.sRadian, obj.eRadian, false); // Outer: CCW
    ctx.arc(obj.x, obj.y, obj.iRadius, obj.eRadian, obj.sRadian, true); // Inner: CW
    //ctx.stroke(); 
    ctx.save();
    ctx.clip();//cut off pixels outside the arc recangle 

    ctx.translate(Math.cos(obj.angle + obj.arc / 2) * imageRadius, centerLevel + Math.sin(obj.angle + obj.arc / 2) * imageRadius);
    ctx.rotate(obj.angle + obj.arc / 6);

    ctx.restore();
    return ctx;
}

function easeOut(t, b, c, d) {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}

function createCanvasContext() {
    canvast = new fabric.Canvas('canvast');
    var canvasContainer = document.getElementById('canvas-container');
    canvasContainer.addEventListener('dragenter', handleEvents, false);
    canvasContainer.addEventListener('dragover', handleEvents, false);
    canvasContainer.addEventListener('dragleave', handleEvents, false);
    canvasContainer.addEventListener('drop', preventDrag, true);
    
    canvas = document.getElementById("canvas");

    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;
} 


function handleEvents(event){
}

function preventDrag(event){ 
 if(event.type=='dragenter' || event.type=='dragover' || //if drag over event -- allows for drop event to be captured, in case default for this is to not allow drag over target
    event.type=='drop') //prevent text dragging -- IE and new Mozilla (like Firefox 3.5+)
 {
  if(event.stopPropagation) //(Mozilla)
  {
   event.preventDefault();
   event.stopPropagation(); //prevent drag operation from bubbling up and causing text to be modified on old Mozilla (before Firefox 3.5, which doesn't have drop event -- this avoids having to capture old dragdrop event)
  }
  return false; //(IE)
 }
}