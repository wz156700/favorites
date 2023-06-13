<script setup>
import { ref } from "vue";
import searchBar from "./serachBar.vue";
import dialogVue from "./dialog.vue";
import websiteList from "./websiteList/websiteList.vue";
import Header from "@/views/header.vue";
</script>

<template>
  <Header/>
  <searchBar />
  <teleport to="body"> <dialogVue /> </teleport>
  <websiteList />
</template>

<style scoped>
</style>
