<template>
  <div id="app" class="app">

    <transition name="fade" mode="out-in">
      <router-view :key="$route.fullPath"></router-view>
    </transition>

  </div>
</template>


<script>
export default {
  
}
</script>


<style lang="css">
  .fade-enter-active, 
  .fade-leave-active {
    transition-property: opacity;
    transition-duration: 300ms;
  }

  .fade-enter-active {
    transition-delay: 300ms;
  }

  .fade-enter, 
  .fade-leave-active {
    opacity: 0
  }
</style>