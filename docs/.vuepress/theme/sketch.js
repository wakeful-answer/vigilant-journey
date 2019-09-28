import * as THREE from 'three';
import OrbitControls from 'three';
import GLTFLoader from 'three-gltf-loader';
import * as dat from 'dat.gui';
import * as Fragment from './fragmentshader';

var width = window.innerWidth,
    height = window.innerHeight;

//Add loader
// Create a renderer and add it to the DOM.
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0x000000, 1 );
renderer.setSize(width, height);
// document.body.appendChild('canvas');
// Create the scene
var scene = new THREE.Scene();
// Create a camera
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.z = 600;

scene.add(camera);

// Create a light, set its position, and add it to the scene.
var light = new THREE.PointLight(0xffffff);
light.position.set(-100, 200, 100);
scene.add(light);

// Add OrbitControls so that we can pan around with the mouse.
var controls = new OrbitControls(camera, renderer.domElement);
controls.noZoom = true;
controls.noPan = true;

// Add axes
// var axes = new THREE.AxesHelper(50);
// scene.add(axes);

// var composer = new THREE.EffectComposer(renderer);
//
// var renderPass = new THREE.RenderPass(scene, camera);
// composer.addPass(renderPass);
// renderPass.renderToScreen = true;
//
// var glitchPass = new THREE.GlitchPass(4);
// composer.addPass(glitchPass);
// glitchPass.renderToScreen = true;

var mouse = new THREE.Vector2(1000,1000);
var start = Date.now();
var glTFGeometry = null;
var particleX = null;
var discTexture = null;
var triangleTexture = null;
var xTexture = null;
var squareTexture = null;
var stripeTexture = null;
var shaderMaterial = null;
var textureSwitch = 0;

var defaultAnimation = null;
var explodeAnimation = null;

var gui = new dat.GUI();
var Configuration = function() {
  this.meshColor = '#B2B2B2';
  this.backgroundColor = '#000000';
  this.dispersionSpeed = 0.2;
  this.particleSize = 50;
  this.texture = 'discTexture';
  this.textureRotationSpeed = 1;
  this.textureXDistort = 0.003;
  this.textureYDistort = 0.003;
  this.distortFrequency = 4;
  this.explode = function() {
    cancelAnimationFrame( defaultAnimation );
    explode();
    setTimeout(function(){
    cancelAnimationFrame( explodeAnimation );
    animate();
  }, 3000);
  };

}

var conf = new Configuration();

var colorBgController = gui.add( conf, 'backgroundColor', ['#000000','#FFFFFF']);
var colorMeshController = gui.add( conf, 'meshColor', ['#FFFFFF', '#000000', '#B2B2B2', '#B3A16E', '#BF873C', '#CCB198', '#C199A0', '#A5BECD', '#92B4AF', '#B0BDA2']);
var dispersionController = gui.add( conf, 'dispersionSpeed', 0, 1);
var particleSizeController = gui.add( conf, 'particleSize', 10, 80);
var textureController = gui.add( conf, 'texture', ['discTexture','triangleTexture','squareTexture','stripeTexture','xTexture']);
var rotationController = gui.add( conf, 'textureRotationSpeed', 0, 10);
var textureXDistortController = gui.add( conf, 'textureXDistort', 0, 0.1);
var textureYDistortController = gui.add( conf, 'textureYDistort', 0, 0.1);
var textureDistortFrequencyController = gui.add( conf, 'distortFrequency', 0, 60);
var explodeController = gui.add( conf, 'explode');
//gui.add(conf, 'backgroundColor');

colorBgController.onChange( function( colorValue  )
{
  // colorValue = colorValue.replace( '#','0x' );
  var colorObject = new THREE.Color( colorValue ) ;
  renderer.setClearColor( colorObject, 1 );
  });

colorMeshController.onChange( function( colorValue  )
{
  var colorObject = new THREE.Color( colorValue ) ;
  shaderMaterial.uniforms.customColor.value = [colorObject.r,colorObject.b,colorObject.g];
});

textureController.onChange( function( textureValue  )
{
  shaderMaterial.uniforms.texture.value = eval(textureValue);
});

// textureXDistortController.onChange( function( distortValue  )
// {
//   shaderMaterial.uniforms.xDistort.value = distortValue;
// });
//
// textureYDistortController.onChange( function( distortValue  )
// {
//   shaderMaterial.uniforms.yDistort.value = distortValue;
// });

textureDistortFrequencyController.onChange( function( distortValue  )
{
  shaderMaterial.uniforms.frequency.value = distortValue;
});


var textureLoader = new THREE.TextureLoader();

var loader = new THREE.GLTFLoader();
loader.load( 'x.glb', function ( gltf ) {

  gltf.scene.traverse( function ( child ) {

      if ( child.isMesh ) {
          glTFGeometry = child.geometry;
          glTFGeometry.center();
          glTFGeometry.rotateY(80);
          glTFGeometry.scale(50,50,50);

          discTexture = textureLoader.load( 'gradient-disc-2.png' );
          triangleTexture = textureLoader.load( 'gradient-triangle.png' );
          squareTexture = textureLoader.load( 'gradient-square.png' );
          stripeTexture = textureLoader.load( 'gradient-stripe.png' );
          xTexture = textureLoader.load( 'plain-x.png' );
          // var particleMaterial =  new THREE.PointsMaterial( { size: 10, sizeAttenuation: false, map: discTexture, alphaTest: 0.3, transparent: true } );
          // particleMaterial.color.setHSL( 1.0, 1.0, 0.5 );
          var color = new THREE.Color();
          color.setHSL(0,0,0.7);
          // values that are constant for all particles during a draw call
          var customUniforms =
          {
            texture:  { type: "t", value: discTexture },
            //time: { type: "f", value: .00025 * ( Date.now() - start )},
            customColor: { type: "vec3", value: [color.r,color.g,color.b] },
            frequency: { type: "f", value: 100},
            // xDistort: { type: "f", value: 0.003},
            // yDistort: { type: "f", value: 0.003}
          };

          //var colors = [];
          var sizes = [];
          var displacement = [];
          var direction = [];
          var rotation = [];
          var xDistort = [];
          var yDistort = [];

    			for ( var i = 0; i < glTFGeometry.attributes.position.count; i ++ ) {
    					//color.setHSL( 0, 0, i / glTFGeometry.attributes.position.count * 1.5 );
    					//colors.push( color.r, color.g, color.b );
              //direction.push( Math.random() > 0.5 ? -1.0 : 1.0);
              var newDir = new THREE.Vector3(getRandomArbitrary(-5,5), getRandomArbitrary(-5,5), getRandomArbitrary(-5,5));
              direction.push(newDir.x, newDir.y, newDir.z);
              rotation.push(0);
              displacement.push(0);
              sizes.push(0);
              xDistort.push(0.003);
              yDistort.push(0.003);
    			}


          shaderMaterial = new THREE.ShaderMaterial(
          {
            uniforms: ustomUniforms,
            vertexShader: Fragment.vertexShader,
            fragmentShader: Fragment.fragmentShader,
  					// blending: THREE.AdditiveBlending,
  					depthTest: false,
  					transparent: true,
  					vertexColors: true
          });

          //glTFGeometry.addAttribute( 'customColor', new THREE.Float32BufferAttribute( colors, 3 ) );
          glTFGeometry.addAttribute( 'customSize', new THREE.Float32BufferAttribute( sizes, 1 ).setDynamic( true ) );
          glTFGeometry.addAttribute( 'displacement', new THREE.Float32BufferAttribute(displacement, 1).setDynamic( true ) );
          glTFGeometry.addAttribute( 'direction', new THREE.Float32BufferAttribute( direction, 3) );
          glTFGeometry.addAttribute( 'rotation', new THREE.Float32BufferAttribute( rotation, 1).setDynamic( true ) );
          glTFGeometry.addAttribute( 'xDistort', new THREE.Float32BufferAttribute( xDistort, 1).setDynamic( true ) );
          glTFGeometry.addAttribute( 'yDistort', new THREE.Float32BufferAttribute( yDistort, 1).setDynamic( true ) );

          particleX = new THREE.Points( glTFGeometry, shaderMaterial );

          particleX.position.set(0, 0, 0);
          particleX.dynamic = true;
          particleX.sortParticles = true;

          scene.add( particleX );

          animate();
          resize();

      }


  } );

  //scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

window.addEventListener('resize', resize);
document.addEventListener( 'mousemove', onDocumentMouseMove, false );

function resize() {
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize( width, height );

}

function onDocumentMouseMove( event ) {
  event.preventDefault();
  mouse.x = ( event.clientX / width ) * 2 - 1;
  mouse.y = - ( event.clientY / height ) * 2 + 1;

}

function explode() {

  var sizes = glTFGeometry.attributes.customSize.array;
  var displacement = glTFGeometry.attributes.displacement.array;
  var rotation = glTFGeometry.attributes.rotation.array;

  for ( var i = 0; i < glTFGeometry.attributes.position.count; i ++ ) {
    displacement[i] += conf.dispersionSpeed;
    sizes[i] = conf.particleSize;
    rotation[i] = conf.textureRotationSpeed;
  }
  glTFGeometry.attributes.displacement.needsUpdate = true;
  glTFGeometry.attributes.customSize.needsUpdate = true;
  glTFGeometry.attributes.rotation.needsUpdate = true;

  composer.render(scene, camera);
  controls.update();
  explodeAnimation = requestAnimationFrame(explode);

}

// Renders the scene
function animate() {

  var time = Date.now() * 0.0035;

  var sizes = glTFGeometry.attributes.customSize.array;
  var displacement = glTFGeometry.attributes.displacement.array;
  var rotation = glTFGeometry.attributes.rotation.array;
  var xDistort = glTFGeometry.attributes.xDistort.array;
  var yDistort = glTFGeometry.attributes.yDistort.array;

  particleX.rotation.y = 0.05 * time;

  for ( var i = 0; i < glTFGeometry.attributes.position.count; i ++ ) {

    var pos = new THREE.Vector3().fromBufferAttribute(glTFGeometry.attributes.position, i);
    pos.applyMatrix4( particleX.matrix );
    pos.project( camera );

    // map to 2D screen space
    pos.x = Math.round( (   pos.x + 1 ) * width  / 2 );
    pos.y = Math.round( ( - pos.y + 1 ) * height / 2 );
    pos.z = 0;

    var xDistance = scale(pos.x, 0, width, -1,1) - mouse.x;
    var yDistance = scale(pos.y, height, 0, -1,1) - mouse.y;
    var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);

    if (distance < 0.15 ) {
      sizes[i] = conf.particleSize * ( 0.1 + Math.sin( 0.1 * i + time ) );
      displacement[i] += conf.dispersionSpeed * (i * 0.002);
      rotation[i] = conf.textureRotationSpeed * ( 0.1 + Math.sin( 0.1 * i + time ) );
      xDistort[i] = conf.textureXDistort * (i * 0.002);
      yDistort[i] = conf.textureYDistort * (i * 0.002);

    }
    else {
      if (sizes[i] > conf.particleSize) {
        sizes[i]--;
      }
      else {
        sizes[i] = conf.particleSize;
      }
      displacement[i] = 0;
      rotation[i] = 0;
      xDistort[i] = 0;
      yDistort[i] = 0;
      //distortion[i] = 0;
    }

  }

  glTFGeometry.attributes.customSize.needsUpdate = true;
  glTFGeometry.attributes.rotation.needsUpdate = true;
  glTFGeometry.attributes.displacement.needsUpdate = true;
  glTFGeometry.attributes.xDistort.needsUpdate = true;
  glTFGeometry.attributes.yDistort.needsUpdate = true;

  composer.render(scene, camera);
  controls.update();
  defaultAnimation = requestAnimationFrame( animate );

}

function scale(num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
