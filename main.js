song = "";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
scorelw = 0;
function setup() {
    Canvas = createCanvas(500, 500);
    Canvas.center();
    Video = createCapture(VIDEO);
    Video.hide();
    poseNet = ml5.poseNet(Video, Modelloaded);
    poseNet.on('pose', Gotresult);

}
function Modelloaded() {
    console.log("poseNet is initialized");
}

function draw() {
    image(Video, 0, 0, 480, 480);
}

function preload() {
    song = loadSound("music.mp3");

}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function Gotresult(results) {
    if (results.length > 0) {
        console.log(results);
       scorelw=results[0].pose.keypoints[9].score;
       console.log("Left wrist score ="+ scorelw);
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("left Wrist x = " + leftWristx + "  left Wrist y =  " + leftWristy);
        console.log("Right Wrist x = " + rightWristx + "  Right Wrist y =  " + rightWristy);

    }
}

function draw() {
    fill("red");
    stroke("black");
    if (scorelw > 0.2) {


        circle(leftWristx, leftWristy, 20);
        v1 = Number(leftWristy);
        v2 = floor(v1);
        v3 = v2 / 500;
        document.getElementById("Volume").innerHTML = "Volume =" + v3;
        song.setVolume(v3);
    }

}