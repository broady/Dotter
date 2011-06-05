function Dotter(radius) {
  this.radius_ = radius;
  this.cache = {};
}

Dotter.prototype.getDot = function(color) {
  if (!this.cache[color]) {
    this.cache[color] = this.generateDot_(color);
  }

  return this.cache[color];
};

Dotter.prototype.generateDot_ = function(color) {
  var radius = this.radius_;

  var el = document.createElement('canvas');
  el.width = radius * 2;
  el.height = radius * 2;

  var ctx = el.getContext('2d');
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(radius, radius, radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();

  return el.toDataURL();
};

