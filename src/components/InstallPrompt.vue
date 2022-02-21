<template>
  <!-- Install ipfs-share app -prompt at the top of the page. -->
  <div v-if="this.showInstallPrompt" class="w-full fixed top-0 bg-rose-900 flex flex-row place-content-center gap-1 sm:gap-2 md:gap-3 lg:gap-5 p-1 shadow-lg text-zinc-100 border-zinc-100 truncate z-10 text-xs sm:text-lg md:text-2xl text-center">
    <p class="p-1">Install the ipfs-share app:</p>
    <button @click="onInstall()" class="bg-emerald-700 rounded p-1 shadow-md hover:shadow-sm hover:bg-emerald-900 transition duration-150 ease-in-out">Install</button>
  </div>
</template>

<script>
import { onBeforeMount } from '@vue/runtime-core';
export default {
  name: 'InstallPrompt',
  data () {
    return {
      showInstallPrompt: false
    }
  },
  methods: {
    onInstall () {
      // Hide our user interface that shows our A2HS button
      this.showInstallPrompt = false;
      // Show the prompt
      window.deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      window.deferredPrompt.userChoice.then(() => {
          window.deferredPrompt = null;
      });
    }
  },
  setup () {
    onBeforeMount(() => {
      // Event listener for showing the install prompt.
      // Copied straight from MDN.
      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        window.deferredPrompt = e;
        // Update UI to notify the user they can add to home screen
        this.showInstallPrompt = true;
      });
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  
</style>
