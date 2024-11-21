let classifier;
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/u4BBGstls/";

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let confiaza = 0;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

function setup() {
  createCanvas(320, 260);
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  video = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(video, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);

  // textSize(8);
  // textAlign(LEFT);
  // text(confiaza, 10, height - 4);
  // Get a prediction for the current video frame

  if (etiqueta == "batman" && confiaza > 0.9) {
    filter(INVERT);
    filter(GRAY);
    fill(255);
    textSize(80);
    textAlign(CENTER);
    text("el señor de la noche!", width / 2, height / 2);
  }
}

function classifyVideo() {
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  confiaza = results[0].confidence;
  // Classifiy again!
  classifyVideo();
}
