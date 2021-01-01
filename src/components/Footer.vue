<template>
	<footer id="footer" class="footer trim gutter">
    <div class="footer__inner outer">
      Footer
    </div>
	</footer>
</template>


<script>
export default {
  name: 'Footer',

  data() {
    return {
      currentYear: new Date().getFullYear(),
      navLinks: [
        {
          text: "Home",
          link: "/",
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
      subnavLinks: [
        {
          text: "Contractor Resources",
          link: "/resources/contractor",
        },
        {
          text: "Client Portal",
          link: "https://NewhavenBuilders.coconstruct.com",
        },
      ],
    }
  },

  methods: {
    
  },

  mounted() {
    
  }
}
</script>