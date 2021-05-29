<template>
  <div class="main">
    <div class="topView">
      <el-button
        type="primary"
        class="topView__btn"
        @click="createHandle('创建合同模板')"
        >创建合同模板</el-button
      >
      <el-button type="primary" class="topView__btn" @click="enabledHandle()"
        >启用</el-button
      >
      <el-button type="primary" class="topView__btn" @click="disableHandle()"
        >停用</el-button
      >
      <el-button type="primary" class="topView__btn" @click="deleteHandle()"
        >删除</el-button
      >
      <!-- 高级搜索按钮根据是否有search插槽自动显示 -->
      <div class="topView__search">
        <el-button
          type="text"
          @click="handleShowAdvancedSearch"
          class="topView__search__show"
        >
          高级搜索<i
            class="icon el-icon-arrow-down"
            :class="showAdvancedSearch ? 'roate' : ''"
          ></i>
        </el-button>
      </div>
      <el-collapse-transition>
        <div
          v-show="
            showAdvancedSearch ||
              ($slots.search && !$slots.toolbar && !quickSearch)
          "
          class="search__unfoldArea"
        >
          <div ref="searchPanel" class="search__unfoldArea__body">
            <slot name="search">
              <el-form
                :inline="true"
                :model="searchQuery"
                class="search__unfoldArea__top"
              >
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="业务板块">
                      <el-select
                        v-model="searchQuery.bizId"
                        placeholder="请选择业务板块"
                        @change="changeSearchPlate"
                      >
                        <el-option
                          v-for="item in queryTypeListData"
                          :key="item.id"
                          :label="item.dataName"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="合同类型">
                      <el-select
                        v-model="searchQuery.typeId"
                        placeholder="请选择合同类型"
                        @change="changeSearchType"
                      >
                        <el-option
                          v-for="item in searchSecond"
                          :key="item.id"
                          :label="item.dataName"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="合同模板名称">
                      <el-input
                        v-model="searchQuery.name"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="启用状态">
                      <el-select v-model="searchQuery.enabledFlag">
                        <el-option label="启用" value="1"></el-option>
                        <el-option label="停用" value="0"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div class="search__unfoldArea__bottom">
                <el-button
                  class="search__unfoldArea__bottom__btn"
                  type="primary"
                  @click="loadData(searchQuery)"
                  >查询</el-button
                >
                <el-button
                  class="search__unfoldArea__bottom__btn"
                  type="primary"
                  @click="reset(searchQuery)"
                  >重置</el-button
                >
                <el-button
                  class="search__unfoldArea__bottom__btn"
                  type="primary"
                  @click="exportTemplate(searchQuery)"
                  >导出</el-button
                >
              </div>
            </slot>
          </div>
        </div>
      </el-collapse-transition>
    </div>
    <div
      class="listView"
      :style="{ marginTop: showAdvancedSearch ? '200px' : '80px' }"
    >
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :cell-style="{ 'text-align': 'center' }"
        :header-cell-style="{ 'text-align': 'center' }"
        class="listView__list"
        ref="multipleTable"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="合同模板编码">
          <template slot-scope="scope">
            {{ scope.row.code }}
          </template>
        </el-table-column>
        <el-table-column label="业务板块">
          <template slot-scope="scope">
            {{ scope.row.bizName }}
          </template>
        </el-table-column>
        <el-table-column label="合同类型">
          <template slot-scope="scope">
            {{ scope.row.typeName }}
          </template>
        </el-table-column>
        <el-table-column label="合同模板名称">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="最新版本号">
          <template slot-scope="scope">
            {{ scope.row.version }}
          </template>
        </el-table-column>
        <el-table-column label="启用状态">
          <template slot-scope="scope">
            {{ scope.row.enabledFlag == 1 ? "启用" : "停用" }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            {{ scope.row.creationDate }}
          </template>
        </el-table-column>
        <el-table-column label="创建人">
          <template slot-scope="scope">
            {{ scope.row.creatName }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="400px">
          <template slot-scope="scope">
            <el-button @click="viewClick(scope.row)" type="primary" size="small"
              >查看模板</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="updateClick(scope.row)"
              >更新</el-button
            >
            <el-button
              @click="enabledClick(scope.row)"
              type="primary"
              size="small"
              v-if="scope.row.enabledFlag === 0"
              >启用</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="disableClick(scope.row)"
              v-if="scope.row.enabledFlag === 1"
              >停用</el-button
            >
            <el-button
              @click="deleteClick(scope.row)"
              type="primary"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose"
      >
        <!-- 业务模板  -->
        <el-form :model="createQuery" :rules="rules" ref="createQueryRef">
          <el-row>
            <el-col :span="12">
              <el-form-item label="业务板块" id="ja" prop="bizId">
                <el-select
                  v-model="createQuery.bizId"
                  class="popup"
                  @change="changePlate"
                  placeholder="请选择业务板块"
                  :disabled="dialogTitle === '更新' ? true : false"
                >
                  <el-option
                    v-for="item in queryTypeListData"
                    :key="item.id"
                    :label="item.dataName"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同类型" id="ja" prop="typeId">
                <el-select
                  v-model="createQuery.typeId"
                  class="popup"
                  placeholder="请选择合同类型"
                  @change="changeType"
                  :disabled="dialogTitle === '更新' ? true : false"
                >
                  <el-option
                    v-for="item in second"
                    :key="item.id"
                    :label="item.dataName"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="合同模板名称" id="ja" prop="name">
                <el-input
                  v-model="createQuery.name"
                  class="popup"
                  placeholder="请输入合同模板名称"
                  :disabled="dialogTitle === '更新' ? true : false"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同模板编码" id="ja" prop="code">
                <el-input
                  v-model="createQuery.code"
                  class="popup"
                  placeholder="请输入合同模板编号"
                  :disabled="dialogTitle === '更新' ? true : false"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="版本号" id="ja" prop="version">
                <el-input
                  v-model="createQuery.version"
                  class="popup"
                  placeholder="请输入版本号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否为通用合同" id="ja" prop="common">
                <el-radio v-model="createQuery.common" label="1">是</el-radio>
                <el-radio v-model="createQuery.common" label="0">否</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- 合同模板 -->
        <el-upload
          class="topView__btn"
          :action="fileUploadUrl"
          :on-success="handleUploadFileSuccess"
          :limit="1"
          :on-change="uploadFileChange"
          :before-upload="beforeFileUpload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-exceed="handleExceed"
          :file-list="uploadFileList"
          accept=".doc,.docx"
        >
          <el-button size="small" type="primary">上传合同模板</el-button>
        </el-upload>

        <el-table
          :data="fileDate"
          border
          style="width: 100%;marginTop:20px"
          :cell-style="{ 'text-align': 'center' }"
          :header-cell-style="{ 'text-align': 'center' }"
          class="listView__list"
        >
          <el-table-column label="文件名" :span="10">{{
            createQuery.fileName
          }}</el-table-column>
          <el-table-column
            prop="two"
            label="上传时间"
            :span="10"
          ></el-table-column>
          <el-table-column label="操作" :span="4">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="primary"
                size="small"
                >预览</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-form :model="createQuery" class="demo-form-inline">
          <el-row>
            <el-col :span="12">
              <el-form-item label="合同关键词">
                <el-select
                  v-model="createQuery.labelId"
                  multiple
                  filterable
                  allow-create
                  class="popup"
                  placeholder="请选择合同关键词"
                >
                  <el-option
                    v-for="item in getTypeKey"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- <div class="label">
          <div class="label__sub">租赁<span> X</span></div>
          <div class="label__sub">租赁<span> X</span></div>
          <div class="label__sub">租赁<span> X</span></div>
        </div> -->
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="createQuerySureBtn('createQueryRef', createQuery)"
            >确 定</el-button
          >
          <el-button type="primary" @click="createQueryCancelBtn(createQuery)"
            >取 消</el-button
          >
        </span>
      </el-dialog>
      <el-dialog
        title="合同管理"
        :visible.sync="showApacheVisible"
        width="60%"
        :before-close="handleClose"
      >
        <!-- 用户,姓名  -->
        <div ref="searchPanel" class="showApache__body">
          <slot name="search">
            <el-form :inline="true" :model="showApacheQuery" class="showApache">
              <el-row>
                <el-form-item label="用户">
                  <el-input
                    v-model="showApacheQuery.user"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                  <el-input
                    v-model="showApacheQuery.name"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
              </el-row>
              <el-row class="showApache__topBtn">
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="showApacheRequest(showApacheQuery)"
                    >查询</el-button
                  >
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="showApacheReset(showApacheQuery)"
                    >重置</el-button
                  >
                </el-form-item>
              </el-row>
            </el-form>
            <el-table
              :data="downloadRecord"
              border
              style="width:100%"
              :cell-style="{ 'text-align': 'center' }"
              :header-cell-style="{ 'text-align': 'center' }"
              class="listView__list"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column
                prop="one"
                label="合同模板名称"
              ></el-table-column>
              <el-table-column prop="two" label="用户"></el-table-column>
              <el-table-column prop="three" label="姓名"></el-table-column>
              <el-table-column prop="four" label="下载时间"></el-table-column>
              <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                  <el-button
                    @click="handleClick(scope.row)"
                    type="primary"
                    size="small"
                    >查看</el-button
                  >
                  <el-button
                    type="primary"
                    size="small"
                    @click="handleEdit(scope.row)"
                    >下载</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </slot>
        </div>
        <!-- 列表 -->
      </el-dialog>
    </div>
    <div class="footerView">
      <div v-if="showPagination && total > 0" class="footerView__show">
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showPagination: {
      type: Boolean,
      default: true
    },
    total: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      fileUploadUrl:
        process.env.VUE_APP_BASE_URL + "/portal/system/file/v1/upload",
      // 弹窗的标题
      dialogTitle: "",
      // 下载数据
      downloadRecord: [],
      // 高级搜索里面数据源
      searchQuery: {
        bizId: null, // 业务板块id
        bizName: null, // 业务板块名称
        typeId: null, // 合同类型id
        typeName: null, // 合同类型名称
        name: null, // 合同模板名称
        enabledFlag: null // 是否通用 1是 0否
      },
      second: [], // 创建合同模板中的合同类型二级数据
      searchSecond: [], // 顶部搜索区域的合同类型二级数据
      // 创建合同模板数据
      createQuery: {
        bizId: "", // 业务板块id
        bizName: "", // 业务板块名称
        typeId: "", // 合同类型id
        typeName: "", // 合同类型名称
        name: "", // 合同模板名称
        code: "", // 合同模板编码
        version: "", // 版本号
        common: "", // 是否通用 1是 0否
        fileId: "", // 上传文件id
        fileName: "", // 上传文件名称
        path: "", // 上传模板路径
        labelName: [], // 合同标签名称
        labelId: null // 合同标签id
      },
      // 合同标签列表数据
      getTypeKey: [],
      // getTypeKey: {
      //   children: [],
      //   id: "",
      //   isParent: "",
      //   key: "",
      //   name: "",
      //   open: "",
      //   parentId: "",
      //   sn: "",
      //   text: "",
      //   typeId: ""
      // },
      typeDict: {
        id: "",
        parentId: "",
        parentName: "",
        parentCode: "",
        dataName: "",
        dataCode: "",
        lvl: "",
        isDele: "",
        enabledFlag: "",
        creationDate: "",
        createdBy: "",
        updationDate: ""
      },
      // 类型级联数据源
      queryTypeListData: [],
      // 下载记录里面的查询数据源
      showApacheQuery: {
        user: "", // 用户
        name: "" // 姓名
      },
      showAdvancedSearch: false,
      formInline: {
        user: "",
        region: ""
      },
      formModal1: {
        a: "",
        b: "",
        c: "",
        d: ""
      },
      tableData: [],
      fileDate: [{ one: "文件名", two: "上传时间" }],
      rules: {
        bizId: [
          { required: true, message: "请选择业务板块", trigger: "change" }
        ],
        typeId: [
          { required: true, message: "请选择合同类型", trigger: "change" }
        ],
        name: [
          { required: true, message: "请输入合同模板名称", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入合同模板编码", trigger: "blur" }
        ],
        version: [{ required: true, message: "请输入版本号", trigger: "blur" }],
        common: [
          {
            required: true,
            message: "请选择是否为通用合同类型",
            trigger: "change"
          }
        ]
      },
      dialogVisible: false,
      showApacheVisible: false,
      uploadFileList: []
    };
  },
  created() {
    console.log(" 拿到图片上传地址1 ", this.fileUploadUrl);
    console.log(" 拿到图片上传地址2 ", process.env);
    // 获取列表数据
    this.templateList();

    // 获取类型级联
    this.queryTypeList();

    // 获取合同标签
    this.templateGetTypeKey();
  },
  methods: {
    // 获取列表数据
    templateList: function(e) {
      const para = {
        pageBean: {
          page: "1",
          pageSize: "20",
          showTotal: true
        },
        params: e
      };
      this.$api.templateList(para).then(res => {
        console.log("获取列表数据-------1", res);
        this.tableData = res.rows;
        console.log("获取列表数据-------2", this.tableData);
      });
    },

    // 获取类型级联
    queryTypeList: function() {
      this.$api.queryTypeList().then(res => {
        console.log("获取类型级联", res);
        this.queryTypeListData = res;
        console.log("获取类型级联1", this.queryTypeListData);
      });
    },
    // 获取合同标签
    templateGetTypeKey: function() {
      this.$api
        .templateGetTypeKey({
          typeKey: "legal_contract_label"
        })
        .then(res => {
          console.log("获取合同标签", res);
          this.getTypeKey = res;
          console.log("获取合同标签数据", this.getTypeKey);
        });
    },
    loadData(e) {
      console.log("高级搜索点击了查询按钮", this.searchQuery);
      // this.searchQuery.common =  parseInt(this.searchQuery.common);
      this.templateList(this.searchQuery);
    },
    // 重置
    reset(query = {}) {
      console.log("点击了重置按钮");
      this.searchQuery = {};
      console.log("点击了重置按钮", this.searchQuery);
    },
    // 导出
    exportTemplate() {
      console.log("导出按钮");
      var queryFilter = {
        condition: {
          业务板块: this.searchQuery.bizName,
          合同类型: this.searchQuery.typeName,
          合同模板名称: this.searchQuery.name,
          启用状态: this.searchQuery.enabledFlag === "1" ? "启用" : "停用"
        },
        params: {
          bizId: this.searchQuery.bizId, // 业务板块id
          typeId: this.searchQuery.typeId, // 合同类型id
          name: this.searchQuery.name, // 合同模板名称
          enabledFlag: this.searchQuery.enabledFlag // 启用状态 1启用 0停用
        }
      };
      var para = {
        queryFilter: queryFilter
      };
      console.log("获取数据", para);
      this.$api.templateExport(para).then(res => {
        // console.log("获取类型级联", res);
        // this.queryTypeListData = res;
        // console.log("获取类型级联1", this.queryTypeListData);
        let content = res;
        // 组装a标签
        let elink = document.createElement("a");
        // 设置下载文件名
        elink.download = "合同模板.xlsx";
        elink.style.display = "none";
        let blob = new Blob([content], { type: "application/xlsx" });
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        document.body.removeChild(elink);
      });
    },
    // 创建合同模板中取消按钮
    createQueryCancelBtn(e) {
      this.createQuery = "";
      this.dialogVisible = false;
    },
    // 创建合同模板中确定按钮
    createQuerySureBtn(createQueryRef, createQuery) {

      if (createQuery.labelId.length > 0) {
        var getTypeKeyArr = this.getTypeKey;
        var labelNameArr = [];
        // 遍历总的数据源
        getTypeKeyArr.forEach(function(itemKey, indexKey) {
          createQuery.labelId.forEach(function(itemId, indexId) {
            if(itemKey.id === itemId){
              labelNameArr.push(itemKey.name);
            }
          });
        });
        this.createQuery.labelName = labelNameArr.join(",");
        console.log("获取创建合同模板数据-----2", this.createQuery.labelName);
      }else{
        this.createQuery.labelName = null;
        this.createQuery.labelId = null;
      }
      
      this.$refs[createQueryRef].validate(valid => {
        if (valid) {
          this.dialogVisible = false;
          // 将common转int类型
          this.createQuery.common = parseInt(this.createQuery.common);

          var labelNameId = this.createQuery.labelId;
          this.createQuery.labelId = labelNameId .join(",");
          console.log("获取创建合同模板数据-----1", this.createQuery.labelId);

          // 如果是更新标题
          if (this.dialogTitle === "更新") {
            // 创建接口
            this.$api.templateUpdate(this.createQuery).then(res => {
              if (res.state == true) {
                console.log("创建成功", res);
                // 获取列表数据
                this.templateList();
              } else {
                console.log("创建失败", res.message);
              }
            });
          } else {
            // 创建接口
            this.$api.templateAdd(this.createQuery).then(res => {
              if (res.state == true) {
                console.log("创建成功", res);
                // 获取列表数据
                this.templateList();
              } else {
                console.log("创建失败", res.message);
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    changePlate(e) {
      console.log("拿到到业务板块数据-----e", e);
      console.log("拿到到业务板块数据-----queryTypeListData", this.queryTypeListData);
      this.second = this.queryTypeListData.filter(
        item => item.id == e
      )[0].children;
      console.log("拿到到业务板块数据-----second", this.second);
      this.typeDict = "";
      this.createQuery.bizName = this.queryTypeListData.filter(
        item => item.id == e
      )[0].dataName;
    },
    changeType(e) {
      console.log("获取二级数据", e);
      this.createQuery.typeName = this.second.filter(
        item => item.id == e
      )[0].dataName;
    },
    changeSearchPlate(e) {
      console.log("搜索里面拿到到业务板块数据", e);
      this.searchSecond = this.queryTypeListData.filter(
        item => item.id == e
      )[0].children;
      this.searchQuery.bizName = this.queryTypeListData.filter(
        item => item.id == e
      )[0].dataName;
    },
    changeSearchType(e) {
      console.log("搜索里面获取二级数据", e);
      this.searchQuery.typeName = this.searchSecond.filter(
        item => item.id == e
      )[0].dataName;
    },
    // 下载次数上面数字的点击事件
    showApache(row) {
      this.showApacheVisible = true;
      console.log(row, "table行内容");
    },
    // 点击下载记录页面上的查询按钮showApacheQuery
    showApacheRequest(e) {
      console.log("用户", this.showApacheQuery.user);
      console.log("姓名", this.showApacheQuery.name);
    },
    // 点击下载记录页面上的重置按钮
    showApacheReset(e) {
      this.showApacheQuery.user = "";
      this.showApacheQuery.name = "";
    },
    // 查看模板事件
    viewClick(e) {
      console.log("查看模板事件", e);
    },
    // 更新事件
    updateClick(e) {
      console.log("更新事件", e);
      if(e.labelId != undefined){
        e.labelId = e.labelId.split(",");
      }
      if(e.labelName != undefined){
        e.labelName = e.labelName.split(",");
      }
      this.createQuery = e;
      this.createQuery.common = e.common + ``;
      this.dialogTitle = "更新";
      this.dialogVisible = true;
    },
    // 启用事件
    enabledClick(e) {
      console.log("启用事件", e);
      const para = {
        ids: e.id
      };
      this.$api.templateBatchEnable(para).then(res => {
        if ((res.state = true)) {
          // 获取列表数据
          this.templateList();
        }
      });
    },
    // 停用事件
    disableClick(e) {
      console.log("停用事件", e);
      const para = {
        ids: e.id
      };
      this.$api.templateBatchDisable(para).then(res => {
        if ((res.state = true)) {
          // 获取列表数据
          this.templateList();
        }
      });
    },
    // 删除
    deleteClick(e) {
      console.log("删除", e);
      const para = {
        ids: e.id + ``
      };
      this.$api.templateBatchRemove(para).then(res => {
        if (res.state == true) {
          console.log("删除成功");
          // 获取列表数据
          this.templateList();
        } else {
          console.log("删除失败");
        }
      });
    },
    handleClick(row) {
      console.log(row, "table行内容");
    },
    businessChange(e) {
      this.$forceUpdate();
    },
    pactChange(e) {
      this.$forceUpdate();
    },
    handleEdit() {
      this.dialogVisible = true;
      this.formModal1 = {
        a: "业务板块二级",
        b: "物流",
        c: "eeee"
      };
    },
    handleShowAdvancedSearch() {
      this.showAdvancedSearch = !this.showAdvancedSearch;
      if (this.showAdvancedSearch) {
        this.quickSearchKeywords = "";
      }
      this.calcTableHeight(500);
    },
    calcTableHeight(delay = 300) {
      window.clearTimeout(this.resizeTimer);
      this.resizeTimer = window.setTimeout(() => {
        if (!this.$refs.elTable) {
          return;
        }
        let dom = this.$refs.elTable.$el;
        let top = 0;
        do {
          top += dom.offsetTop; // 如果是左侧就是offsetLeft
          dom = dom.offsetParent; // 如果DOM 节点 的parentNode存在，把当前的节点赋予成parentNode；
        } while (dom && dom.offsetParent);
        let tableHeight = window.innerHeight - top - 32 - 20;
        tableHeight = tableHeight < 150 ? 150 : tableHeight;
        this.tableHeight = tableHeight + "px";
      }, delay);
    },
    createHandle(e) {
      this.createQuery = {};
      this.dialogTitle = e;
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleOk() {
      this.dialogVisible = false;
      console.log(this.formModal1, "formModal内容");
    },
    B() {
      return Promise.resolve("B");
    },
    acquireIds() {
      let selectArr = this.$refs.multipleTable.selection;
      console.log("启用数据获取", selectArr);
      // 获取到里面的id
      let idArr = [];
      var ids = "";
      if (selectArr.length > 0) {
        selectArr.forEach(function(item, index) {
          console.log("获取数据", item, index);
          console.log(item.id);
          idArr.push(item.id);
        });
        ids = idArr.join(",");
        const para = {
          ids: ids
        };
        return Promise.resolve(para);
      }
    },
    // 启用点击事件
    enabledHandle() {
      console.log("启用点击事件");
      this.acquireIds().then(val => {
        this.$api.templateBatchEnable(val).then(res => {
          if ((res.state = true)) {
            // 获取列表数据
            this.templateList();
          }
        });
      });
    },
    // 停用点击事件
    disableHandle() {
      this.acquireIds().then(val => {
        this.$api.templateBatchDisable(val).then(res => {
          if ((res.state = true)) {
            // 获取列表数据
            this.templateList();
          }
        });
      });
    },
    // 删除点击事件
    deleteHandle() {
      console.log("删除");
      this.acquireIds().then(val => {
        this.$api.templateBatchRemove(val).then(res => {
          if ((res.state = true)) {
            // 获取列表数据
            this.templateList();
          }
        });
      });
    },
    handleUploadFileSuccess(file) {
      console.log("拿到上传后的数据 handleUploadFileSuccess", file);
    },
    beforeFileUpload(file) {
      console.log("拿到上传后的数据 beforeFileUpload", file);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleRemove(file) {
      console.log(file, "文件被移除了  handleRemove");
      this.createQuery.fileId = "";
      this.createQuery.fileName = "";
      this.createQuery.path = "";
    },
    beforeRemove(file) {
      console.log(file, "文件被移除了  beforeRemove");
    },
    handleExceed(file) {
      console.log(file);
    },
    uploadFileChange(file) {
      let form = new FormData();
      form.append("file", file.raw);
      this.$api.templateUploadFile(form).then(res => {
        if (res.state == true) {
          const orgData = JSON.parse(res.value);
          console.log(orgData, "文件上传数据");
          this.createQuery.fileId = orgData.fileId;
          this.createQuery.fileName = orgData.fileName;
          this.createQuery.path = orgData.filePath;
        } else {
          console.log(res.message);
        }
      });
    }
  }
};
</script>

<style lang="scss">
.main {
  padding: 0 30px;
}
.topView {
  position: fixed;
  top: 0;
  left: 30px;
  right: 30px;
  height: 80px;
  background: white;
  &__search {
    display: flex;
    &__show {
      margin-left: auto;
    }
  }
}
.search__handelBtn {
  display: flex;
  margin-left: auto;
}

.search__unfoldArea {
  display: flex;
  &__body {
    width: 100%;
  }
  &__bottom {
    width: 100%;
    margin-left: auto;
    display: flex;
    &__btn {
      margin-left: auto;
    }
  }
}

.icon {
  transition: transform 0.3s;
}
.roate {
  transform: rotate(180deg);
}
.listView {
  width: 100%;
  background: orange;
  margin-top: 80px;
  margin-bottom: 60px;
  overflow: hidden;
  &__list {
    height: 80%;
  }
}
.footerView {
  position: fixed;
  bottom: 0;
  right: 30px;
  height: 40px;
  left: 30px;
  background: white;
  display: flex;
  &__show {
    margin-left: auto;
  }
}
.popup {
  width: 60%;
}
.label {
  display: flex;
  &__sub {
    margin-left: 10px;
    background: gainsboro;
    padding: 0px 5px;
  }
}
#ja .el-form-item__label {
  width: 140px;
}
.demo-form-inline {
  margin: 20px auto;
}
.showApache {
  display: flex;
  &__topBtn {
    margin-left: auto;
  }
}
.el-dialog__footer {
  text-align: center;
}
</style>
