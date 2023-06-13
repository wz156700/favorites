<script setup>
import { provide, ref } from "vue";
import homeView from "./views/homeView.vue";
import useWebSiteStore from "@/store/website.js";
//初始化websiteList
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

// 控制输入关键字
const keyWords = ref();
const setKeywords = (value) => {
  keyWords.value = value;
};

provide("controlKeyWords", {
  keyWords,
  setKeywords,
});
</script>

<template>
  <router-view></router-view>
</template>

<style scoped lang="stylus"></style>
