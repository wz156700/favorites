import { ref } from 'vue'
const useIndex = () => {
    //选中条
    const currentIndex = ref(0);
    const handClick = (item, index) => {
        currentIndex.value = index;
    };
    return {
        currentIndex,
        handClick
    }
}
export default useIndex;