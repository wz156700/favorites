<script setup>
import Header from "@/views/header.vue";
import { onMounted, ref } from "vue";

let fileList = ref([]);

const cb = async () => {
  let file = await myApi.getFileList();
  fileList.value = file;
};

onMounted(async () => {
  myApi.getFileListOnMain(cb);
  let file = await myApi.getFileList();
  fileList.value = file;
});
</script>

<template>
  <Header />
  <div class="image-container">
    <img :src="`/upload/${item}`" alt="" v-for="item in fileList" :key="item" />
  </div>
</template>
<style scoped lang='stylus'>
.image-container {
  padding: 10px;

  img {
    width: 200px;
    margin-right: 10px;
  }
}
</style>
