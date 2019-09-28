<template>
  <transition name="page-anim" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutDown">
    <Content :custom="false"/>
    <!-- <div>{{ this.$site.title }}</div>
    <div>{{ this.$site.description }}</div> -->
    <!-- <transition name="page-anim" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutDown">
    <div
      class=""
      v-if="this.$page.frontmatter.features && this.$page.frontmatter.features.length"
    >
      <div
        class="feature"
        v-for="(feature, index) in this.$page.frontmatter.features"
        :key="index"
      >
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.details }}</p>
      </div>
    </div>
    </transition> -->
  </transition>
</template>

<script>
export default {
}
</script>

<style src="../styles/theme.styl" lang="stylus"></style>
