<script setup>
import useIndex from "./useIndex";
import useStore from "./useStore";

const { currentIndex, handClick } = useIndex();
const { webSiteStore, keyWords } = useStore();
</script>

<template>
  <div>
    <p id="no-item" v-if="!webSiteStore.find(keyWords).length">暂无数据。</p>
    <div id="items" v-else>
      <div
        class="read-item"
        v-for="(item, index) in webSiteStore.find(keyWords)"
        :key="index"
        :class="{ selected: currentIndex === index }"
        @click="handClick(item, index)"
      >
        <img :src="item.imageUrl" :title="item.title" />
        <h2>{{ item.title }}</h2>
        <button @click.stop="webSiteStore.deleteOfWebsiteList(item.url)">
          x
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped  lang="stylus">
#no-item {
  font-weight: bold;
  color: silver;
  text-align: center;
  width: 100%;
  position: absolute;
  top: 100px;
  z-index: 1;
}

#items {
  .read-item {
    display: flex;
    align-items: center;
    align-content: center;
    border-bottom: lightgray 2px solid;
    border-left: lightgray 6px solid;
    -webkit-user-select: none;
    position: relative;
    padding: 10px;

    img {
      width: 20%;
      margin-right: 25px;
      border: solid 1px #ccc;
    }

    &:hover {
      background: #eee;
    }

    &:hover button {
      display: inline-block;
    }

    &.selected {
      border-left-color: #1e90ff;
    }

    button {
      position: absolute;
      display: none;
      right: 10px;
      top: 10px;
      width: 30px;
      height: 30px;
      background: #f44336;
      border: none;
      border-radius: 50%;
      color: white;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
    }
  }
}
</style>
