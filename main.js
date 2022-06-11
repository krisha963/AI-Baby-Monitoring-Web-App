song = "";
status = "";
objects = [];
function preload(){
    song = LoadSound("alarm_clock_1.mp3");
}
function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting object";
}
function draw(){
    image(video, 0, 0, 380, 380);
    for(i = 0; i < objects.length; i++){
       if(objects[0].label == "person"){
        document.getElementById("baby_detect").innerHTML = "Baby Detected";
        song.stop();
       }
       else{
        document.getElementById("baby_detect").innerHTML = "Baby Not Detected";
        song.play();
       }
    }
    if(objects.length < 0){
        document.getElementById("baby_detect").innerHTML = "Baby Not Detected";
        song.play();
    }
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}