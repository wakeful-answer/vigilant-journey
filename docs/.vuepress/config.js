module.exports = {
  title: 'WSK X',
  description: 'Festival of the Recently Possible',
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"
      }
    ]
  ],
  themeConfig: {
    nav: [
      { text: "programs", link: "/programs/" },
      { text: "schedule", link: "/schedule/" },
      { text: "venues", link: "/venues/" },
      { text: "info", link: "/info/" }],
    programsNav: [
      { text: "concerts", link: "/programs/concerts/" },
      { text: "exhibition", link: "/programs/exhibition/" },
      { text: "residency", link: "/programs/residency/" }
    ]
  },
  chainWebpack: (config, isServer) => {
  config.module
  .rule('gltf')
  .test(/\.glb$/)
  .use('ignore-loader')
    .loader('ignore-loader')
    .end()
  }
}
