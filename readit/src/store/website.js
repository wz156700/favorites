import { defineStore } from 'pinia'
import _ from 'lodash'
import store from 'store2'

const webSiteStore = defineStore('websiteStore', {
    state: () => {
        return {
            websiteList: []
        }
    },
    actions: {
        addOfWebsiteList(item) {

            this.websiteList.unshift(item);
            store.set('websiteList', this.websiteList)
        },
        init() {
            this.websiteList = store.get('websiteList') ?? []
        },
        deleteOfWebsiteList(url) {
            this.websiteList = _.dropWhile(this.websiteList, ['url', url])
            store.set('websiteList', this.websiteList)
        },
        checkUrl(url) {
            let result = _.findIndex(this.websiteList, ['url', url])
            return result
        }
    }
})
export default webSiteStore;