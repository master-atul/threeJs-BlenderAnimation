'use strict';
/**
 * Created by atulr on 08/08/15.
 */
'use strict';
var THREE = require('three');
var $ = require('jquery');
var rendererConfig = require('./components/rendererConfig');
var characterGenerator = require('./components/characterGenerator');
var cameraGenerator = require('./components/cameraGenerator');
var lightGenerator = require('./components/lightGenerator');
var clock = new THREE.Clock();
var world = function () {

  var init = function (appendDom) {
    var injectDom = $(appendDom)[0];
    var areaHeight = $(appendDom).height();
    var areaWidth = $(appendDom).width();


    var camera = cameraGenerator.init(areaHeight, areaWidth);
    var renderer = rendererConfig.init(injectDom, areaHeight, areaWidth);
    var light = lightGenerator.init();
    var ambientLight = lightGenerator.initAmbient();

    var scene = new THREE.Scene();
    characterGenerator.init(scene);
    scene.add(light);
    scene.add(ambientLight);
    renderer.render(scene, camera);

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      var delta = 0.75 * clock.getDelta();
      THREE.AnimationHandler.update( delta );
    }

    animate();
  };

  return {
    init: init
  }
}();

module.exports = world;