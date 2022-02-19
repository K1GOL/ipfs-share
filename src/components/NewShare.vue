<template>
  <!-- Main contents -->
  <div :class="dynamicBlur" class="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex flex-col items-center justify-center text-zinc-100 border-zinc-100 transition duration-150 ease-in-out z-0">
    <h1 class="text-8xl text-center pa-8">Share something</h1>
    <h2 class="text-4xl text-center pb-8">Share anything</h2>
    <h2 class="text-4xl text-center pb-8">{{ dialog }}</h2>
    <input type="file" id="upload" @change="upload" class="file:border file:text-sm file:border-solid text-center hidden" />
    <label for="upload" class="text-center text-3xl transition duration-150 ease-in-out hover:bg-slate-600 active:bg-slate-100 active:text-zinc-700 active:border-slate-100 rounded border-4 w-1/5">Upload</label>
    <p class="pa-2">Images, videos and audio files fully supported.</p>
    <p class="p-4">Powered by the <a href="https://ipfs.io/" target="_blank" class="underline decoration-solid hover:decoration-double"> Interplanetary File System</a></p>
  </div>
  <!-- Dialog that is shown when a file has been uploaded -->
  <v-dialog :class="dynamicOpacity" v-if="showDialog" v-model="showDialog" class="w-screen h-screen flex place-content-center place-items-center fixed transition duration-150 ease-in-out text-zinc-100 z-10">
    <div class="w-2/5 min-h-1/5 bg-gray-900 drop-shadow-xl rounded-xl flex flex-col items-center justify-center">
    <button class="place-self-end p-4 pb-0" @click="hideDialog">X</button>
      <p class="text-2xl p-2">{{ fileName }}</p>
      <div class="w-full">
        <p class="p-4 max-w-full inline-block underline decoration-solid hover:decoration-double truncate"><a class="max-w-90 truncate" :href="'https://ipfs-share.web.app/' + fileUrl" target="_blank">https://ipfs-share.web.app/{{ fileUrl }}</a></p><br>
        <button @click="copyLinkToClipboard" class="p-4 hover:underline hover:decoration-solid">Copy link to clipboard</button>
      </div> 
    </div>
  </v-dialog>
</template>

<script>
import { loadScript } from 'vue-plugin-load-script';

export default {
  name: 'NewShare',
  data () {
    return {
      showDialog: false,
      dynamicBlur: 'blur-none',
      dynamicOpacity: 'opcaity-0',
      fileUrl: '',
      fileCid: '',
      fileName: '',
      node: null
    }
  },
  methods: {
    upload (event) {
      try {
        this.fileName = event.target.files[0].name;
        this.dynamicBlur = 'blur-sm';
        this.dynamicOpacity = 'opacity-100';
        // Check if file was selected properly:
        if (event.target.files[0]) {
          // It was!
          // Send file to IPFS:
          loadScript('https://cdn.jsdelivr.net/npm/ipfs/dist/index.min.js').then(async () => {
            /* eslint-disable */
            this.node = await Ipfs.create();
            /* eslint-enable no-undef */
            const results = await this.node.add(event.target.files[0]);
            if (results) {
              // The file was successfully uploaded to the IPFS for all to enjoy, get shareable URL:
              // Determine file type first.
              let fileType = 'other';
              if (event.target.files[0].type.indexOf('/') > -1) {
                // Assign specific types only to images, videos and audio files.
                const t = event.target.files[0].type.substring(0, event.target.files[0].type.indexOf('/'));
                if (t === 'image' || t === 'audio' || t === 'video') {
                  fileType = t;
                }
              }             
              this.fileUrl = `?cid=${results.path}&ft=${fileType}`;
              this.fileCid = results.path;
              this.showDialog = true;
            }
          });
        }
      } catch (err) {
        alert('An error occured, and the file could not be uploaded. Please try again.');
      }
      
    },
    hideDialog () {
      // Hides the share link dialog.
      this.showDialog = false;
      this.dynamicBlur = 'blur-none';
      this.dynamicOpacity = 'opacity-0';
      this.node.stop();
    },
    copyLinkToClipboard () {
      // Copies file link to clipboard.
      navigator.clipboard.writeText(`https://ipfs-share.web.app/${this.fileUrl}`);
      alert('Link copied to clipboard!');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  
</style>
