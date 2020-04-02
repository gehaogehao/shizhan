import {GETNAVLIST,GETFOCUSLIST,GETPOLICYDESCLIST,GETKINGKONGLIST,GETITEMLIST,GETETFLOORLIST,
        GETINDEXACTIVITYMODULELIST,GETCATEGORYLIST,GETFLASHSALEMODULE,DETNEWITEMLIST,GETSCENELIST,
        GETCATEGORYL1LIST,GETCATEGORYL2LIST,GETKEYWORD,GETSEARCHLIST,GETSEARCHDATALIST,
        GETSHOPNAVLIST,GETRESULTLIST,GETPUSHLIST} from './mutations-type'
export default {
    /* index */
    [GETNAVLIST](state,list){
        state.navList = list
    },
    [GETFOCUSLIST](state,list){
        state.focusList = list
    },
    [GETPOLICYDESCLIST](state,list){
        state.policyDescList = list
    },
    [GETKINGKONGLIST](state,list){
        state.kingKongList = list
    },
    [GETITEMLIST](state,list){
        state.itemList = list
    },
    [GETETFLOORLIST](state,list){
        state.floorList = list
    },
    [GETINDEXACTIVITYMODULELIST](state,list){
        state.indexActivityModuleList = list
    },
    [GETCATEGORYLIST](state,list){
        state.categoryList = list
    },
    [GETFLASHSALEMODULE](state,list){
        state.flashSaleModule = list
    },
    [DETNEWITEMLIST](state,list){
        state.newItemList = list
    },
    [GETSCENELIST](state,list){
        state.sceneList = list
    },
    /* sort */
    [GETCATEGORYL1LIST](state,list){
        state.categoryL1List = list
    },
    [GETCATEGORYL2LIST](state,list){
        state.categoryL2List = list
    },
    /* search */
    [GETKEYWORD](state,data){
        state.keyword = data
    },
    [GETSEARCHLIST](state,list){
        state.hotKeywordVOList = list
    },
    [GETSEARCHDATALIST](state,list){
        state.searchDataList = list
    },
    /* shop */
    [GETSHOPNAVLIST](state,list){
        state.shopNavList = list
    },
    [GETRESULTLIST](state,list){
        state.resultList = list
    },
    [GETPUSHLIST](state,list){
        state.resultList = state.resultList.concat(list)
    }
}