<script setup>
import { provide, ref } from "vue";
import homeView from "./views/homeView.vue";
import useWebSiteStore from "@/store/website.js";
const webSiteStore = useWebSiteStore();
webSiteStore.init();
// 控制dialog显隐
const isShow = ref(false);
const setShow = (value) => {
  isShow.value = value;
};
provide("showDialog", {
  isShow,
  setShow,
});
</script>

<template>
  <homeView />
</template>

<style scoped lang="stylus"></style>
