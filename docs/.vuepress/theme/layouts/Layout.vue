<template>
  <div class="theme-container">
    <transition name="logo-anim" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="subtitle"  v-if="this.$page.frontmatter.home">
        <span>FESTIVAL OF </span>
        <span>THE RECENTLY </span>
        <span>POSSIBLE </span>
      </div>
    </transition>
    <transition name="logo-anim" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="frontpage-logo" v-if="this.$page.frontmatter.home">
        <img src="wsk-logo.svg" >
      </div>
    </transition>
    <Nav />
    <div class="content-container">
      <transition name="page-anim" enter-active-class="animated fadeInLeft">
        <div class="program-links" v-if="this.$page.frontmatter.programs">
          <ul class="list">
            <li v-for="item in $site.themeConfig.programsNav">
              <router-link :to="item.link" :class=item.class>
                {{item.text}}
                <svg class= "big-arrow" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.85 40.85"><defs><style>.cls-1{fill:#fff}</style></defs><title>X</title><path :class=item.class class="cls-1 " d="M6.43 1.84L25 20.43 6.43 39l-4.59-4.57 13.08-13.08.92-.92-.92-.92L1.84 6.43l4.59-4.59m0-1.84L0 6.43l14 14-14 14 6.43 6.42 20.42-20.42L6.43 0z"/></svg>
              </router-link>
            </li>
          </ul>
        </div>
      </transition>
      <transition name="page-anim">
        <div class="page-title" v-if="!this.$page.frontmatter.home && !this.$page.frontmatter.programPage" >
          <h1>{{ this.$page.frontmatter.title }} </h1>
          <img :src="$withBase('/arrow-down.svg')" />
        </div>
      </transition>
      <transition name="page-anim">
        <div v-if="this.$page.frontmatter.programPage">
          <div class="page-title">
            <h1>PROGRAMS</h1>
            <img :src="$withBase('/arrow-down.svg')" />
          </div>
          <div class="program-page-title" v-bind:class="this.$page.frontmatter.class">
            {{ this.$page.frontmatter.title }}
            <svg class= "big-arrow" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.85 40.85"><defs><style>.cls-1{fill:#fff}</style></defs><title>X</title><path class="cls-1" v-bind:class="this.$page.frontmatter.class" d="M6.43 1.84L25 20.43 6.43 39l-4.59-4.57 13.08-13.08.92-.92-.92-.92L1.84 6.43l4.59-4.59m0-1.84L0 6.43l14 14-14 14 6.43 6.42 20.42-20.42L6.43 0z"/></svg>
            <div class="date">
              {{ this.$page.frontmatter.date }}
            </div>
          </div>
        </div>
      </transition>
      <div class="event-container" v-bind:class="this.$page.frontmatter.class" v-if="this.$page.frontmatter.content && this.$page.frontmatter.content.length">
        <div class="event-block" v-for="(content, index) in this.$page.frontmatter.content" :key="index">
          <div class="event-description">
            <div class="event-title">
              <h1>{{ content.title }}</h1>
            </div>
            <div class="event-artists">
              <div class="event-artist" v-for="(artist, index) in content.artists" :key="'artist'+index" >
                {{ artist }}
              </div>
            </div>
            <div class="event-details">
              <ul class="list">
                <li>{{ content.date }}</li>
                <li>{{ content.time }}</li>
                <li>{{ content.venue }}</li>
              </ul>
            </div>
            <div class="event-desc">
              <p v-for="(p, index) in content.desc" :key="'event'+index">  {{ p }} </p>
              <div style="display: inline-block;padding-right: 1em" v-for="(link, index) in content.links" :key="'link'+index">
                  <a v-bind:href="link.link">{{link.title}}</a>
              </div>
            </div>
          </div>
          <div class="event-images" >
            <ClientOnly>
              <Slider v-bind:name="content.class" v-bind:imageData="content.images" v-if="content.images" ></Slider>
            </ClientOnly>
          </div>
        </div>
      </div>
      <Content/>
      <TimeTable v-if="this.$page.frontmatter.title == 'schedule'" />
      <div class="venues-container" v-if="this.$page.frontmatter.title == 'venues'">
        <div class="google-maps-embed">
          <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1tJF0UhsCjFdpeLkJecfToCkgt7Xi11t5" height="480"></iframe>
        </div>
        <div class="venue-info">
          <div class="venue" v-for="(venue, index) in this.$page.frontmatter.venues" :key="'venue'+index">
            <div class="venue-title">
              {{venue.title}}
            </div>
            <div class="venue-desc">
              {{venue.desc}}
            </div>
          </div>
          <span style="color: #000">{{ this.$page.frontmatter.filler }}</span>
        </div>
      </div>
    </div>
    <!-- <div id="gui-container" v-if="this.$page.frontmatter.home"></div> -->
    <div id="three-canvas" v-bind:class="{ opacitydown: !this.$page.frontmatter.home }"></div>
    <Footer v-if="!this.$page.frontmatter.home && !this.$page.frontmatter.programs" />
  </div>
</template>

<script>
// import * as Sketch from '../sketch';
import * as THREE from 'three';
// import OrbitControls from 'three-orbitcontrols'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import * as dat from 'dat.gui';
import * as Fragment from '../fragmentshader';
import Nav from "@theme/components/Nav";
import Footer from "@theme/components/Footer";
import Slider from "@theme/components/Slider";
import TimeTable from "@theme/components/TimeTable";
export default {
  components: { Nav, Footer, Slider, TimeTable },
  name: "Layout",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      conf: null,
      gui: null,
      glTFGeometry: null,
      discTexture: null,
      stripeTexture: null,
      triangleTexture: null,
      xTexture: null,
      squareTexture: null,
      shaderMaterial: null,
      intervalAnimation: null
    }
  },
  methods: {
  log: function (item) {
    console.log(item)
  },
  init: function() {

      let canvas = document.getElementById('three-canvas');

      this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setClearColor( 0x000000, 1 );
      this.renderer.setPixelRatio( canvas.devicePixelRatio );
      canvas.appendChild(this.renderer.domElement);

      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.01, 10000);
      this.camera.position.z = 10;

      this.scene.add(this.camera);

      // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      // this.controls.noZoom = true;
      // this.controls.noPan = true;

      let light = new THREE.PointLight(0xffffff);
      light.position.set(-100, 200, 100);
      this.scene.add(light);

      // this.mesh = null;
      // this.glTFGeometry = null;
      this.mouse = new THREE.Vector2(0,0);

      this.discTexture = null;
      this.triangleTexture = null;
      this.xTexture = null;
      this.squareTexture = null;
      this.stripeTexture = null;

      this.shaderMaterial = null;

      let textureSwitch = 0;

      let defaultAnimation = null;
      let explodeAnimation = null;

      let textureLoader = new THREE.TextureLoader();

      let loader = new GLTFLoader();
      loader.load( './x.glb', gltf => {

        gltf.scene.traverse( function ( child ) {

            if ( child.isMesh ) {
                this.glTFGeometry = child.geometry;
                this.glTFGeometry.center();

                this.discTexture = textureLoader.load( './gradient-disc-2.png' );
                this.triangleTexture = textureLoader.load( './gradient-triangle.png' );
                this.squareTexture = textureLoader.load( './gradient-square.png' );
                this.stripeTexture = textureLoader.load( './gradient-stripe.png' );
                this.xTexture = textureLoader.load( './plain-x.png' );

                let color = new THREE.Color();
                color.setHSL(0,0,0.7);

                let customUniforms =
                {
                  texture:  { type: "t", value: this.discTexture },
                  customColor: { type: "vec3", value: [color.r,color.g,color.b] },
                  frequency: { type: "f", value: 100}
                };

                let colors = [];
                let sizes = [];
                let displacement = [];
                let direction = [];
                let rotation = [];
                let xDistort = [];
                let yDistort = [];

          			for ( let i = 0; i < this.glTFGeometry.attributes.position.count; i ++ ) {

                    let newDir = new THREE.Vector3(this.getRandomArbitrary(-5,5), this.getRandomArbitrary(-5,5), this.getRandomArbitrary(-5,5));
                    direction.push(newDir.x, newDir.y, newDir.z);
                    rotation.push(0);
                    displacement.push(0);
                    sizes.push(0);
                    xDistort.push(0.003);
                    yDistort.push(0.003);
          			}

                this.shaderMaterial = new THREE.ShaderMaterial(
                {
                   uniforms: customUniforms,
                   vertexShader: Fragment.vertexShader,
                   fragmentShader: Fragment.fragmentShader,
        					 depthTest: false,
        					 transparent: true,
        					 vertexColors: true
                });

                this.glTFGeometry.addAttribute( 'customSize', new THREE.Float32BufferAttribute( sizes, 1 ).setDynamic( true ) );
                this.glTFGeometry.addAttribute( 'displacement', new THREE.Float32BufferAttribute(displacement, 1).setDynamic( true ) );
                this.glTFGeometry.addAttribute( 'direction', new THREE.Float32BufferAttribute( direction, 3) );
                this.glTFGeometry.addAttribute( 'rotation', new THREE.Float32BufferAttribute( rotation, 1).setDynamic( true ) );
                this.glTFGeometry.addAttribute( 'xDistort', new THREE.Float32BufferAttribute( xDistort, 1).setDynamic( true ) );
                this.glTFGeometry.addAttribute( 'yDistort', new THREE.Float32BufferAttribute( yDistort, 1).setDynamic( true ) );

                this.mesh = new THREE.Points( this.glTFGeometry, this.shaderMaterial );

                this.mesh.position.set(0, 0, 0);
                this.mesh.dynamic = true;
                this.mesh.sortParticles = true;

                this.scene.add( this.mesh );
                this.animate();

            }

        }.bind(this) );

      }, undefined, function ( error ) {

      	console.error( error );

      } );


  },
  animate: function() {
      requestAnimationFrame(this.animate);

      let sizes = this.glTFGeometry.attributes.customSize.array;
      let displacement = this.glTFGeometry.attributes.displacement.array;
      let rotation = this.glTFGeometry.attributes.rotation.array;
      let xDistort = this.glTFGeometry.attributes.xDistort.array;
      let yDistort = this.glTFGeometry.attributes.yDistort.array;

      let time = Date.now() * 0.0035;

      this.mesh.rotation.y = 0.08 * time;

      for ( let i = 0; i < this.glTFGeometry.attributes.position.count; i ++ ) {

        let pos = new THREE.Vector3().fromBufferAttribute(this.glTFGeometry.attributes.position, i);
        pos.applyMatrix4( this.mesh.matrix );
        pos.project( this.camera );

        // map to 2D screen space
        pos.x = Math.round( (   pos.x + 1 ) * window.innerWidth  / 2 );
        pos.y = Math.round( ( - pos.y + 1 ) * window.innerHeight / 2 );
        pos.z = 0;

        let xDistance = this.scale(pos.x, 0, window.innerWidth, -1,1) - this.mouse.x;
        let yDistance = this.scale(pos.y, window.innerHeight, 0, -1,1) - this.mouse.y;
        let distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);


        if (distance < 0.15 ) {
          sizes[i] = this.conf.particleSize * ( 0.1 + Math.sin( 0.1 * i + time ) );
          displacement[i] += this.conf.dispersionSpeed * (i * 0.002);
          rotation[i] = this.conf.textureRotationSpeed * ( 0.1 + Math.sin( 0.1 * i + time ) );
          xDistort[i] = this.conf.textureXDistort * (i * 0.002);
          yDistort[i] = this.conf.textureYDistort * (i * 0.002);

        }
        else {
          if (sizes[i] > 1) {
            sizes[i]--;
          }
          else {
            sizes[i] = 1;
          }
          displacement[i] = 0;
          rotation[i] = 0;
          xDistort[i] = 0;
          yDistort[i] = 0;
          //distortion[i] = 0;
        }

      }

      this.glTFGeometry.attributes.customSize.needsUpdate = true;
      this.glTFGeometry.attributes.rotation.needsUpdate = true;
      this.glTFGeometry.attributes.displacement.needsUpdate = true;
      this.glTFGeometry.attributes.xDistort.needsUpdate = true;
      this.glTFGeometry.attributes.yDistort.needsUpdate = true;

      this.renderer.render(this.scene, this.camera);
      // this.controls.update();
  },
  getRandomArbitrary: function(min, max) {
    return Math.random() * (max - min) + min;
  },
  scale: function(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  },
  resize: function() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize( window.innerWidth, window.innerHeight );
  },
  windowMouseMove: function( event ) {
    event.preventDefault();
    this.mouse.x = ( event.clientX /  window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( event.clientY /  window.innerHeight ) * 2 + 1;
  },
  randomize: function() {

    let colorChoices = ['#FFFFFF', '#B2B2B2', '#B3A16E', '#BF873C', '#CCB198', '#C199A0', '#A5BECD', '#92B4AF', '#B0BDA2'];
    let textureChoices = ['discTexture','triangleTexture','squareTexture','stripeTexture','xTexture'];

    this.intervalAnimation = setInterval(function(){
      this.shaderMaterial.uniforms.texture.value = eval('this.'+(textureChoices[Math.floor(Math.random() * textureChoices.length)]));
      let colorObject = new THREE.Color( colorChoices[Math.floor(Math.random() * colorChoices.length)] );
      this.shaderMaterial.uniforms.customColor.value = [colorObject.r,colorObject.b,colorObject.g];
      // shaderMaterial.uniforms.frequency.value = Math.random() * 60;
      this.conf.particleSize = this.getRandomArbitrary(1,4);
      this.conf.dispersionSpeed = this.getRandomArbitrary(0.005,0.01);
      this.conf.textureRotationSpeed = this.getRandomArbitrary(0,10);
      this.conf.textureXDistort = this.getRandomArbitrary(0,0.1);
      this.conf.textureYDistort = this.getRandomArbitrary(0,0.1);
      this.conf.distortFrequency = this.getRandomArbitrary(0,5);

      // for (let i = 0; i < this.gui.__controllers.length; i++) {
      //   this.gui.__controllers[i].updateDisplay();
      // }
    }.bind(this), 2000);

  },
  // handleScroll (event) {
  //   //this.isUserScrolling = (window.scrollY > 0);
  // }
  },
  mounted() {
    import('dat.gui').then(module => {

      // this.gui = new module.GUI({ autoPlace: false });
      //
      // let guiContainer = document.getElementById('gui-container');
      // guiContainer.appendChild(this.gui.domElement);

      let Configuration = function() {
        // this.meshColor = '#B2B2B2';
        this.dispersionSpeed = 0.001;
        this.particleSize = 1;
        this.texture = eval('this.discTexture');
        this.textureRotationSpeed = 1;
        this.textureXDistort = 0.003;
        this.textureYDistort = 0.003;
        this.distortFrequency = 4;
      }

      this.conf = new Configuration();
      // let textureController = this.gui.add( this.conf, 'texture', ['discTexture','triangleTexture','squareTexture','stripeTexture','xTexture']);
      // let colorMeshController = this.gui.add( this.conf, 'meshColor', ['#FFFFFF', '#B2B2B2', '#B3A16E', '#BF873C', '#CCB198', '#C199A0', '#A5BECD', '#92B4AF', '#B0BDA2']);
      // let dispersionController = this.gui.add( this.conf, 'dispersionSpeed', 0, 0.01);
      // let particleSizeController = this.gui.add( this.conf, 'particleSize', 0.5, 2);
      // let rotationController = this.gui.add( this.conf, 'textureRotationSpeed', 0, 10);
      // let textureXDistortController = this.gui.add( this.conf, 'textureXDistort', 0, 0.1);
      // let textureYDistortController = this.gui.add( this.conf, 'textureYDistort', 0, 0.1);
      // let textureDistortFrequencyController = this.gui.add( this.conf, 'distortFrequency', 0, 10);
      //
      // textureDistortFrequencyController.onChange( function( distortValue  )
      // {
      //   this.shaderMaterial.uniforms.frequency.value = distortValue;
      // }.bind(this));
      //
      // this.gui.close();
    });

    this.init();
    this.resize();
    this.randomize();

    window.addEventListener('resize', this.resize);
    window.addEventListener('mousemove', this.windowMouseMove);
  }
}

</script>

<style src="../styles/theme.styl" lang="stylus"></style>
