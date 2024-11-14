<template>
  <ComHeader/>
  <ComFooter />
</template>

<script>
import ComFooter from './components/ComFooter.vue';
import ComHeader from './components/ComHeader.vue';

export default {
  name: 'App',
  components: {
    ComHeader,
    ComFooter,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
