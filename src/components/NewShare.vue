<template>
  <!-- Main contents -->
  <div :class="dynamicBlur" class="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex flex-col items-center justify-center text-zinc-100 border-zinc-100 transition duration-150 ease-in-out z-0">
    <h1 class="lg:text-8xl md:text-6xl sm:text-4xl text-center pa-8">Share something</h1>
    <h2 class="lg:text-4xl md:text-3xl sm:text-2xl text-center pb-8">Share anything</h2>
    <input type="file" ref="upload" @change="upload" class="file:border file:text-sm file:border-solid text-center hidden" />
    <div @click="fileSelect" class="lg:w-2/5 md:w-3/5 sm:w-4/5 h-1/4 flex flex-col justify-center cursor-pointer transition duration-150 ease-in-out hover:bg-slate-600 active:bg-slate-100 active:text-zinc-700 active:border-slate-100 rounded border-4">
      <p class="text-center lg:text-6xl md:text-4xl sm:text-3xl">Upload</p>
    </div>
    <p class="p-4">Powered by the <a href="https://ipfs.io/" target="_blank" class="underline decoration-solid hover:decoration-double"> Interplanetary File System</a></p>
  </div>
  <!-- Dialog that is shown when a file has been uploaded -->
  <v-dialog :class="dynamicOpacity" v-if="showDialog" v-model="showDialog" class="w-screen h-screen flex place-content-center place-items-center fixed transition duration-150 ease-in-out text-zinc-100 z-10">
    <div class="md:w-4/6 sm:w-full min-h-1/5 bg-gray-900 drop-shadow-xl rounded-xl flex flex-col items-center justify-center">
    <button class="place-self-end p-4 pb-0" @click="hideDialog">X</button>
      <p class="text-2xl p-2">{{ fileName }}</p>
      <p class="p-2 text-center">The file is being distributed on the IPFS network.<br>Keep ipfs-share open to increase availability of this file in the future.</p>
      <div class="w-full">
        <p class="p-4 grow w-full inline-block underline decoration-solid hover:decoration-double text-center truncate"><a class="w-full truncate text-center" :href="'https://ipfs-share.web.app/' + fileUrl" target="_blank">https://ipfs-share.web.app/{{ fileUrl }}</a></p><br>
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
      showDialog: false,            // If results dialog is shown or not.
      dynamicBlur: 'blur-none',     // Blurs the background of the results dialog.
      dynamicOpacity: 'opcaity-0',  // Sets the opacity of the results dialog, making transitions possible.
      fileUrl: '',                  // https://ipfs-share.web.app/ URL of the shared file. 
      fileCid: '',                  // CID of the shared file.
      fileName: '',                 // Name of the shared file.
      node: null                    // Stores the IPFS node.
    }
  },
  methods: {
    fileSelect () {
      // Shows file select.
      this.$refs.upload.click();
    },
    upload (event) {
      try {
        // Show dialog.
        this.fileName = event.target.files[0].name;
        this.dynamicBlur = 'blur-sm';
        this.dynamicOpacity = 'opacity-100';
        // Check if file was selected properly:
        if (event.target.files[0]) {
          // It was!
          // Send file to IPFS:
          loadScript('https://cdn.jsdelivr.net/npm/ipfs/dist/index.min.js').then(async () => {
            /* eslint-disable no-undef */
            if (!this.node) {
              this.node = await Ipfs.create();
            }
            const results = await this.node.add(event.target.files[0]);
            if (results) {
              // The file was successfully uploaded to the IPFS, get shareable URL:
              // Determine file type first.
              let fileType = 'other';
              if (event.target.files[0].type.indexOf('/') > -1) {
                // Assign specific types only to images, videos and audio files.
                const t = event.target.files[0].type.substring(0, event.target.files[0].type.indexOf('/'));
                if (t === 'image' || t === 'audio' || t === 'video') {
                  fileType = t;
                }
              }
              // Set dialog values and enable it.   
              this.fileUrl = `?cid=${results.path}&ft=${fileType}`;
              this.fileCid = results.path;
              this.showDialog = true;
            }
            /* eslint-enable no-undef */
          });
        }
      } catch (err) {
        alert('An error occured, and the file could not be uploaded. Please try again.');
      }
      
    },
    hideDialog () {
      // Hides the share link dialog.
      this.dynamicBlur = 'blur-none';
      this.dynamicOpacity = 'opacity-0';
      // Timeout to allow opacity fading.
      setTimeout(() => { this.showDialog = false; }, 500);
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
