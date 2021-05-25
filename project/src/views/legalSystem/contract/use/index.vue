<template>
  <div class="main">
    <div class="topView">
      <el-button
        type="primary"
        class="topView__btn"
        @click="createHandle('createQuery')"
        >新增合同</el-button
      >
      <el-button type="primary" class="topView__btn" @click="enabledHandle()"
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
                :model="formInline"
                class="search__unfoldArea__top"
              >
                <el-form-item label="业务板块">
                  <el-select v-model="searchQuery.plate" class="popup">
                    <el-option
                      label="物业管理"
                      value="物业管理"
                      v-model="searchQuery.plate"
                    ></el-option>
                    <el-option
                      label="世茂美凯龙"
                      value="世茂美凯龙"
                      v-model="searchQuery.plate"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="合同类型">
                  <el-select v-model="searchQuery.type" class="popup">
                    <el-option
                      label="基础合同类"
                      value="基础合同类"
                      v-model="searchQuery.type"
                    ></el-option>
                    <el-option
                      label="通用文件类"
                      value="通用文件类"
                      v-model="searchQuery.type"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="合同模板名称">
                  <el-select v-model="searchQuery.state" class="popup">
                    <el-option
                      label="启用"
                      value="启用"
                      v-model="searchQuery.state"
                    ></el-option>
                    <el-option
                      label="停用"
                      value="通用文件类"
                      v-model="searchQuery.state"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="合同名称">
                  <el-input
                    v-model="searchQuery.name"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
                <el-form-item label="生成时间">
                  <el-date-picker
                    v-model="value1"
                    value-format="yyyy/MM/dd"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
                </el-form-item>
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
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="one" label="合同编码"></el-table-column>
        <el-table-column prop="two" label="生成时间"></el-table-column>
        <el-table-column prop="three" label="业务板块"></el-table-column>
        <el-table-column prop="four" label="合同类型"></el-table-column>
        <el-table-column prop="five" label="合同模板名称"></el-table-column>
        <el-table-column prop="six" label="合同名称"></el-table-column>
        <el-table-column prop="seven" label="状态"></el-table-column>
        <el-table-column label="操作" width="500px">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="primary"
              size="small"
              >编辑合同</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="handleEdit(scope.row)"
              >预览合同</el-button
            >
            <el-button
              @click="handleClick(scope.row)"
              type="primary"
              size="small"
              >生成合同</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="handleEdit(scope.row)"
              >删除</el-button
            >
            <el-button
              @click="handleClick(scope.row)"
              type="primary"
              size="small"
              >下载合同</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="选择模板"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose"
      >
        <!-- 业务模板  -->
        <el-form
          :model="createQuery"
          class="demo-form-inline"
          :rules="rules"
          ref="createQuery"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="组织维度"
                class="dialogTitle"
                prop="organizationDimension"
              >
                <el-select
                  v-model="createQuery.organizationDimension"
                  class="popup"
                >
                  <el-option label="合同类型0" value="合同类型0"></el-option>
                  <el-option label="合同类型1" value="合同类型1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="所属组织"
                required=""
                class="dialogTitle"
                prop="organisation"
              >
                <el-select v-model="createQuery.organisation" class="popup">
                  <el-option label="合同类型0" value="合同类型0"></el-option>
                  <el-option label="合同类型1" value="合同类型1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="区域编码"
                required=""
                class="dialogTitle"
                prop="areaCode"
              >
                <el-input
                  v-model="createQuery.areaCode"
                  class="popup"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="项目编码"
                required=""
                class="dialogTitle"
                prop="projectCode"
              >
                <el-input
                  v-model="createQuery.projectCode"
                  class="popup"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="公司编码"
                required=""
                class="dialogTitle"
                prop="companyCode"
              >
                <el-input
                  v-model="createQuery.companyCode"
                  class="popup"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="业务板块"
                required=""
                class="dialogTitle"
                prop="businessSector"
              >
                <el-select v-model="createQuery.businessSector" class="popup">
                  <el-option label="合同类型0" value="合同类型0"></el-option>
                  <el-option label="合同类型1" value="合同类型1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="合同类型"
                required=""
                class="dialogTitle"
                prop="contractType"
              >
                <el-select v-model="createQuery.contractType" class="popup">
                  <el-option label="合同类型0" value="合同类型0"></el-option>
                  <el-option label="合同类型1" value="合同类型1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="合同模板名称"
                required=""
                class="dialogTitle"
                prop="templateName"
              >
                <el-select v-model="createQuery.templateName" class="popup">
                  <el-option label="合同类型0" value="合同类型0"></el-option>
                  <el-option label="合同类型1" value="合同类型1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="合同编码"
                required=""
                class="dialogTitle"
                prop="contractCode"
              >
                <el-input
                  v-model="createQuery.contractCode"
                  class="popup"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="合同名称"
                required=""
                class="dialogTitle"
                prop="contractName"
              >
                <el-select v-model="createQuery.contractName" class="popup">
                  <el-option label="合同类型0" value="合同类型0"></el-option>
                  <el-option label="合同类型1" value="合同类型1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- 合同模板 -->
        <!-- 合同标签 -->
        <el-form :model="createQuery" class="demo-form-inline">
          <el-row>
            <el-col :span="12">
              <el-form-item label="合同标签" class="dialogTitle">
                <el-select v-model="createQuery.contractLabel" class="popup">
                  <el-option label="标签0" value="标签0"></el-option>
                  <el-option label="标签1" value="标签1"></el-option>
                  <el-option label="标签2" value="标签2"></el-option>
                  <el-option label="标签3" value="标签3"></el-option>
                  <el-option label="标签4" value="标签4"></el-option>
                  <el-option label="标签5" value="标签5"></el-option>
                  <el-option label="标签6" value="标签6"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <el-button type="primary" @click="createHandle()"
                  >按标签查询</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="label">
          <div class="label__sub">租赁<span> X</span></div>
          <div class="label__sub">租赁<span> X</span></div>
          <div class="label__sub">租赁<span> X</span></div>
        </div>
        <div style="marginTop:20px;background:#F0F0F0">
          <el-form :model="createQuery" class="demo-form-inline">
            <el-row>
              <el-col :span="12">
                <el-form-item label="查询结果" class="dialogTitle">
                  <el-select v-model="createQuery.queryResults" class="popup">
                    <el-option label="标签0" value="标签0"></el-option>
                    <el-option label="标签1" value="标签1"></el-option>
                    <el-option label="标签2" value="标签2"></el-option>
                    <el-option label="标签3" value="标签3"></el-option>
                    <el-option label="标签4" value="标签4"></el-option>
                    <el-option label="标签5" value="标签5"></el-option>
                    <el-option label="标签6" value="标签6"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="createQueryCancelBtn('createQuery')"
            >预览模板</el-button
          >
          <el-button
            type="primary"
            @click="createQuerySureBtn('createQuery', createQuery)"
            >使用模板</el-button
          >
        </span>
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
      // 时间选择
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value1: "",
      // 高级搜索里面数据源
      searchQuery: {
        plate: "", // 业务板块
        type: "", // 合同类型
        name: "", // 合同模板名称
        state: "" // 启用状态
      },
      // 创建合同模板数据
      createQuery: {
        organizationDimension: "", // 组织维度
        organisation: "", // 所属组织
        areaCode: "", // 区域编码
        projectCode: "", // 项目编码
        companyCode: "", // 公司编码
        businessSector: "", // 业务板块
        contractType: "", // 合同类型
        templateName: "", // 合同模板名称
        contractCode: "", // 合同编码
        contractName: "", // 合同名称
        contractLabel: "", // 合同标签
        queryResults: "" // 查询结果
      },
      // 非空校验
      // ruleForm: {
      //   organizationDimension: "",
      //   organisation: "",
      //   areaCode: "",
      //   projectCode: "",
      //   companyCode: "",
      //   businessSector: "",
      //   contractType: "",
      //   templateName: "",
      //   contractName: ""
      // },
      // 必选校验
      rules: {
        organizationDimension: [
          { required: true, message: "请选择组织维度", trigger: "change" }
        ],
        organisation: [
          { required: true, message: "请选择所属组织", trigger: "change" }
        ],
        areaCode: [
          { required: true, message: "请填写区域编码", trigger: "blur" }
        ],
        projectCode: [
          { required: true, message: "请填写项目编码", trigger: "blur" }
        ],
        companyCode: [
          { required: true, message: "请填写公司编码", trigger: "blur" }
        ],
        businessSector: [
          { required: true, message: "请选择业务板块", trigger: "change" }
        ],
        contractType: [
          { required: true, message: "请选择合同类型", trigger: "change" }
        ],
        templateName: [
          { required: true, message: "请选择合同模板名称", trigger: "change" }
        ],
        contractCode: [
          { required: true, message: "请填写合同编码", trigger: "change" }
        ],
        contractName: [
          { required: true, message: "请填写合同名称", trigger: "blur" }
        ]
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
      tableData: [
        {
          id: 1,
          one: "WYGL",
          two: "商业合同类",
          three: "案场合同",
          four: "4-1 餐饮厨房油烟净化系统",
          five: "启用",
          six: "2021/4/30",
          seven: "张三",
          eight: "12"
        },
        {
          id: 2,
          one: "WYGL",
          two: "商业合同类",
          three: "案场合同",
          four: "4-1 餐饮厨房油烟净化系统",
          five: "启用",
          six: "2021/4/30",
          seven: "张三",
          eight: "12"
        },
        {
          id: 3,
          one: "WYGL",
          two: "商业合同类",
          three: "案场合同",
          four: "4-1 餐饮厨房油烟净化系统",
          five: "启用",
          six: "2021/4/30",
          seven: "张三",
          eight: "12"
        }
      ],
      dialogVisible: false
    };
  },
  methods: {
    loadData(query = {}) {
      console.log("点击了查询按钮");
      console.log("plate", this.searchQuery.plate);
      console.log("type", this.searchQuery.type);
      console.log("name", this.searchQuery.name);
      console.log("state", this.searchQuery.state);
      console.log("时间获取", this.value1);
      // this.tableLoading = true
      // this.searchQuery = {
      //   ...this.searchQuery,
      //   ...query,
      //   page: query.page || 1
      // }
      // this.mockApi(this.searchQuery)
      // .then((res) => {
      //   this.data = res.data
      //   this.pageTotal = 999
      // })
      // .finally(() => {
      //   this.tableLoading = false
      // })
    },
    reset(query = {}) {
      console.log("点击了重置按钮");
      this.searchQuery.plate = "";
      this.searchQuery.type = "";
      this.searchQuery.name = "";
      this.searchQuery.state = "";
    },
    createQueryCancelBtn(e) {
      this.dialogVisible = false;
      console.log("333333333");
      console.log(e);
    },
    createQuerySureBtn(refName, data) {
      this.$refs[refName].validate(valid => {
        if (valid) {
          // this.dialogVisible = false;
          console.log("取到的值", this.createQuery);
        } else {
          console.log("error submit!!");
          return false;
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
    createHandle(refName) {
      this.dialogVisible = true;
      this.$refs[refName].resetFields();
      this.createQuery.organizationDimension = "";
      this.createQuery.organisation = "";
      this.createQuery.areaCode = "";
      this.createQuery.projectCode = "";
      this.createQuery.companyCode = "";
      this.createQuery.businessSector = "";
      this.createQuery.contractType = "";
      this.createQuery.templateName = "";
      this.createQuery.contractCode = "";
      this.createQuery.contractName = "";
      this.createQuery.contractLabel = "";
      this.createQuery.queryResults = "";
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleOk() {
      this.dialogVisible = false;
      console.log(this.formModal1, "formModal内容");
    },
    enabledHandle() {
      console.log("启用");
    },
    disableHandle() {
      console.log("停用");
    },
    deleteHandle() {
      console.log("删除");
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
  &__btn {
    margin-top: 20px;
  }
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
.dialogTitle .el-form-item__label {
  width: 100px;
}
</style>
