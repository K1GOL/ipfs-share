<template>
  <div class="w-screen h-screen flex flex-col overflow-hidden">
    <InstallPrompt />
    <ViewFile v-if="viewMode()" />
    <NewShare v-else />
    <PageFooter />
  </div>
</template>

<script>
import NewShare from './components/NewShare.vue';
import PageFooter from './components/PageFooter.vue';
import ViewFile from './components/ViewFile.vue';
import InstallPrompt from './components/InstallPrompt.vue';

export default {
  name: 'App',
  components: {
    NewShare,
    PageFooter,
    ViewFile,
    InstallPrompt
  },
  methods: {
    viewMode: () => {
      // View mode shows the shared file when URL parameters are given.
      // Else shows normal share new file interface.
      // Get URL params:
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const cid = urlParams.get('cid');
      const type = urlParams.get('ft');
      // If both file type and CID were provided, go into view mode:
      if (cid && type) {
        return true;
      } else {
        return false;
      }
    }
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
