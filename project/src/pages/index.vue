<template>
  <div>
    <el-button type="primary" round @click="addModal">新增</el-button>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="业务板块">
        <el-select v-model="formInline.x" placeholder="活动区域">
          <el-option label="区域一" value="1"></el-option>
          <el-option label="区域二" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="合同类型">
        <el-select v-model="formInline.y" placeholder="活动区域">
          <el-option label="商业管理" value="11"></el-option>
          <el-option label="物流管理" value="12"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="one" label="业务板块一级"></el-table-column>
      <el-table-column prop="two" label="合同类型二级"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="formModal1" class="demo-form-inline">
        <el-form-item label="业务级别">
          <el-select v-model="formModal1.a">
            <el-option label="业务板块一级" value="业务板块一级"></el-option>
            <el-option label="业务板块二级" value="业务板块二级"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务板块" v-if="formModal1.a==='业务板块一级'">
          <el-select v-model="formModal1.d">
            <el-option label="基础合同" value="基础合同"></el-option>
            <el-option label="通用文件" value="通用文件"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务名称">
          <el-select v-model="formModal1.b">
            <el-option label="物流" value="物流"></el-option>
            <el-option label="餐饮" value="餐饮"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务编码">
          <el-select v-model="formModal1.c">
            <el-option label="eeee" value="eeee"></el-option>
            <el-option label="fffff" value="fffff"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
          one: "物业管理类",
          two: "商业合同类"
        },
        {
          id: 2,
          one: "物业管理类",
          two: "商业合同类"
        },
        {
          id: 3,
          one: "物业管理类",
          two: "商业合同类"
        }
      ],
      dialogVisible: false
    };
  },
  methods: {
    handleClick(row) {
      console.log(row, "table行内容");
    },
    handleEdit() {
      this.dialogVisible = true;
      this.formModal1 = {
        a: "业务板块二级",
        b: "物流",
        c: "eeee"
      };
    },
    addModal() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleOk() {
      this.dialogVisible = false;
      console.log(this.formModal1, "formModal内容");
    }
  }
};
</script>

<style>
</style>