import gySVG    from 'https://cdn.graphery.online/svg/1.0.0/module/index.js';
import helpers  from "https://cdn.graphery.online/svg/1.0.0/module/helpers.plugin.js";
import sequence from "https://cdn.graphery.online/svg/1.0.0/module/sequence.plugin.js";
gySVG.extend(helpers);
gySVG.extend(sequence);
const svg = gySVG().viewBox(0, 0, 600, 600).width(600).height(600);
const seq = svg.Seq();
svg.attachTo('#example-fractal-tree');
(function drawBranch (startX = 300, startY = 300, len = 20, angle = 0, remain = 0, delay = 0) {
  const {x: endX, y: endY} = gySVG.polar2cartesian(startX, startY, len, angle);
  const element            = svg.add('line').x1(startX).y1(startY).x2(startX).y2(startY).stroke('#45ae13ff').stroke_width(1);
  const duration = 100;
  seq.add(element, {x2: endX, y2: endY}, {delay, duration});
  if (remain < 12) {
    drawBranch(endX, endY, len, angle+(180/Math.PI)/(Math.pow(2, remain+1)), remain+1, delay + duration);
    drawBranch(endX, endY, len, angle-(180/Math.PI)/(Math.pow(2, remain+1)), remain+1, delay + duration);
  }
})();

seq.play()
