<template>
  <div class="w-screen h-screen flex flex-col">
    <NewShare />
    <PageFooter />
  </div>
</template>

<script>
import NewShare from './components/NewShare.vue';
import PageFooter from './components/PageFooter.vue';

export default {
  name: 'App',
  components: {
    NewShare,
    PageFooter
  }
}
</script>

<style lang="scss">
@import 'tailwind.css';
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Secular+One&display=swap');
$mainFont: 'Nunito', Verdana, sans-serif;
$headingFont: 'Secular One', Helvetica, serif;

#app {
  font-family: $mainFont;
}

h1 {
    font-family: $headingFont;
  }
</style>
