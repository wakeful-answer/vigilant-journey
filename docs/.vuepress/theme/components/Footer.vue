<template>
  <footer>
    <ul class="list">
      <li>
        <a href="https://instagram.com/wsk.io"><span class="underline">INSTAGRAM</span></a>
        <img class="arrow-link" :src="$withBase('/arrow-link.svg')" />
      </li>
      <li>
        <a href="https://facebook.com/wsk.io"><span class="underline">FACEBOOK</span></a>
        <img class="arrow-link" :src="$withBase('/arrow-link.svg')" />
      </li>
      <li>
        <a href="https://www.youtube.com/channel/UCiNKu5vYpvqPJ69NU5aGkmA/videos"><span class="underline">YOUTUBE</span></a>
        <img class="arrow-link" :src="$withBase('/arrow-link.svg')" />
      </li>
    </ul>
    <div class="text-center">2019 © WSK</div>
    <div class="partner-logos">
      <div class="logo" v-for="(img, index) in images" :key="'partner-logo'+index">
        <img :src="$withBase('/partners/'+img.img)" v-bind:alt="img.title" class="" >
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    data() {
      return {
        images: [
          {title: 'Nusasonic', img: 'nusasonic-logo.svg'},
          {title: 'CTM Festival', img: 'partner-logos-02.svg'},
          {title: 'PlayFreely BlackKaji', img: 'partner-logos-03.svg'},
          {title: 'Yes No Klub', img: 'partner-logos-04.svg'},
          {title: 'Goethe Institut', img: 'partner-logos-05.svg'},
          {title: 'Japan Foundation Asia Center', img: 'partner-logos-06.svg'},
          {title: 'Arete', img: 'partner-logos-07.svg'},
          {title: 'Ateneo Art Gallery', img: 'partner-logos-08.svg'},
          {title: 'XX XX', img: 'partner-logos-09.svg'},
          {title: 'Dulo', img: 'partner-logos-10.svg'},
          {title: 'Para Sa Sining', img: 'partner-logos-11.svg'},
          {title: 'Kwago', img: 'partner-logos-12.svg'},
          {title: 'Green Papaya Art Projects', img: 'partner-logos-13.svg'},
          {title: 'PlayFreely BlackKaji', img: 'partner-logos-14.svg'},
          {title: 'Los Otros', img: 'partner-logos-15.svg'}
        ]
      }
    }
  }

</script>
