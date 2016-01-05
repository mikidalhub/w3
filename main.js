var fps = 120;
window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                window.setTimeout(callback, 1000 / fps);
            };
})();
function defineRotation(iterates) {
    var rotate = 0;
    switch (iterates) {
        case 5:{
            rotate = 1;
            break;
        }
        case 10:{
            rotate = 2;
            break;
        }
        case 15:{
            rotate = 3;
            break;
        }
        case 20:{
            rotate = 4;
            break;
        }
        case 24:{
            rotate = 5;
            break;
        }
        case 29:{
            rotate = 6;
            break;
        }
        case 58:{
            rotate = 12;
            break;
        }
        default :{
            rotate = 1;
            break;
        }
    }
    return rotate;
}
function handleSampleArray(direction, sIterator) {
    globRotate = 0;
    //console.log('circleForward',circlesForwardSteps,sIterator);
    if (sIterator === circlesForwardSteps) {
        var rotate = defineRotation(circlesForwardSteps);          
        if (direction) {
            rotateSampleArrayRight(rotate);
        } else {
            rotateSampleArrayLeft(rotate);
        }
        globRotate = rotate;
        spinIteratorSumma += globRotate;
    }
}
function drawRouletteWheel(direction) {
    if (canvas.getContext) {
        if (rotwI > 1) {
            handleSampleArray(direction, spinIterator);
        }
        ctx.clearRect(0, 0, w, h); //clear canvas
//            for (var i = 0; i < 2; i++) {
        for (var i = 0; i < movieImages.length; i++) {
            angle = startAngle + i * arc;
            donat = getDonatPart('id' + i);
            if (!donat) {
                sRadian = angle;
                eRadian = angle + arc;
                donat = new DonatPart('id' + i, 0, centerLevel, outsideRadius, insideRadius, spikeRadius, sRadian, eRadian, i, angle, arc, circleIterator);
                pushDonatPartIntoArray(donat);
            } else {
                donat.setAttributes(angle, arc, i, direction, circleIterator);
            }           
            if(spinIteratorSumma >= 12){
                donat.drawToContext(ctx, i);
            }else{
                 if(i > 5 && i < 18){
                    donat.drawToContext(ctx, i);
                 }
            }
            //console.log(donat);
            if (circleIterator === completeCircleItems) {
                circleIterator = 0;
            }
            circleIterator++;
        }
        if(rotwI == 0){
           animateEntrance();
        }
        drawTrapezoid();
        rotwI++;
           
    }
}

function animateEntrance() {
    if(!enterAnimate){
        setTimeout(function(){
            circlesForwardSteps = 58;
            isClickAble = false;
            isScrollAble = false;
            isKeyNavigable = false;
            spinningWheel('down', step12);                                         
        },1000);
        enterAnimate = true;
    }
}

function doAfterRotationStopped() {
        endSpinTime = (new Date()).getTime() - startSpinTime;
        //console.log(startSpinTime, endSpinTime);
        checkFocusPositionItem();
        spinIterator = 0;                
        isClickAble = true;
        isScrollAble = true;
        isKeyNavigable = true;
        
}
function rotateWheel(direction) {
//        setTimeout(function () {            
    spinTime += 15;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        doAfterRotationStopped();
        return;
    }
    var eout = easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    spinAngle = spinAngleStart - eout;
    if (direction) { //down
        startAngle += (spinAngle * Math.PI / 180);
    } else {//up
        startAngle -= (spinAngle * Math.PI / 180);
    }
    
    drawRouletteWheel(direction);
    spinIterator++;    
    //console.log(spinIterator);
//            requestAnimFrame(rotateWheel);
    spinTimeout = setTimeout('rotateWheel(' + direction + ')', 30);
//        },1800 / fps);
}

function stopRotateWheel() {
    clearTimeout(spinTimeout);
    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.restore();
}

function spin(direction, spAngleStart, spTimeTotal) {
    // spinAngleStart = Math.random() * 10 + 10;          
    if (spinIterator > 0) { //if wheel is in progress
        console.log('wheel in porgress...');
    }else{
        spinAngleStart = (spAngleStart != undefined) ? spAngleStart : oneStepAngle;
        spinTime = 0;
        spinTimeTotal = (spTimeTotal != undefined) ? spTimeTotal : step1;
        //        spinTimeTotal = Math.random() * 3 + 4 * 1000;           
        startSpinTime = (new Date()).getTime();
        rotateWheel(direction);
    }
}

function draw() {
    createCanvasContext();
    //drawCenterHorizontalLine(0, 600, centerLevel);
    textDesign();    
//    drawTrapezoid();

    for (var i = 0; i < movieImages.length; i++) {
        var img = new Image();
        img.src = movieImages[i];
        img.onload = initWheel;
    }
    addEventListenersToCanvas();
}

function initWheel() {
    initVar++;
    if (initVar == movieImages.length) {
        spinAngleStart = 15; //24
        spinAngle = spinAngleStart;
        drawRouletteWheel(true);
    }
}

function drawTrapezoidOwn(){
    ctx.fillStyle = "#191919";
    ctx.beginPath();
    ctx.moveTo(373, 403);
    ctx.lineTo(550, 355);
    ctx.lineTo(550, 644);
    ctx.lineTo(373, 596);
    ctx.closePath();
    ctx.fill();

}
function drawTrapezoid() {
    var trapezoid = new fabric.Path('M 373 403 L 555 355 L 555 644 L 373 596 z', {
        fill: '#191919',
    })
    trapezoid.set({left: 290, top: 5});    
    canvast.add(trapezoid);
    canvast.renderAll();
}

function rotateSampleArrayLeft(step) {
    var t;
    for (var i = 0; i < step; i++) {
        t = sampleArr.shift();
        sampleArr.push(t);
    }
    return t;
}
function rotateSampleArrayRight(step) {
    var t;
    for (var i = 0; i < step; i++) {
        t = sampleArr.pop();
        sampleArr.unshift(t);
    }
    return t;
}