import {
    post,
    get,
    del,
    patch
} from './config'


export default {
    // 合同类型管理页面接口
    // 新增接口
    add(params) {
        return post("/legal/api/legal/v1/contractType/add", params)
    },
    // 获取业务板块接口
    getLvlList() {
        return get("/legal/api/legal/v1/contractType/getLvlList/1")
    },
    // 删除接口
    remove(params) {
        console.log("网络层",params);
        return del(`/legal/api/legal/v1/contractType/remove/${params}`)
    },
    // 更新接口
    update(params) {
        return patch("/legal/api/legal/v1/contractType/update", params)
    },
    // 获取列表数据
    list(params) {
        return post("/legal/api/legal/v1/contractType/list", params)
    },
    // 合同模板管理页面接口
    // 类型级联接口
    queryTypeList(params) {
        return get("/legal/api/legal/v1/contractType/queryTypeList", params)
    },
    // 获取合同标签
    templateGetTypeKey(params) {
        return get("/portal/sys/dataDict/v1/getByTypeKey", params)
    },
    // 列表接口
    templateList(params) {
        return post("/legal/api/legal/v1/contractTemplate/list", params)
    },
    //新增接口
    templateAdd(params) {
        return post("/legal/api/legal/v1/contractTemplate/add", params)
    },
    //更新接口
    templateUpdate(params) {
        return patch("/legal/api/legal/v1/contractTemplate/update", params)
    },
    //启用接口
    templateBatchEnable(params) {
        return patch("/legal/api/legal/v1/contractTemplate/batchEnable", params)
    },
    //禁停用接口
    templateBatchDisable(params) {
        return patch("/legal/api/legal/v1/contractTemplate/batchDisable", params)
    },
    // 模板导出接口
    templateExport(params) {
        return post("/legal/api/legal/v1/contractTemplate/export", params)
    },
}