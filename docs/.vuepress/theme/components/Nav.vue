<template>
  <header>
    <nav
      class="nav-bar"
      v-bind:class="{ 'bg-black': !this.$page.frontmatter.home }"
    >
      <ul class="list">
        <transition name="logo-anim" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <router-link
          :to="'/'"
          class=""
          v-if="!this.$page.frontmatter.home"
        > <img class="logo-link" :src="$withBase('/x-logo.svg')" /> </router-link>
        </transition>
        <li v-for="item in $site.themeConfig.nav">
          <router-link
            :to="item.link"
            class=""
          ><span class="underline">{{item.text}}</span> <img class="arrow-link" :src="$withBase('/arrow-link.svg')" /></router-link>
        </li>
        <li>
          <router-link
            :to="'/nusasonic'"
          > <img class="nusa-link" :src="$withBase('/partners/nusasonic-logo.svg')" /> </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
