import {GETNAVLIST,GETFOCUSLIST,GETPOLICYDESCLIST,GETKINGKONGLIST,GETITEMLIST,GETETFLOORLIST,
        GETINDEXACTIVITYMODULELIST,GETCATEGORYLIST,GETFLASHSALEMODULE,DETNEWITEMLIST,GETSCENELIST,
        GETCATEGORYL1LIST,GETCATEGORYL2LIST,GETKEYWORD,GETSEARCHLIST,GETSEARCHDATALIST} from './mutations-type'
import http from '@/http/axios.js'
let OK = 200
let newOK = '200'
export default {
    /* index */
    async [GETNAVLIST](store){
        let result = await http.get('/4000/indexCategory')
        if(result.code === OK){
            store.commit(GETNAVLIST,result.data)
        }
    },
    async [GETFOCUSLIST](store){
        let result = await http.get('/4000/recommend')
        if(result.code === OK){
            store.commit(GETFOCUSLIST,result.data.focusList)
            store.commit(GETPOLICYDESCLIST,result.data.policyDescList)
            store.commit(GETKINGKONGLIST,result.data.kingKongModule.kingKongList)
            store.commit(GETITEMLIST,result.data.bigPromotionModule.floorList[0].cells[0].itemList)
            store.commit(GETETFLOORLIST,result.data.bigPromotionModule.floorList[0].cells[0].itemList.slice(1,4))
            store.commit(GETINDEXACTIVITYMODULELIST,result.data.indexActivityModule)
            store.commit(GETCATEGORYLIST,result.data.categoryHotSellModule.categoryList)
            store.commit(GETFLASHSALEMODULE,result.data.flashSaleModule.itemList)
            store.commit(DETNEWITEMLIST,result.data.newItemList.slice(2,8))
            store.commit(GETSCENELIST,result.data.sceneLightShoppingGuideModule)
        }
    },
    /* sort */
    async [GETCATEGORYL1LIST](store){
        let result = await http.get('/4000/navCategory')
        if(result.code === OK){
            store.commit(GETCATEGORYL1LIST,result.data.categoryL1List)
        }
    },
    async [GETCATEGORYL2LIST](store,id=11){
        let result = await http.get(`/4000/categoryList/${id}`)
        if(result.code === OK){
            store.commit(GETCATEGORYL2LIST,result.data.categoryList || result.data.subCateList)
        }
    },
    /* search */
    async [GETKEYWORD](store){
        let result = await http.get('/search/init.json')
        if(result.code === newOK){
            store.commit(GETKEYWORD,result.data.defaultKeyword.keyword)
            store.commit(GETSEARCHLIST,result.data.hotKeywordVOList)
        }
    },
    async [GETSEARCHDATALIST](store,data){
        let obj = {keywordPrefix:data}
        let transformData = null
        transformData = new FormData()
        for(let key in obj){
        transformData.append(key,obj[key])
        }
        let result = await http.post('/search/searchAutoComplete.json',transformData)
        if(result.code === newOK){
            store.commit(GETSEARCHDATALIST,result.data)
        }
    }
}