import { ref } from 'vue'
const useIndex = () => {
    //选中条
    const currentIndex = ref(0);
    const handClick = (item, index) => {
        currentIndex.value = index;
        myApi.openNewWindow(item.url);
    };
    return {
        currentIndex,
        handClick
    }
}
export default useIndex;