module.exports = {
  base: '/vigilant-journey/', 
  title: 'WSK X',
  description: 'Festival of the Recently Possible',
  head: [
    [ "link",{ rel: "stylesheet",href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"}],
    [ "link",{ rel: "stylesheet",href: "https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.2/tiny-slider.css"}]
  ],
  themeConfig: {
    nav: [
      { text: "programs", link: "/programs" },
      { text: "schedule", link: "/schedule/" },
      { text: "venues", link: "/venues/" },
      { text: "info", link: "/info/" }],
    programsNav: [
      { class:"concerts", text: "concerts", link: "/concerts/" },
      { class:"exhibition", text: "exhibition", link: "/exhibition/" },
      { class:"residency", text: "residency", link: "/residency/" },
      { class:"special-programs", text: "special programs", link: "/special-programs" },
      { class:"talks", text: "talks", link: "/talks/" },
      { class:"workshops", text: "workshops", link: "/workshops/" },
      { class:"film-screening", text: "film screening", link: "/film-screening/" },
      { class:"market", text: "market", link: "/market/" }
    ]
  },
  plugins: {
    'clean-urls': {
      normalSuffix: '',
      indexSuffix: '',
    },
  }
}
