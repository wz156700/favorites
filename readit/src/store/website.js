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
            this.websiteList = this.websiteList.filter((item, index) => {
                if (item.url != url) {
                    return item;
                }
            })

            store.set('websiteList', this.websiteList)
        },

        checkUrl(url) {
            let result = _.findIndex(this.websiteList, ['url', url])
            return result
        }
    },
    getters: {
        find() {
            return (keyWords) => {
                if (keyWords === undefined) {
                    return this.websiteList
                } else {
                    return this.websiteList.filter((item) => {
                        if (item.title.toLowerCase().includes(keyWords.toLowerCase())) {
                            return item;
                        }
                    })
                }

            }
        }
    }
})
export default webSiteStore;