
var canvas = $('canvas')[0];

var interval = 20;

var STAGE_WIDTH, STAGE_HEIGHT;

function init() {
  STAGE_WIDTH = parseInt(document.getElementById("gameCanvas").getAttribute("width"));
	STAGE_HEIGHT = parseInt(document.getElementById("gameCanvas").getAttribute("height"));

  // Init state object.
	stage = new createjs.Stage("gameCanvas"); // canvas id is gameCanvas
	stage.mouseEventsEnabled = true;
	stage.enableMouseOver(); // Default, checks the mouse 20 times/second for hovering cursor changes

  drawNumberLine();

  drawPoint(5, "blue");
  drawArrow(1, 6, "red");

  stage.update();
}

function drawNumberLine() {

  // Settings.
  var w = STAGE_WIDTH;
  var h = STAGE_HEIGHT;
  var x0 = w/2;
  var starti=-10;
  var endi=10;
  var step = 2;
  var steps = 5;

  var g = new createjs.Graphics();

  // Draw the number line.
  g.setStrokeStyle(2);
  g.beginStroke('grey');

  g.moveTo(w/7, h/2);
  g.lineTo(6*w/7, h/2);

  g.moveTo(w/7, h/2);
  g.lineTo(w/7+5, h/2+5);

  g.moveTo(w/7, h/2);
  g.lineTo(w/7+5, h/2-5);

  g.moveTo(6*w/7, h/2);
  g.lineTo(6*w/7-5, h/2+5);

  g.moveTo(6*w/7, h/2);
  g.lineTo(6*w/7-5, h/2-5);


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
    g.moveTo(w/2 + i * interval, h/2 - height);
    g.lineTo(w/2 + i * interval, h/2 + height);

    // Draw the tick label.
    let tickText = new createjs.Text(i, "12px Arial", "black");
    tickText.x = (w/2 + i * interval) - tickText.getMeasuredWidth()/2;
    tickText.y = h/2 + 12;
    stage.addChild(tickText);

  }

  var numberLine = new createjs.Shape();
  numberLine.graphics = g;
  stage.addChild(numberLine);

  stage.update();
}

function drawPoint(x, color){
  var point = new createjs.Shape();
  point.graphics.setStrokeStyle(1);
  point.graphics.beginFill(color);
  point.graphics.drawCircle(STAGE_WIDTH/2 + x * interval, STAGE_HEIGHT/2, 5);
  stage.addChild(point);
}

function drawArrow(x1, x2, color) {
  var arrow = new createjs.Shape();
  arrow.graphics.setStrokeStyle(2);
  arrow.graphics.beginStroke(color);

  // Draw line.
  arrow.graphics.moveTo(STAGE_WIDTH/2 + x1 * interval, STAGE_HEIGHT/2 - 10);
  arrow.graphics.lineTo(STAGE_WIDTH/2 + x2 * interval, STAGE_HEIGHT/2 - 10)

  // Draw arrow ends.
  arrow.graphics.moveTo(STAGE_WIDTH/2 + x2 * interval, STAGE_HEIGHT/2 - 10);
  arrow.graphics.lineTo(STAGE_WIDTH/2 + x2 * interval - 5, STAGE_HEIGHT/2 - 15)
  arrow.graphics.moveTo(STAGE_WIDTH/2 + x2 * interval, STAGE_HEIGHT/2 - 10);
  arrow.graphics.lineTo(STAGE_WIDTH/2 + x2 * interval - 5, STAGE_HEIGHT/2 - 5)

  stage.addChild(arrow);
}
