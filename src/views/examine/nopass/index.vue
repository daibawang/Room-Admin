<template >
  <div class="stayApproval_container">
    <el-button icon="el-icon-refresh" type="primary" circle size="mini"style="float:right;margin-right:20px" @click="clearFilter"/>
    <el-table
      ref="filterTable"
      :data="tableData"
      style="width: 90%;margin-left:80px;margin-top:28px">
      <el-table-column
        :filters="roomfilters"
        :filter-method="filterHandler"
        label="教室"
        prop="roomid"/>
      <el-table-column
        :filters="datafilters"
        :filter-method="filterHandler"
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
      <el-table-column
        label="未通过原因"
        prop="noinf"
      />>
    </el-table>
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
      roomuse:this.GLOBAL.roomuse,
      currentPage: 1,
      limit: 3,
      count: 10,
      roomfilters: [],
      datafilters: [],
      tableData: []
    }
  },
  created: function() {
    this.initData()
  },
  methods: {
    initData() {
      this.$axios.get(this.$URL + 'SelcetApprovalServlet', {
        params: {
          pass: 'nopass'
        }
      }).then((response) => {
        this.tableData = response.data
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].data = this.tableData[i].data.substr(0, 4) + '-' + this.tableData[i].data.substr(4, 2) + '-' + this.tableData[i].data.substr(6, 2)
          this.tableData[i].time = this.tableData[i].ftime + '-' + this.tableData[i].ltime
          this.tableData[i].use=this.roomuse[this.tableData[i].use]
          this.tableData[i].roomid = '3S-' + this.tableData[i].roomid
        }
        const arrayroomid = []
        const arraydata = []
        this.tableData.forEach(function(v, k) {
          arrayroomid.push({ text: v.roomid, value: v.roomid })
          arraydata.push({ text: v.data, value: v.data })
        })
        // 去重
        const hash = {}
        const newArrdata = arraydata.reduceRight((item, next) => {
          hash[next.text] ? '' : hash[next.text] = true && item.push(next)
          return item
        }, [])
        const hash1 = {}
        const newArrroomid = arrayroomid.reduceRight((item, next) => {
          hash1[next.text] ? '' : hash1[next.text] = true && item.push(next)
          return item
        }, [])

        this.roomfilters = newArrroomid
        this.datafilters = newArrdata
      }).catch(() => {
      })
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter()
    }
    // 分页
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`)
    // },
    // handleCurrentChange(val) {
    //   this.currentPage = val // 当前页数
    //   this.offset = (val - 1) * this.limit // 第几条开始
    //   this.getRecord()
    // },
    // getRecord() {
    //   this.$axios.get(this.$URL + '', {
    //     params: {
    //       offset: this.offset,
    //       limit: this.limit
    //     }
    //   }).then((response) => {
    //
    //   }).catch(() => {
    //
    //   })
    // }
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
