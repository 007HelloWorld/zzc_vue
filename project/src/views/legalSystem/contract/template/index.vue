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
                <el-form-item label="业务板块">
                  <el-select v-model="searchQuery.plate" class="popup">
                    <el-option label="物业管理" value="物业管理"></el-option>
                    <el-option
                      label="世茂美凯龙"
                      value="世茂美凯龙"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="合同类型">
                  <el-select v-model="searchQuery.type" class="popup">
                    <el-option
                      label="基础合同类"
                      value="基础合同类"
                    ></el-option>
                    <el-option
                      label="通用文件类"
                      value="通用文件类"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="合同模板名称">
                  <el-input
                    v-model="searchQuery.name"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
                <el-form-item label="启用状态">
                  <el-select v-model="searchQuery.state" class="popup">
                    <el-option label="启用" value="启用"></el-option>
                    <el-option label="停用" value="停用"></el-option>
                  </el-select>
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
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="one" label="合同模板编码"></el-table-column>
        <el-table-column prop="two" label="业务板块"></el-table-column>
        <el-table-column prop="three" label="合同类型"></el-table-column>
        <el-table-column prop="four" label="合同模板名称"></el-table-column>
        <el-table-column prop="five" label="最新版本号"></el-table-column>
        <el-table-column prop="six" label="启用状态"></el-table-column>
        <el-table-column prop="seven" label="创建时间"></el-table-column>
        <el-table-column prop="eight" label="创建人"></el-table-column>
        <el-table-column label="操作" width="400px">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="primary"
              size="small"
              >查看模板</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="handleEdit(scope.row)"
              >更新</el-button
            >
            <el-button
              @click="handleClick(scope.row)"
              type="primary"
              size="small"
              >启用</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="handleEdit(scope.row)"
              >停用</el-button
            >
            <el-button
              @click="handleClick(scope.row)"
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
        <el-form :model="createQuery">
          <el-row>
            <el-col :span="12">
              <el-form-item label="业务板块" id="ja">
                <el-select v-model="createQuery.plate" class="popup">
                  <el-option
                    label="物业管理类0"
                    value="物业管理类0"
                  ></el-option>
                  <el-option
                    label="物业管理类1"
                    value="物业管理类1"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同类型" id="ja">
                <el-select v-model="createQuery.type" class="popup">
                  <el-option label="合同类型0" value="合同类型0"></el-option>
                  <el-option label="合同类型1" value="合同类型1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="合同模板名称" id="ja">
                <el-input v-model="createQuery.name" class="popup"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同模板编码" id="ja">
                <el-input
                  v-model="createQuery.coding"
                  class="popup"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="版本号" id="ja">
                <el-input
                  v-model="createQuery.version"
                  class="popup"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- 合同模板 -->
        <el-button
          type="primary"
          class="topView__btn"
          @click="createHandle('创建合同模板')"
          >上传合同模板</el-button
        >
        <div class="dialog__tip">
          注:需填写的部分请使用{ }符号,例: 甲方: {xxxx}
        </div>
        <!-- 合同标签 -->
        <el-form :model="createQuery" class="demo-form-inline">
          <el-row>
            <el-col :span="12">
              <el-form-item label="合同标签">
                <el-select
                  v-model="createQuery.contractLabelData"
                  class="popup"
                >
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
        <div class="label">
          <div class="label__sub">租赁<span> X</span></div>
          <div class="label__sub">租赁<span> X</span></div>
          <div class="label__sub">租赁<span> X</span></div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="createQueryCancelBtn(createQuery)"
            >预 览</el-button
          >
          <el-button type="primary" @click="createQuerySureBtn(createQuery)"
            >确 定</el-button
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
                  <el-button type="primary" @click="showApacheRequest(showApacheQuery)"
                    >查询</el-button
                  >
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="showApacheReset(showApacheQuery)"
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
      // 弹窗的标题
      dialogTitle: "",
      // 高级搜索里面数据源
      searchQuery: {
        plate: "", // 业务板块
        type: "", // 合同类型
        name: "", // 合同模板名称
        state: "" // 启用状态
      },
      // 创建合同模板数据
      createQuery: {
        plate: "", // 业务板块
        type: "", // 合同类型
        name: "", // 合同模板名称
        coding: "", // 合同模板编码
        version: "", // 版本号
        uploadTemplateName: "", // 上传合同模板
        contractLabelData: "" // 合同标签
      },
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
      tableData: [
        {
          id: 1,
          one: "WYGL",
          two: "商业合同类",
          three: "案场合同",
          four: "4-1 餐饮厨房油烟净化系统",
          five: "1.1.0",
          six: "启用",
          seven: "2021/4/30",
          eight: "张三"
        },
        {
          id: 2,
          one: "WYGL",
          two: "商业合同类",
          three: "案场合同",
          four: "4-1 餐饮厨房油烟净化系统",
          five: "1.1.0",
          six: "启用",
          seven: "2021/4/30",
          eight: "张三"
        },
        {
          id: 3,
          one: "WYGL",
          two: "商业合同类",
          three: "案场合同",
          four: "4-1 餐饮厨房油烟净化系统",
          five: "1.1.0",
          six: "启用",
          seven: "2021/4/30",
          eight: "张三"
        },
      ],
      dialogVisible: false,
      showApacheVisible: false
    };
  },
  methods: {
    loadData(e) {
      console.log("高级搜索点击了查询按钮");
      if (e.plate === undefined) {
        this.searchQuery.plate = "";
      }
      if (e.type === undefined) {
        this.searchQuery.type = "";
      }
      if (e.name === undefined) {
        this.searchQuery.name = "";
      }
      if (e.state === undefined) {
        this.searchQuery.state = "";
      }
      console.log("业务板块", this.searchQuery.plate);
      console.log("合同类型", this.searchQuery.type);
      console.log("合同模板名称", this.searchQuery.name);
      console.log("启用状态", this.searchQuery.state);
    },
    // 重置
    reset(query = {}) {
      console.log("点击了重置按钮");
      this.searchQuery.plate = "";
      this.searchQuery.type = "";
      this.searchQuery.name = "";
      this.searchQuery.state = "";
    },
    // 导出
    exportTemplate() {
      console.log("导出按钮");
    },
    // 创建合同模板中取消按钮
    createQueryCancelBtn(e) {
      this.createQuery = "";
      this.dialogVisible = false;
    },
    // 创建合同模板中确定按钮
    createQuerySureBtn(e) {
      console.log("创建合同模板中确定按钮");
      console.log("业务板块", this.createQuery.plate); // 业务板块
      console.log("合同类型", this.createQuery.type); // 合同类型
      console.log("合同模板名称", this.createQuery.name); // 合同模板名称
      console.log("版本号", this.createQuery.version); // 版本号
      console.log("上传合同模板", this.createQuery.uploadTemplateName); // 上传合同模板
      console.log("合同标签", this.createQuery.contractLabelData); // 合同标签
      this.dialogVisible = false;
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
      this.showApacheQuery.user = '';
      this.showApacheQuery.name = '';
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
  width: 90px;
}
.dialog__tip {
  margin: 20px auto;
}
.showApache {
  display: flex;
  &__topBtn {
    margin-left: auto;
  }
}
</style>
