<template>
  <header>
    <nav
      class="nav-bar"
    >
      <ul class="list">
        <router-link
          :to="'/'"
          class=""
        > <img class="logo-link" :src="$withBase('/x-logo.svg')" /> </router-link>
        <li v-for="item in $site.themeConfig.nav">
          <router-link
            :to="item.link"
            class=""
          ><span class="underline">{{item.text}}</span> <img class="arrow-link" :src="$withBase('/arrow-link.svg')" /></router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
