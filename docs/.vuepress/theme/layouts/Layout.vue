<template>
  <div class="theme-container">
    <transition name="logo-anim" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="subtitle"  v-if="this.$page.frontmatter.home">
        <h2>FESTIVAL OF </h2>
        <h2>THE RECENTLY </h2>
        <h2>POSSIBLE </h2>
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
            </div>
          </div>
          <div class="event-images" >
            <Slider v-bind:name="content.class" v-bind:imageData="content.images" v-if="content.images" ></Slider>
          </div>
        </div>
      </div>
      <Content/>
    </div>
    <div id="three-canvas" v-bind:class="{ opacitydown: !this.$page.frontmatter.home }">
    </div>
    <Footer v-if="!this.$page.frontmatter.home && !this.$page.frontmatter.programs" />
  </div>
</template>

<script>
// import * as Sketch from '../sketch';
import * as THREE from 'three';
// import OrbitControls from 'three-orbitcontrols'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as dat from 'dat.gui';
import * as Fragment from '../fragmentshader';
import Nav from "@theme/components/Nav";
import Footer from "@theme/components/Footer";
import Slider from "@theme/components/Slider";
export default {
  components: { Nav, Footer, Slider },
  name: "Layout",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null
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

      this.mesh = null;
      this.mouse = new THREE.Vector2(0,0);
      this.glTFGeometry = null;

      let discTexture = null;
      let triangleTexture = null;
      let xTexture = null;
      let squareTexture = null;
      let stripeTexture = null;
      let shaderMaterial = null;
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

                discTexture = textureLoader.load( './gradient-disc-2.png' );
                triangleTexture = textureLoader.load( './gradient-triangle.png' );
                squareTexture = textureLoader.load( './gradient-square.png' );
                stripeTexture = textureLoader.load( './gradient-stripe.png' );
                xTexture = textureLoader.load( './plain-x.png' );

                let color = new THREE.Color();
                color.setHSL(0,0,0.7);

                let customUniforms =
                {
                  texture:  { type: "t", value: discTexture },
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

                shaderMaterial = new THREE.ShaderMaterial(
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

                this.mesh = new THREE.Points( this.glTFGeometry, shaderMaterial );

                this.mesh.position.set(0, 0, 0);
                this.mesh.dynamic = true;
                this.mesh.sortParticles = true;

                this.scene.add( this.mesh );

                this.resize();
                this.animate();
            }


        }.bind(this) );

        //this.scene.add( gltf.scene );

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

      this.mesh.rotation.y = 0.05 * time;

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
          sizes[i] = 1 * ( 0.1 + Math.sin( 0.1 * i + time ) );
          displacement[i] += 0.001 * (i * 0.002);
          rotation[i] = 0.001 * ( 0.1 + Math.sin( 0.1 * i + time ) );
          xDistort[i] = 0.001 * (i * 0.002);
          yDistort[i] = 0.001 * (i * 0.002);

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
  handleScroll (event) {
    //this.isUserScrolling = (window.scrollY > 0);
  }
  },
  mounted() {
    // window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.resize);
    window.addEventListener('mousemove', this.windowMouseMove);
    this.init();
  }
}

</script>

<style src="../styles/theme.styl" lang="stylus"></style>
