<template>
  <div class="main">
    <div class="topView">
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
          <div ref="searchPanel" class="search__unfoldArea">
            <slot name="search">
              <el-form
                :inline="true"
                :model="formInline"
                class="search__unfoldArea__body"
              >
                <el-form-item label="诉讼单号">
                  <el-input
                    v-model="searchQuery.a"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
                <el-form-item label="组织">
                  <el-input
                    v-model="searchQuery.b"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
                <el-form-item label="原告/上诉/申请人">
                  <el-input
                    v-model="searchQuery.b"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
                <el-form-item label="诉讼阶段">
                  <el-input
                    v-model="searchQuery.b"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
                <el-form-item label="经办人">
                  <el-input
                    v-model="searchQuery.b"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
                <el-form-item label="诉讼状态">
                  <el-input
                    v-model="searchQuery.b"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
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
                    @click="reset(searchQuery)"
                    >新增</el-button
                  >
                </div>
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
        :header-cell-style="headerClass"
        class="listView__list"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="one" label="诉讼单号"></el-table-column>
        <el-table-column prop="two" label="区域/中心城市公司"></el-table-column>
        <el-table-column prop="three" label="城市公司/项目"></el-table-column>
        <el-table-column
          prop="four"
          label="原告/上诉人/申请人"
        ></el-table-column>
        <el-table-column prop="five" label="诉讼阶段"></el-table-column>
        <el-table-column prop="six" label="经办人"></el-table-column>
        <el-table-column prop="seven" label="诉讼状态"></el-table-column>
        <el-table-column label="操作" width="400px">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="primary"
              size="small"
              >指派经办人</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="handleEdit(scope.row)"
              >处理</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="handleEdit(scope.row)"
              >查看</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="handleEdit(scope.row)"
              >生成起诉状</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        :visible.sync="disposeBtnVisible"
        :show-close="false"
        width="80%"
      >
        <el-tabs @tab-click="tabHandleClick" stretch="true" v-model="activeName">
          <el-tab-pane label="诉讼信息" name="first">
            <el-form>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="组织" id="ja">
                    <el-select class="popup">
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
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="原告/上诉人/申请人" id="ja">
                    <el-input class="popup"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="第三人" id="ja">
                    <el-input class="popup"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="被告/被上诉人/被申请人" id="ja">
                    <el-input class="popup"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item>
                    <el-button
                      type="primary"
                      size="small"
                      @click="handleEdit(scope.row)"
                      >添加</el-button
                    >
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="结案日期" id="ja">
                    <el-input class="popup"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="立案日期" id="ja">
                    <el-input class="popup"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="案号" id="ja">
                    <el-input class="popup"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="案由" id="ja">
                    <el-input class="popup"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" style="display:inline">
                  <el-form-item label="诉讼(上诉/仲裁/执行) 请求" id="ja">
                    <el-input type="textarea" id="textarea"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" style="display:inline">
                  <el-form-item label="附件" id="ja"> </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" style="display:flex;justify-content:center;">
                  <el-button
                    type="primary"
                    class="topView__btn"
                    @click="enabledHandle()"
                    >下一步</el-button
                  >
                  <el-button
                    type="primary"
                    class="topView__btn"
                    @click="enabledHandle()"
                    >保存</el-button
                  >
                  <el-button class="topView__btn" @click="enabledHandle()"
                    >关闭</el-button
                  >
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="诉调阶段" name="second">
            <el-form>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="预立案时间" id="ja" required="">
                    <el-input class="popup"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="诉前调解时间" id="ja" required="">
                    <el-input class="popup"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="处理结果" id="ja" required="">
                    <el-select class="popup">
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
              </el-row>
              <el-row>
                <el-col :span="24" style="display:inline">
                  <el-form-item label="调解结果" id="ja" required="">
                    <el-input type="textarea" id="textarea"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" style="display:flex;justify-content:center;">
                  <el-button
                    type="primary"
                    class="topView__btn"
                    @click="enabledHandle()"
                    >下一步</el-button
                  >
                  <el-button
                    type="primary"
                    class="topView__btn"
                    @click="enabledHandle()"
                    >保存</el-button
                  >
                  <el-button class="topView__btn" @click="enabledHandle()"
                    >关闭</el-button
                  >
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="一审阶段" name="third">
            <el-form>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="立案时间" id="ja" required="">
                    <el-date-picker
                      v-model="value1"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="开庭时间" id="ja" required="">
                    <el-date-picker
                      v-model="value1"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="结案方式" id="ja" required="">
                    <el-select class="popup">
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
              </el-row>
              <el-row>
                <el-col :span="24" style="display:inline">
                  <el-form-item label="审结结果" id="ja" required="">
                    <el-input type="textarea" id="textarea"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="主审法官" id="ja" required="">
                    <el-input class="popup"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="法官联系方式" id="ja" required="">
                    <el-input class="popup"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="裁判机构" id="ja" required="">
                    <el-input class="popup"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="应诉金额" id="ja" required="">
                    <el-input class="popup"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="经办人信息" id="ja" required="">
                    <el-input class="popup agentInformation"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" style="display:flex;justify-content:center;">
                  <el-button
                    type="primary"
                    class="topView__btn"
                    @click="enabledHandle()"
                    >下一步</el-button
                  >
                  <el-button
                    type="primary"
                    class="topView__btn"
                    @click="enabledHandle()"
                    >保存</el-button
                  >
                  <el-button class="topView__btn" @click="enabledHandle()"
                    >关闭</el-button
                  >
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="二审阶段" name="four">
            <el-form>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="上诉时间" id="ja" required="">
                    <el-date-picker
                      v-model="value1"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="开庭时间" id="ja" required="">
                    <el-date-picker
                      v-model="value1"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="结案方式" id="ja" required="">
                    <el-select class="popup">
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
              </el-row>
              <el-row>
                <el-col :span="24" style="display:inline">
                  <el-form-item label="审结结果" id="ja" required="">
                    <el-input type="textarea" id="textarea"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="主审法官" id="ja" required="">
                    <el-input class="popup"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="法官联系方式" id="ja" required="">
                    <el-input class="popup"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="裁判机构" id="ja" required="">
                    <el-input class="popup"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="经办人信息" id="ja" required="">
                    <el-input class="popup"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" style="display:flex;justify-content:center;">
                  <el-button
                    type="primary"
                    class="topView__btn"
                    @click="enabledHandle()"
                    >下一步</el-button
                  >
                  <el-button
                    type="primary"
                    class="topView__btn"
                    @click="enabledHandle()"
                    >保存</el-button
                  >
                  <el-button class="topView__btn" @click="enabledHandle()"
                    >关闭</el-button
                  >
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="执行阶段" name="five">
            <el-form>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="申请时间" id="ja" required="">
                    <el-date-picker
                      v-model="value1"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="执行时间" id="ja" required="">
                    <el-date-picker
                      v-model="value1"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="执行方式" id="ja" required="">
                    <el-select class="popup">
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
              </el-row>
              <el-row>
                <el-col :span="24" style="display:inline">
                  <el-form-item label="执行结果" id="ja" required="">
                    <el-input type="textarea" id="textarea"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="执行法官" id="ja" required="">
                    <el-input class="popup"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="法官联系方式" id="ja" required="">
                    <el-input class="popup"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="执行机构" id="ja" required="">
                    <el-input class="popup"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="经办人信息" id="ja" required="">
                    <el-input class="popup"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" style="display:flex;justify-content:center;">
                  <el-button
                    type="primary"
                    class="topView__btn"
                    @click="enabledHandle()"
                    >下一步</el-button
                  >
                  <el-button
                    type="primary"
                    class="topView__btn"
                    @click="enabledHandle()"
                    >保存</el-button
                  >
                  <el-button class="topView__btn" @click="enabledHandle()"
                    >关闭</el-button
                  >
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="再审阶段" name="six">
            <el-form>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="再审时间" id="ja" required="">
                    <el-date-picker
                      v-model="value1"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="开庭时间" id="ja" required="">
                    <el-date-picker
                      v-model="value1"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="结案方式" id="ja" required="">
                    <el-select class="popup">
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
              </el-row>
              <el-row>
                <el-col :span="24" style="display:inline">
                  <el-form-item label="审结结果" id="ja" required="">
                    <el-input type="textarea" id="textarea"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="主审法官" id="ja" required="">
                    <el-input class="popup"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="法官联系方式" id="ja" required="">
                    <el-input class="popup"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="裁判机构" id="ja" required="">
                    <el-input class="popup"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="经办人信息" id="ja" required="">
                    <el-input class="popup"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" style="display:flex;justify-content:center;">
                  <el-button
                    type="primary"
                    class="topView__btn"
                    @click="enabledHandle()"
                    >下一步</el-button
                  >
                  <el-button
                    type="primary"
                    class="topView__btn"
                    @click="enabledHandle()"
                    >保存</el-button
                  >
                  <el-button class="topView__btn" @click="enabledHandle()"
                    >关闭</el-button
                  >
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
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
      activeName: 'first',
      searchQuery: {
        a: "",
        b: ""
      },
      popupQuery: {
        rank: "",
        plate: "",
        name: "",
        coding: ""
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
          one: "111",
          two: "长三角区域",
          three: "xxxxx项目",
          four: "韩安康",
          five: "诉调阶段",
          six: "韩安康",
          seven: "进行中"
        },
        {
          id: 2,
          one: "111",
          two: "长三角区域",
          three: "xxxxx项目",
          four: "韩安康",
          five: "诉调阶段",
          six: "韩安康",
          seven: "进行中"
        },
        {
          id: 3,
          one: "111",
          two: "长三角区域",
          three: "xxxxx项目",
          four: "韩安康",
          five: "诉调阶段",
          six: "韩安康",
          seven: "进行中"
        }
      ],
      disposeBtnVisible: false
    };
  },
  methods: {
    tabHandleClick(tab, event) {
      console.log(tab, event);
    },
    headerClass({ row, rowIndex }) {
      console.log(rowIndex); // 表头行标号为0
      return "background:#E0EEF8;text-align:center";
    },
    loadData(query = {}) {
      console.log("1", this.searchQuery.a);
      console.log("2", this.searchQuery.b);
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
      this.searchQuery.a = "";
      this.searchQuery.b = "";
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
      this.disposeBtnVisible = true;
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
    addModal() {
      this.disposeBtnVisible = true;
    },
    handleClose() {
      this.disposeBtnVisible = false;
    },
    handleOk() {
      this.disposeBtnVisible = false;
      console.log(this.formModal1, "formModal内容");
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
.el-dialog__header {
  padding: 0px;
}
.el-dialog__body {
  padding: 20px;
}
#ja .el-form-item__label {
  width: 155px;
}
.el-textarea {
  width: 80%;
}
.agentInformation {
  width: 80%;
}
</style>
