import gySVG from "https://cdn.graphery.online/svg/1.0.0/module/index.js";
import helpers from "https://cdn.graphery.online/svg/1.0.0/module/helpers.plugin.js";
import sequence from "https://cdn.graphery.online/svg/1.0.0/module/sequence.plugin.js";
gySVG.extend(helpers);
gySVG.extend(sequence);
const svg = gySVG().viewBox(0, 0, 800, 800).width(400).height(400);
const seq = svg.Seq();
svg.attachTo("#example-fibonacci-spiral");

// Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
const fibonacci = (n) => (n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2));

function drawBranch(startX, startY, len, angle, maxAngle, totalAngle) {
  if (totalAngle >= maxAngle) {
    return;
  }
  const end2 = gySVG.polar2cartesian(startX, startY, len, angle + 25);

  seq.add(
    svg
      .add("line")
      .x1(startX)
      .y1(startY)
      .x2(startX)
      .y2(startY)
      .stroke("#45ae13ff")
      .stroke_width(2),
    { x2: end2.x, y2: end2.y },
    { duration: 1 }
  );

  drawBranch(startX, startY, len/1.5, angle+25, maxAngle, totalAngle+1)
}

(function drawFibonacciSpiral(startX = 400, startY = 400, angle = 0, n = 10) {
  let a, b, len;

  for (let i = 0; i < n; i++) {
    a = fibonacci(i);
    b = fibonacci(i + 1);
    console.log(i, a, b);
    len = b * 10; // Scaling factor
    const { x: endX, y: endY } = gySVG.polar2cartesian(
      startX,
      startY,
      len,
      angle
    );
    const duration = 1;

    seq.add(
      svg
        .add("line")
        .x1(startX)
        .y1(startY)
        .x2(startX)
        .y2(startY)
        .stroke("#45ae13ff")
        .stroke_width(2),
      { x2: endX, y2: endY },
      { duration }
    );

    drawBranch(startX, startY, len/1.5, angle + 25,2,0);

    angle += (a / b) * 70;
    startX = endX;
    startY = endY;
  }
})();

seq.play();
