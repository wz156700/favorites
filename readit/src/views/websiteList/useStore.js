import useWebSiteStore from "@/store/website.js";
import { inject } from "vue";
const useStore = () => {
    const { keyWords } = inject("controlKeyWords");
    const webSiteStore = useWebSiteStore();
    return { webSiteStore, keyWords }
}

export default useStore;