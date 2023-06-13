<script setup>
import { ref, inject } from "vue";
import _ from "lodash";
const { setShow } = inject("showDialog");
const { setKeywords } = inject("controlKeyWords");

const inputKey = _.debounce((e) => {
  setKeywords(e.target.value);
}, 500);
</script>

<template>
  <div class="searchContainner">
    <div class="button" @click="setShow(true)">+</div>
    <div class="input">
      <input type="text" placeholder="请输入关键字" @keyup="inputKey" />
    </div>
  </div>
</template>

<style scoped lang="stylus">
div.searchContainner {
  height: 60px;
  background-color: rgba(158, 158, 158, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  .button {
    width: 40px;
    height: 40px;
    background-color: #009aff;
    border-radius: 5px;
    cursor: pointer;
    font-size: 26px;
    color: white;
    text-align: center;
    margin: 0 0 0 10px;
  }

  .input {
    flex: 1;
    height: 36px;
    padding: 0 10px;

    input {
      width: 100%;
      height: 100%;
      padding: 0 10px;
      border-radius: 2px;
      border: 1px solid #ccc;
      outline: none;
    }
  }
}
</style>
