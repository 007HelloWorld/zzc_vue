<template>
  <div class="main">
    <div class="topView">
      <el-button type="primary" class="topView__btn" @click="added('新增')"
        >新增</el-button
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
          class="ein-table_search"
        >
          <div ref="searchPanel">
            <slot name="search">
              <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
              >
                <el-form-item label="业务板块">
                  <el-input
                    v-model="searchQuery.plate"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
                <el-form-item label="合同类型">
                  <el-input
                    v-model="searchQuery.type"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="loadData(searchQuery)"
                    >查询</el-button
                  >
                  <el-button type="primary" @click="reset(searchQuery)"
                    >重置</el-button
                  >
                </el-form-item>
              </el-form>
            </slot>
          </div>
        </div>
      </el-collapse-transition>
    </div>
    <div
      class="listView"
      :style="{ marginTop: showAdvancedSearch ? '120px' : '80px' }"
    >
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :cell-style="{ 'text-align': 'center' }"
        :header-cell-style="{ 'text-align': 'center' }"
        class="listView__list"
      >
        <el-table-column label="业务板块(一级)">
          <template slot-scope="scope">
            {{scope.row.lvl===1 ? scope.row.dataName:scope.row.parentName}}
          </template>
        </el-table-column>
        <el-table-column label="业务板块编码">
          <template slot-scope="scope">
            {{scope.row.lvl===1 ? scope.row.dataCode:scope.row.parentCode}}
          </template>
        </el-table-column>
        <el-table-column label="合同类型(二级)">
          <template slot-scope="scope">
            {{scope.row.lvl===2 ? scope.row.dataName:""}}
          </template>
        </el-table-column>
        <el-table-column label="合同类型编码">
          <template slot-scope="scope">
            {{scope.row.lvl===2 ? scope.row.dataCode:""}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button
              @click="modifyClick(scope.row)"
              type="primary"
              size="small"
              >修改</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="deleteClick(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form :model="popupQuery" class="demo-form-inline">
          <el-form-item label="业务级别">
            <el-select v-model="popupQuery.dataName" :disabled="dialogTitle === '修改' ? true : false" class="popup">
              <el-option label="业务板块一级" value="业务板块一级"></el-option>
              <el-option label="业务板块二级" value="业务板块二级"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="业务板块"
            v-if="popupQuery.dataName === '业务板块二级'"
          >
            <el-select v-model="popupQuery.parentId" class="popup">
              <el-option
                v-for="item in plateListArr"
                :key="item.id"
                :label="item.dataName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="业务名称">
            <el-input
              v-model="popupQuery.name"
              placeholder="请输入业务名称"
              class="popup"
            ></el-input>
          </el-form-item>
          <el-form-item label="业务编码">
            <el-input 
              v-model="popupQuery.dataCode" 
              placeholder="请输入业务编码"
              :disabled="dialogTitle === '修改' ? true : false" 
              class="popup">
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleOk">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="footerView">
      <div v-if="showPagination && total > 0" class="footerView__show">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000"
          @current-change="handleCurrentChange"
        >
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
  created() {
    // 获取业务名称二级数据
    this.getLvlList();

    // 获取列表数据
    this.getList();
  },
  data() {
    return {
      tableData: [],
      plateListArr: [],
      // 高级搜索数据源
      searchQuery: {
        plate: "", // 业务板块
        type: "" // 合同类型
      },
      // 新增里面数据源
      popupQuery: {
        dataName: "", // 业务级别
        parentId: {}, // 业务板块
        name: "", // 业务名称
        dataCode: "", // 业务编码
      },
      popupQueryPara: {
        lvl: "", // 层级
        dataName: "", // 业务名称
        parentId: "", // 父级id
        dataCode: "" // 业务编码
      },
      showAdvancedSearch: false,
      formInline: {
        user: "",
        region: ""
      },
      dialogVisible: false,
      dialogTitle: ""
    };
  },
  methods: {
    // 获取二级数据
    getLvlList: function() {
      this.$api.getLvlList().then(res => {
        console.log("获取二级数据", res);
        this.plateListArr = res;
      });
    },
    // 获取列表数据
    getList: function(search) {
      const para = {
        pageBean: {
          page: "1",
          pageSize: "20",
          showTotal: true
        },
        params:search
      };
      this.$api.list(para).then(res => {
        console.log("获取列表数据", res);
        this.tableData = res.rows;
      });
    },
    // 新增按钮点击事件
    added(e) {
      console.log("业务级别", e);
      this.popupQuery = {};
      this.dialogTitle = "新增";
      this.dialogVisible = true;
    },
    // 弹窗上确定按钮点击事件
    handleOk() {
      console.log("提示框上点击了确定按钮");
      this.dialogVisible = false;
      if (this.popupQuery.dataName === undefined) {
        this.popupQuery.dataName = "";
      }
      if (this.popupQuery.parentId === undefined) {
        this.popupQuery.parentId = "";
      }
      if (this.popupQuery.name === undefined) {
        this.popupQuery.name = "";
      }
      if (this.popupQuery.dataCode === undefined) {
        this.popupQuery.dataCode = "";
      }
      //新增接口
      if (this.popupQuery.dataName === "业务板块一级") {
        this.popupQueryPara.lvl = "1";
        this.popupQueryPara.dataName = this.popupQuery.name;
        this.popupQueryPara.dataCode = this.popupQuery.dataCode;
      } else {
        this.popupQueryPara.lvl = "2";
        this.popupQueryPara.dataName = this.popupQuery.name;
        this.popupQueryPara.parentId = this.popupQuery.parentId;
        this.popupQueryPara.dataCode = this.popupQuery.dataCode;
      }
      console.log("xxxxxx", this.popupQueryPara);
      if(this.dialogTitle === "新增"){
        this.$api.add(this.popupQueryPara).then(res => {
          console.log("获取二级数据 pjw", res);
          // this.plateListArr = res;
          // 获取列表数据
          this.getList();
        });
      }else{
        this.$api.update(this.popupQueryPara).then(res => {
          console.log("获取二级数据 pjw", res);
          // this.plateListArr = res;
          // 获取列表数据
          this.getList();
        });
      }
    },
    // 查询按钮点击事件
    loadData(query = {}) {
      console.log("1", this.searchQuery.plate);
      console.log("2", this.searchQuery.type);
      const params = {
        parentName:this.searchQuery.plate,
        dataName:this.searchQuery.type
      }
      this.getList(params);
    },
    // 重置按钮点击事件
    reset(query = {}) {
      this.searchQuery = {};
    },
    // 列表上的修改
    modifyClick(row) {
      this.dialogTitle = "修改";
      this.dialogVisible = true;
      if (row.lvl == 1){ // 业务一级
        this.popupQuery = {
          dataName: "业务板块一级",
          name: row.dataName,
          dataCode: row.dataCode,
        };
      }else{
        this.popupQuery = {
          dataName: "业务板块二级",
          name: row.parentName,
          dataCode: row.dataCode,
        };
        console.log("1", row.parentName);
        console.log("2", row.parentId);
      }
      console.log(this.plateListArr, "3");

      console.log(row, "table行内容");
    },
    // 删除按钮点击事件
    deleteClick(row) {
      console.log(row, "table行内容");
      console.log("点击了删除按钮");

      this.$api.remove(row.id).then(res => {
        console.log("删除数据", res);
        // this.plateListArr = res;
        // 获取列表数据
        this.getList();
      });


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
    handleClose() {
      this.dialogVisible = false;
      this.popupQuery = {};
    },
    // 切分页点击数据获取处
    handleCurrentChange(e) {
      console.log("切分页");
      console.log("切分页获取的数据", e);
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
.icon {
  transition: transform 0.3s;
}
.roate {
  transform: rotate(180deg);
}
.listView {
  width: 100%;
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
.listView__list{
  margin-top: 40px;
}
</style>
