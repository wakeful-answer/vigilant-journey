module.exports = {
  title: 'WSK X',
  description: 'Festival of the Recently Possible',
  head: [
    [ "link",{ rel: "stylesheet",href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"}],
    [ "link",{ rel: "stylesheet",href: "https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.2/tiny-slider.css"}],
    // [ "link",{ rel: "stylesheet",href: "/jquery.skedTape.css"}],
    [ "meta",{ name: "viewport", content: "width=device-width,initial-scale=1.0"}],
    [ "meta",{ property: "og:url", content: "http://www.wsk.io"}],
    [ "meta",{ property: "og:type", content: "website"}],
    [ "meta",{ property: "og:description", content: "WSK X"}],
    [ "meta",{ property: "og:title", content: "Festival of The Recently Possible"}],
    [ "meta",{ property: "og:image", content: "/og-image.jpg"}]
    // ['script', {src: 'https://code.jquery.com/jquery-3.4.1.min.js'}]
  ],
  themeConfig: {
    nav: [
      { text: "programs", link: "/programs" },
      { text: "schedule", link: "/schedule/" },
      { text: "venues", link: "/venues/" },
      { text: "tickets", link: "/tickets/" },
      { text: "info", link: "/info/" }],
    programsNav: [
      { class:"concerts", text: "concerts", link: "/concerts/" },
      { class:"exhibition", text: "exhibition", link: "/exhibition/" },
      { class:"residency", text: "residency", link: "/residency/" },
      { class:"special-programs", text: "special programs", link: "/special-programs" },
      { class:"talks", text: "talks", link: "/talks/" },
      { class:"workshops", text: "workshops", link: "/workshops/" },
      { class:"market", text: "market", link: "/market/" }
    ]
  },
  // plugins: {
  //   'clean-urls': {
  //     normalSuffix: '',
  //     indexSuffix: '',
  //   },
  // }
}
