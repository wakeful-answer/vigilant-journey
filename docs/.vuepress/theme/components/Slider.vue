<template lang="html">
  <div class="slider-container">
    <div v-bind:class="'tiny-slider-'+name" >
      <div class="tiny-slider-image" v-for="(image, index) in imageData" :key="'image'+index">
        <img :src="$withBase('/event-images/'+image)" >
      </div>
    </div>
    <div v-bind:class="'nav-slider-'+name">
      <div class="nav-slider-image" v-for="(image, index) in imageData" :key="'nav-image'+index">
        <img :src="$withBase('/event-images/'+image)" >
      </div>
    </div>
  </div>
</template>

<script>
import {tns} from 'tiny-slider/src/tiny-slider';

export default {
  data() {
    return {
      slider: null,
      navSlider: null
    }
  },
  props: {
    imageData: Array,
    name: String
  },
  mounted() {
    this.slider = tns({
      container: '.tiny-slider-'+this.name,
      items: 1,
      controls: false,
      navAsThumbnails: true,
      slideBy: 'page',
      navContainer: ".nav-slider-"+this.name
    });
    this.navSlider = tns({
    	loop: false,
    	container: '.nav-slider-'+this.name,
    	items: this.imageData.length,
    	nav: false,
    	controls: false
    });

  }
}
</script>
