<template>
  <div class="w-full h-5/6 grow bg-gradient-to-br from-slate-700 to-slate-800 flex flex-col items-center justify-center text-zinc-100 border-zinc-100 transition duration-150 ease-in-out z-0">
    <audio v-if="this.isAudio"  controls>
      <source :src="'https://ipfs.io/ipfs/' + this.cid">
    </audio>
    <video v-if="this.isVideo" class="w-full h-full" controls>
      <source :src="'https://ipfs.io/ipfs/' + this.cid">
    </video>
    <img :src="'https://ipfs.io/ipfs/' + this.cid" v-if="this.isImage" />
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

    return {
      cid: cid,
      isAudio: (type === 'audio'),
      isVideo: (type === 'video'),
      isImage: (type === 'image')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  
</style>
