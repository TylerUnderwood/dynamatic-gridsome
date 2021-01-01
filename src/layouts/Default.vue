<template>
  <div id="site" class="site">

    <Header />

    <main id="main" class="main">

      <slot/>

    </main>

    <Footer />

    <site-guidelines />

  </div>
</template>


<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import SiteGuidelines from '../components/SiteGuidelines.vue'
import Modal from '~/js/classes/modal.js'

export default {
  components: {
    Header,
    Footer,
    SiteGuidelines,
  },
  
  methods: {
    initializeModal() {
      document.querySelectorAll('.js--modal').forEach( element => {
        if ( !element.id ) {
          console.log("Modal element needs ID to reference")
        } else {
          new Modal( element.id ).init();
        }
      });
    }
  },

  mounted() {
    this.initializeModal();
  },
}
</script>
