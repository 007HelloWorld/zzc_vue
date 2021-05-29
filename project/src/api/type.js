import {
    post,
    get,
    del,
    patch,
    postDownload
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
        return get("/legal/api/legal/v1/contractTemplate/batchEnable", params)
    },
    //禁停用接口
    templateBatchDisable(params) {
        return get("/legal/api/legal/v1/contractTemplate/batchDisable", params)
    },
    // 模板管理导出接口  
    templateExport(params) {
        return postDownload("/legal/api/legal/v1/contractTemplate/export/1", params)
    },
    // 附件上传接口
    templateUploadFile(params) {
        return post("/portal/system/file/v1/upload", params)
    },
    // 多个删除接口
    templateBatchRemove(params) {
        return del("/legal/api/legal/v1/contractTemplate/remove", params)
    },
    // 合同模板使用管理
    // 模板被使用列表导出接口  
    templateExport2(params) {
        return postDownload("/legal/api/legal/v1/contractTemplate/export/2", params)
    },
    // 列表数据
    querylist(params) {
        return post("/legal/api/legal/v1/contractTemplate/queryList", params)
    },
    // 下载次数列表
    historList(params,id) {
        return post("/legal/api/legal/v1/contractUseTemplateHistory/list/"+id, params)
    },
}