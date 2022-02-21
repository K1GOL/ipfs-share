<template>
  <!-- Media sources -->
  <div class="w-full h-5/6 grow bg-gradient-to-br from-slate-700 to-slate-800 flex flex-col items-center justify-center text-zinc-100 border-zinc-100 transition duration-150 ease-in-out z-0">
    <!-- Audio source -->
    <audio v-if="this.isAudio" ref="player" class="p-4 w-full" controls>
      <source :src="'https://ipfs.io/ipfs/' + this.cid">
    </audio>
    <!-- Video source -->
    <video v-if="this.isVideo" class="w-full h-full" ref="player" controls>
      <source :src="'https://ipfs.io/ipfs/' + this.cid">
    </video>
    <!-- Image source -->
    <img class="max-w-full max-h-full" :src="'https://ipfs.io/ipfs/' + this.cid" v-if="this.isImage" />
    <!-- File loading indicator -->
    <div v-if="!this.mediaLoaded" class="fixed w-full h-1/5 bottom-8 flex flex-col items-center justify-center pointer-events-none">
      <div class="w-1/2 h-5 bg-slate-700 rounded">
        <div class="bg-rose-700 w-10 h-full rounded loading"></div>
      </div>
      <p class="animate-pulse" >File is loading...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewFile',
  data () {
    // Enable the element of the desired type.
    // Get type from URL params.
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const type = urlParams.get('ft');
    const cid = urlParams.get('cid');

    // Check if type is something that can't be previewed, then redirect.       
    if (type !== 'audio' && type !== 'video' && type !== 'image') {
      window.location.href = `https://ipfs.io/ipfs/${cid}`;
    }

    // This checks if the file is loading every 250 ms, shows or hides the loading indicator.
    setInterval(async () => {
      if (this.$refs.player) {
        this.mediaLoaded = (this.$refs.player.readyState >= 3);
      } else {
        this.mediaLoaded = true;
      }
    }, 250);

    return {
      cid: cid,
      isAudio: (type === 'audio'),
      isVideo: (type === 'video'),
      isImage: (type === 'image'),
      mediaLoaded: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @keyframes scroll {
    0% {
      margin-left: 0%;
    }
    50% {
      margin-left: calc(100% - 2.5rem);
    }
    100% {
      margin-left: 0%;
    }
  }

  .loading {
    animation: scroll 3s ease-in-out infinite;
  }
</style>
