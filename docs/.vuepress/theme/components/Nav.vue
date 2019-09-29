<template>
  <header>
    <nav
      class="nav-bar"
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
        <router-link
          :to="'/nusasonic'"
        > <img class="nusa-link" :src="$withBase('/nusasonic-logo.svg')" /> </router-link>
      </ul>
    </nav>
  </header>
</template>
