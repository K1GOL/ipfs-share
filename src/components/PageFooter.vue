<template>
  <div class="w-full bg-slate-800 grid grid-cols-2 grid-rows-2 lg:grid-rows-1 lg:grid-cols-3 text-zinc-100 border-zinc-100 text-[.5rem] sm:text-xs md:text-base lg:text-lg truncate">
    <p class="grow text-center"><a href="https://ipfs-share.web.app" target="_blank" class="underline decoration-solid hover:decoration-double">ipfs-share.web.app</a></p>
    <p class="grow text-center">©{{ year }} K1GOL</p>
    <p class="grow text-center"><a href="https://github.com/K1GOL/ipfs-share" target="_blank" class="underline decoration-solid hover:decoration-double">https://github.com/K1GOL/ipfs-share</a></p>
  </div>
</template>

<script>
export default {
  name: 'PageFooter',
  data () {
    return {
      year: (new Date()).getFullYear()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  
</style>
