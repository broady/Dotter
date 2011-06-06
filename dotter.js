/** @license
   Copyright 2011 Google Inc.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

/**
 * @fileoverview Generate data URIs representing colored dots.
 *
 * @author Chris Broadfoot (cbro@google.com)
 */

/**
 * A dotter is a class that generates data URIs.
 *
 * @constructor
 * @param {number} radius  The radius of the dots to be generated.
 */
function Dotter(radius) {
  this.radius_ = radius;

  /**
   * A cache from colors (key) to data URIs (value).
   *
   * @type Object.<string, string>
   */
  this.cache_ = {};
}
window['Dotter'] = Dotter;

/**
 * Gets a suitable data URI for a particular color.
 *
 * @param {string} color  Any color string accepted by Canvas.
 * @return {string}  The data URI.
 */
Dotter.prototype.getDot = function(color) {
  if (!this.cache_[color]) {
    this.cache_[color] = this.generateDot_(color);
  }

  return this.cache_[color];
};
Dotter.prototype['getDot'] = Dotter.prototype.getDot;

/**
 * Generates the data URI.
 *
 * @param {string} color  Any color string accepted by Canvas.
 * @return {string}  The data URI.
 */
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

