import useWebSiteStore from "@/store/website.js";
const useStore = () => {
    const webSiteStore = useWebSiteStore();
    return webSiteStore
}

export default useStore;