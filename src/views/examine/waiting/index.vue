<template >
  <div class="stayApproval_container">
    <el-table
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column
        label="教室"
        prop="roomid"/>
      <el-table-column
        label="日期"
        sortable
        prop="data"/>
      <el-table-column
        label="节次"
        prop="time"/>
      <el-table-column
        label="借用人"
        prop="username"/>
      <el-table-column
        label="用途"
        prop="use"/>
      <el-table-column
        label="联系方式"
        prop="phone"/>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            :disabled="isshow"
            style="margin-left:7px"
            size="small"
            type="success"
            @click="handlepass(scope.$index,scope.row)">通过</el-button>
          <el-button
            :disabled="isshow"
            size="small"
            type="danger"
            @click="handleEdit(scope.$index, scope.row)">不通过</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button
        :disabled="ischecked"
        style="margin-left:7px"
        size="small"
        type="success"
        @click="passrecord()">通过</el-button>
      <el-button
        :disabled="ischecked"
        size="small"
        type="danger"
        @click="nopassrecord()">不通过</el-button>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" title="审批意见">
      <el-input
        :autosize="{ minRows: 3, maxRows: 4 }"
        v-model="approvalInput"
        type="textarea"
        placeholder="请输入审批意见"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addapproval">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分页 -->
    <!-- <div class="Pagination">
      <el-pagination
        :current-page="currentPage"
        :page-size="3"
        :total="count"
        background
        layout="total, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div> -->
  </div>
</template>
<script>
export default{
  data() {
    return {
      dialogFormVisible: false,
      changetime:null,
      changeusername:null,
      approvalInput:'',
      roomuse:this.GLOBAL.roomuse,
      isshow: false,
      ischecked: true,
      currentPage: 1,
      limit: 3,
      count: 10,
      multipleSelection: [],
      tableData: [
      ]
    }
  },
  created: function() {
    this.initData()
  },
  methods: {
    initData() {
      this.$axios.get(this.$URL + 'SelcetApprovalServlet', {
        params: {
          pass: 'pending'
        }
      }).then((response) => {
        console.log(response)
        this.tableData = response.data
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].data = this.tableData[i].data.substr(0, 4) + '-' + this.tableData[i].data.substr(4, 2) + '-' + this.tableData[i].data.substr(6, 2)
          this.tableData[i].time = this.tableData[i].ftime + '-' + this.tableData[i].ltime,
          this.tableData[i].roomid = '3S-' + this.tableData[i].roomid
          this.tableData[i].use=this.roomuse[this.tableData[i].use]
        }
      }).catch(() => {
      })
    },
    // 多选
    passrecord() {
      if (this.multipleSelection.length != 0) {
        console.log(this.multipleSelection)
        this.$confirm('确定通过这' + this.multipleSelection.length + '条记录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          for (var i = 0; i < this.multipleSelection.length; i++) {
            this.$axios.get(this.$URL + 'ApprovalServlet', {
              params: {
                pass: 'pass',
                username: this.multipleSelection[i].username,
                time: this.multipleSelection[i].submission
              }
            })
          }
          this.initData()
          this.$message({
            message: '已审批通过' + this.multipleSelection.length + '条记录',
            type: 'success'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消审批'
          })
        })
      } else {
        this.$confirm('至少选择一条记录', '提示', {
          confirmButtonText: '确定'
        })
      }
    },
    nopassrecord() {
      if (this.multipleSelection.length != 0) {
        this.$confirm('确定不通过这' + this.multipleSelection.length + '条记录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.dialogFormVisible = true
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消审批'
          })
        })
      } else {
        this.$confirm('至少选择一条记录', '提示', {
          confirmButtonText: '确定'
        })
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      if (val == '') {
        this.ischecked = true
        this.isshow = false
      } else {
        this.ischecked = false
        this.isshow = true
      }
    },
    // 通过
    handlepass(index, row) {
      this.$confirm('确定通过这条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$axios.get(this.$URL + 'ApprovalServlet', {
          params: {
            pass: 'pass',
            username: row.username,
            time: row.submission
          }
        }).then((response) => {
          if (response.data == true) {
            this.initData()
          }
          this.$message({
            message: '已审批通过',
            type: 'success'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消审批'
        })
      })
    },
    //审批意见
    addapproval() {
      const thistime = new Date().getTime()
      this.dialogFormVisible = false
      if (this.multipleSelection.length != 0) {
        for (var i = 0; i < this.multipleSelection.length; i++) {
          this.$axios.get(this.$URL + 'ApprovalServlet', {
            params: {
              pass: 'nopass',
              noinf:this.approvalInput,
              username: this.multipleSelection[i].username,
              time: this.multipleSelection[i].submission
            }
          })
        }
        this.initData()
        this.$message({
          message: '已审批不通过' + this.multipleSelection.length + '条记录',
          type: 'success'
        })
      } else {
      this.$axios.get(this.$URL + 'ApprovalServlet', {
        params: {
          pass: 'nopass',
          noinf:this.approvalInput,
          username: this.changeusername,
          time: this.changetime
        }
      }).then((response) => {
        if (response.data == true) {
          this.initData()
          this.$message({
            message: '已审批不通过',
            type: 'success'
          })
        }else{
          this.$alert('审核失败', {
            confirmButtonText: 'sure'
          })
        }

      })
      }

    },
    // 不通过
    handleEdit(index, row) {
      this.dialogIndex = row.username
      this.dialogFormVisible = true
      this.changeusername = row.username
      this.changetime=row.submission
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val // 当前页数
      this.offset = (val - 1) * this.limit // 第几条开始
      this.getRecord()
    },
    getRecord() {
      this.$axios.get(this.$URL + '', {
        params: {
          offset: this.offset,
          limit: this.limit
        }
      }).then((response) => {

      }).catch(() => {

      })
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.stayApproval_container{
  padding: 30px;
  .SA-table-expand{
    font-size: 0;
    label{
      width: 100px;
      color: #99a9bf;
    }
    .el-form-item{
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
  .Pagination{
    display: flex;
    justify-content: flex-start;
    margin-top: 8px;
  }
}
</style>
