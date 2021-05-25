import {
    post,
    get,
    del,
    patch
} from './config'


export default {
    // 合同类型管理中 新增接口
    add(params) {
        return post("/legal/api/legal/v1/contractType/add", params)
    },
    // 合同类型管理中 获取业务板块接口
    getLvlList() {
        return get("/legal/api/legal/v1/contractType/getLvlList/1")
    },
    // 合同类型管理中 删除接口
    remove(params) {
        console.log("网络层",params);
        return del(`/legal/api/legal/v1/contractType/remove/${params}`)
    },
    // 合同类型管理中 更新接口
    update() {
        return patch("/legal/api/legal/v1/contractType/update", params)
    },
    // 合同类型管理中 获取列表数据
    list(params) {
        return post("/legal/api/legal/v1/contractType/list", params)
    },
}