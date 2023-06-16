<script setup>
import Header from "@/views/header.vue";
import { onMounted, ref } from "vue";
import { preview, vPreview, Vue3ImagePreview } from "vue3-image-preview";

let fileList = ref([]);

// 获取图片列表
const getImgList = async () => {
  let file = await myApi.getFileList();
  fileList.value = file;
};

//接收到主进程返回消息之后的回调函数
const cb = async () => {
  getImgList();
};

const previewImg = (item) => {
  preview({ images: `${window.location.href.split("#")[0]}/upload/${item}` });
};

const deleteImage = (imgName) => {
  myApi.deleteImg(imgName, cb);
};

onMounted(async () => {
  myApi.getFileListOnMain(cb);
  getImgList();
});
</script>

<template>
  <Header />
  <div class="image-container">
    <div class="img-contain" v-for="item in fileList" :key="item">
      <img v-preview :src="`/upload/${item}`" alt="" />
      <div class="mask">
        <div class="icon-contain">
          <svg
            t="1686910698530"
            class="preview"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2690"
            width="30"
            height="30"
            @click="previewImg(item)"
          >
            <path
              d="M512 896C271.232 896 32 686.016 32 512S271.232 128 512 128c240.96 0 480 209.6 480 384s-239.04 384-480 384z m0-64c207.36 0 416-182.976 416-320S719.36 192 512 192C304.896 192 96 375.296 96 512s208.896 320 416 320z m0-128a192 192 0 1 1 0-384 192 192 0 0 1 0 384z m0-64a128 128 0 1 0 0-256 128 128 0 0 0 0 256z"
              fill="#ffffff"
              p-id="2691"
            ></path>
          </svg>
          <svg
            t="1686910730141"
            class="delete"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3751"
            width="30"
            height="30"
            @click="deleteImage(item)"
          >
            <path
              d="M256 256h554.666667v640H256V256z m42.666667 42.666667v554.666666h469.333333V298.666667H298.666667z m128 128h42.666666v298.666666h-42.666666v-298.666666z m170.666666 0h42.666667v298.666666h-42.666667v-298.666666zM213.333333 256h640v42.666667H213.333333V256z m213.333334-85.333333h213.333333v42.666666h-213.333333V170.666667z"
              fill="#ffffff"
              p-id="3752"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang='stylus'>
.image-container {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;

  .img-contain {
    position: relative;
    width: 200px;
    margin: 10px;
    cursor: pointer;

    img {
      width: 100%;
    }

    .mask {
      display: flex;
      align-items: center;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
      opacity: 0;

      .icon-contain {
        width: 100%;
        text-align: center;

        svg {
          margin: 20px;
        }
      }
    }
  }

  .img-contain:hover .mask {
    opacity: 1;
  }
}
</style>
