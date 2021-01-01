<template>
  <header id="header" class="header gutter">
    <div class="header__inner outer">

      <nav class="header__nav nav">
        <g-link to="/" appear="fade-down" appear-delay="300">Home</g-link>
        <g-link to="/about/" appear="fade-down" appear-delay="500">About</g-link>
      </nav> <!-- END header__nav -->

      <div class="mar-l hide lg:show">
        <a href="/documentation" class="btn btn--stout">
          <span class="meta-fix">Docs</span>
        </a>
      </div>
      
      <button class="menu-button" toggle="menu">
        <span class="menu-button__bar"></span>
        <span class="menu-button__bar"></span>
        <span class="menu-button__bar"></span>
      </button> <!-- END menu-button -->
      
      <div id="menu" class="menu js--modal">
        <div class="menu__inner outer">
          <nav class="menu__nav">
            <g-link class="nav__link link" to="/">Home</g-link>
            <g-link class="nav__link link" to="/about/">About</g-link>
          </nav>
        </div>
      </div> <!-- END menu -->

    </div>
  </header>
</template>


<script>
export default {
  name: 'Header',

  components: {
    
  },

  data() {
    return {
      menuLinks: [
        {
          text: "Home",
          link: "/",
        },
        {
          text: "Projects",
          link: "/projects/",
        },
        {
          text: "About",
          link: "/about/",
        },
        {
          text: "Info",
          link: "/info/",
        },
        {
          text: "Contact",
          link: "/contact/",
        },
      ],
      menuSubLinks: [
        {
          text: "Ken’s Resume",
          link: "/resources/ken_rideout_resume.pdf",
          isBlank: true,
        },
        {
          text: "Contractor Resources",
          link: "/resources/",
        },
        {
          text: "Client Portal",
          link: "https://newhavenbuilders.coconstruct.com",
        },
      ],
    }
  },

  methods: {

  },

  mounted() {

  },
}
</script>