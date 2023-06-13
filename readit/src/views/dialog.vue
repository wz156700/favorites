<script setup>
import { inject, ref, watch } from "vue";
import useWebSiteStore from "@/store/website.js";
const { isShow, setShow } = inject("showDialog");
const url = ref();
let isDisable = ref(false);
const webSiteStore = useWebSiteStore();

//发送url到主线程
const sendUrl = async () => {
  // 如果网址存在的情况
  if (webSiteStore.checkUrl(url.value) != -1) {
    myApi.openAlert("网页已添加");
    setShow(false);
    url.value = "";
    return;
  }
  // 如果没输入网址的情况
  if (!url.value) {
    myApi.openAlert("请先输入网址！");
    return;
  }
  isDisable.value = true;
  let result = await myApi.sendUrl(url.value);

  //网址不存在的情况
  if (result.msg) {
    myApi.openAlert(result.msg);
    isDisable.value = false;
  } else {
    // 网址返回正确的情况
    webSiteStore.addOfWebsiteList(result);
    isDisable.value = false;
    setShow(false);
    url.value = "";
  }
};

const closeDialog = () => {
  setShow(false);
  url.value = "";
};
</script>

<template>
  <div class="dialog-warp" v-if="isShow">
    <div class="content">
      <div class="input">
        <input
          type="text"
          placeholder="请输入网址......"
          v-model="url"
          @keydown.enter="sendUrl"
        />
      </div>
      <div class="btns">
        <button @click="sendUrl" :disabled="isDisable">添加</button>
        <button @click="closeDialog" :disabled="isDisable">取消</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.dialog-warp {
  height: 100%;
  padding-left: 20px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  botton: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  .content {
    width: 100%;
    pading: 0 20px;

    input {
      height: 30px;
      width: 100%;
      outline: none;
      margin-bottom: 10px;
      font-size: 12px;
      padding: 10px;
    }

    .btns {
      button {
        height: 30px;
        margin: 0 10px 0 0;
        font-size: 12px;
        padding: 0 20px;
        outline: none;
        border-radius: 5px;
        cursor: pointer;
      }

      button:hover {
        background: #009aff;
        color: white;
      }

      button:active {
        background: #009aff;
        color: white;
      }
    }
  }
}
</style>
