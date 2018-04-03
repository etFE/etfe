<template>
  <section class="user-manage">
    <div class="L-selects">
      <el-form label-width="85px" :inline="true" :model="listQuery">
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="small" @click="queryList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" size="small" @click="openDialog()">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="L-grid">
      <el-table :data="tableData" stripe border height='100%' v-loading="tabLoading" :header-cell-style="{textAlign: 'center'}">
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="name" label="系统名称" width="200px">
        </el-table-column>
        <el-table-column prop="descript" label="系统描述" width="250px">
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="180">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="openDialog(scope)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteData(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <update-add-dailog v-bind="{isShow: showDialog, operation: operate, rowData: rowData}" @toggleShow="changeDialogState"></update-add-dailog>
  </section>
</template>

<script>
import UpdateAddDailog from "./update-add";
import { querySysData } from "@/api/admin/sysManage";

export default {
  data() {
    return {
      tableData: [],
      listQuery: {
        filename: ""
        // curPage: 1,
        // pageSize: 20,
        // importance: undefined,
        // title: undefined,
        // type: undefined,
      },
      tabLoading: false,
      showDialog: false,
      operate: "", // 决定弹出窗口是添加也还是修改页的变量
      rowData: null //切换修改页时传过来的行数据
    };
  },
  components: {
    UpdateAddDailog
  },
  methods: {
    openDialog(scope) {
      if (!scope) {
        this.operate = "add";
      } else {
        this.operate = "update";
        this.rowData = scope;
      }
      this.showDialog = true;
    },
    // 查询表格数据
    queryList() {
      this.tabLoading = true;
      querySysData()
        .then(response => {
          this.tableData = response.data;
          this.tabLoading = false;
        })
        .catch(error => {
          this.tabLoading = false;
        });
    },
    deleteData(index, data) {
      this.tabLoading = true;
      DelData(data._id, data)
        .then(res => {
          this.tableData.splice(index, 1);
          this.tabLoading = false;
        })
        .catch(error => {
          this.tabLoading = false;
        });
    },
    changeDialogState() {
      this.showDialog = false;
    }
  }
};
</script>

<style lang="scss">

</style>
