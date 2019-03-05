
var canvas = $('canvas')[0];

var interval = 15;
var numberLineHeight;

var point;
var arrows = [];

var STAGE_WIDTH, STAGE_HEIGHT;

function init() {
  STAGE_WIDTH = parseInt(document.getElementById("gameCanvas").getAttribute("width"));
	STAGE_HEIGHT = parseInt(document.getElementById("gameCanvas").getAttribute("height"));

  // Init state object.
	stage = new createjs.Stage("gameCanvas"); // canvas id is gameCanvas
	stage.mouseEventsEnabled = true;
	stage.enableMouseOver(); // Default, checks the mouse 20 times/second for hovering cursor changes

  drawNumberLine();
  initEventListeners();

  drawPoint(0, "purple");

  stage.update();
}

function drawNumberLine() {

  // Settings.
  var w = STAGE_WIDTH;
  var h = STAGE_HEIGHT;
  var x0 = w/2;
  var starti=-20;
  var endi=20;
  var step = 2;
  var steps = 5;

  var g = new createjs.Graphics();

  // Draw the number line.
  g.setStrokeStyle(2);
  g.beginStroke('grey');

  var distanceFromEdge = 15;
  numberLineHeight = h/4 * 3;

  g.moveTo(distanceFromEdge, numberLineHeight);
  g.lineTo(w-distanceFromEdge, numberLineHeight);

  g.moveTo(distanceFromEdge, numberLineHeight);
  g.lineTo(distanceFromEdge+5, numberLineHeight+5);

  g.moveTo(distanceFromEdge, numberLineHeight);
  g.lineTo(distanceFromEdge+5, numberLineHeight-5);

  g.moveTo(w-distanceFromEdge, numberLineHeight);
  g.lineTo(w-distanceFromEdge-5, numberLineHeight+5);

  g.moveTo(w-distanceFromEdge, numberLineHeight);
  g.lineTo(w-distanceFromEdge-5, numberLineHeight-5);


  // Draw ticks and tick labels.
  for (var i = starti; i <= endi; i++) {

    g.beginStroke('grey');
    g.setStrokeStyle(2);
    var height = 3;

    // If center tick...
    if (!i) {
      height = 6;
    }

    // Draw the tick mark.
    g.moveTo(w/2 + i * interval, numberLineHeight - height);
    g.lineTo(w/2 + i * interval, numberLineHeight + height);

    // Draw the tick label.
    if (i % 5 === 0) {
      let tickText = new createjs.Text(i, "14px Arial", "black");
      tickText.x = (w/2 + i * interval) - tickText.getMeasuredWidth()/2;
      tickText.y = numberLineHeight + 12;
      stage.addChild(tickText);
    }
  }

  var numberLine = new createjs.Shape();
  numberLine.graphics = g;
  stage.addChild(numberLine);

  stage.update();
}

function drawPoint(x, color){
  stage.removeChild(point);
  point = new createjs.Shape();
  point.graphics.setStrokeStyle(1);
  point.graphics.beginFill(color);
  point.graphics.drawCircle(STAGE_WIDTH/2 + x * interval, numberLineHeight, 5);
  stage.addChild(point);
}

function drawArrow(x1, x2, color, heightOffset) {
  var arrow = new createjs.Shape();
  arrow.graphics.setStrokeStyle(3);
  arrow.graphics.beginStroke(color);

  // Draw line.
  arrow.graphics.moveTo(STAGE_WIDTH/2 + x1 * interval, numberLineHeight - heightOffset);
  arrow.graphics.lineTo(STAGE_WIDTH/2 + x2 * interval, numberLineHeight - heightOffset)

  // Draw arrow ends.
  var offset = -10;
  if (x1 > x2) {
    offset = -offset;
  }
  arrow.graphics.setStrokeStyle(2);
  arrow.graphics.moveTo(STAGE_WIDTH/2 + x2 * interval, numberLineHeight - heightOffset);
  arrow.graphics.lineTo(STAGE_WIDTH/2 + x2 * interval + offset, numberLineHeight - heightOffset - 5)
  arrow.graphics.moveTo(STAGE_WIDTH/2 + x2 * interval, numberLineHeight - heightOffset);
  arrow.graphics.lineTo(STAGE_WIDTH/2 + x2 * interval + offset, numberLineHeight - heightOffset + 5)

  arrows.push(arrow);
  stage.addChild(arrow);
}

function initEventListeners() {
  $('input[type="range"]').on("input", update);
  $('input[name="operation"]').on("input", update);
}

function update() {
  var value = 0;
  var sign;

  // Update integer spans which display the range values.
  var x1 = parseInt($('input[name="first_integer"]').val());
  var x2 = parseInt($('input[name="second_integer"]').val());
  $('#first_integer').html(x1);
  $('#second_integer').html(x2);

  // Check if we are adding or subtracting.
  if ($('#add').is(":checked")) {
    value = x1 + x2;
    sign = "+";
  } else {
    value = x1 - x2;
    sign = "-";
  }

  // Draw the point and arrows on the numberline.
  drawPoint(value, "purple");
  for (var a of arrows) stage.removeChild(a);
  if (x1 !== 0) drawArrow(0, x1, "red", 10);
  if (x2 !== 0) drawArrow(x1, value, "blue", 20);

  updateEquationText(x1, x2, value, sign);

  stage.update();
}

function updateEquationText(x1, x2, value, sign) {
  $('#equation .first_integer').html(x1);
  $('#equation .second_integer').html(x2);
  $("#sign").html(sign);
  $("#result").html(value);
}

function reset() {
  $('input[name="first_integer"]').val(0);
  $('input[name="second_integer"]').val(0);
  $('#add').attr("checked", true);
  update();
}
