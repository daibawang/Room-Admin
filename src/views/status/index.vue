<template >
  <div class="statusApproval_container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="日期" >
        <el-date-picker v-model="formInline.dateday" value-format="yyyyMMdd" style="width:180px" type="date" placeholder="选择日期"/>
      </el-form-item>
      <el-form-item label="教室" style="margin-left:30px">
        <el-cascader
          v-model="formInline.roomid"
          :options="roomlist"
          :clearable="true"
          separator=" "
          change-on-select
          style="width:180px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin-left:30px" @click="onSubmit(formInline)">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tips">
      <i class="el-icon-check" style="color:green"/>  可借<br >
      <i class="el-icon-close" style="color:red"/>   不可借
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      element-loading-text="拼命加载中"
      style="width: 100%;">
      <el-table-column
        label="教室"
        prop="roomid"/>
      <el-table-column
        label="日期"
        prop="data"/>
      <el-table-column
        label="一"
        width="63px"
        prop="one">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-switch
              v-model="scope.row.one"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"/>
          </template>
          <template v-else>
            <i v-if="scope.row.one=='1'" class="el-icon-close" style="color:red"/>
            <i v-if="scope.row.one=='0'" class="el-icon-check" style="color:green"/>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        width="63px"
        label="二"
        prop="two">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-switch
              v-model="scope.row.two"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"/>
          </template>
          <template v-else>
            <i v-if="scope.row.two=='1'" class="el-icon-close" style="color:red"/>
            <i v-if="scope.row.two=='0'" class="el-icon-check" style="color:green"/>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        width="63px"
        label="三"
        prop="three">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-switch
              v-model="scope.row.three"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"/>
          </template>
          <template v-else>
            <i v-if="scope.row.three=='1'" class="el-icon-close" style="color:red"/>
            <i v-if="scope.row.three=='0'" class="el-icon-check" style="color:green"/>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        width="63px"
        label="四"
        prop="four">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-switch
              v-model="scope.row.four"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"/>
          </template>
          <template v-else>
            <i v-if="scope.row.four=='1'" class="el-icon-close" style="color:red"/>
            <i v-if="scope.row.four=='0'" class="el-icon-check" style="color:green"/>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        width="63px"
        label="午一"
        prop="five">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-switch
              v-model="scope.row.five"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"/>
          </template>
          <template v-else>
            <i v-if="scope.row.five=='1'" class="el-icon-close" style="color:red"/>
            <i v-if="scope.row.five=='0'" class="el-icon-check" style="color:green"/>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        width="63px"
        label="午二"
        prop="six">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-switch
              v-model="scope.row.six"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"/>
          </template>
          <template v-else>
            <i v-if="scope.row.six=='1'" class="el-icon-close" style="color:red"/>
            <i v-if="scope.row.six=='0'" class="el-icon-check" style="color:green"/>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        width="63px"
        label="五"
        prop="seven">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-switch
              v-model="scope.row.seven"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"/>
          </template>
          <template v-else>
            <i v-if="scope.row.seven=='1'" class="el-icon-close" style="color:red"/>
            <i v-if="scope.row.seven=='0'" class="el-icon-check" style="color:green"/>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        width="63px"
        label="六"
        prop="eight">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-switch
              v-model="scope.row.eight"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"/>
          </template>
          <template v-else>
            <i v-if="scope.row.eight=='1'" class="el-icon-close" style="color:red"/>
            <i v-if="scope.row.eight=='0'" class="el-icon-check" style="color:green"/>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        width="63px"
        label="七"
        prop="nine">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-switch
              v-model="scope.row.nine"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"/>
          </template>
          <template v-else>
            <i v-if="scope.row.nine=='1'" class="el-icon-close" style="color:red"/>
            <i v-if="scope.row.nine=='0'" class="el-icon-check" style="color:green"/>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        width="63px"
        label="八"
        prop="ten">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-switch
              v-model="scope.row.ten"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"/>
          </template>
          <template v-else>
            <i v-if="scope.row.ten=='1'" class="el-icon-close" style="color:red"/>
            <i v-if="scope.row.ten=='0'" class="el-icon-check" style="color:green"/>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        width="63px"
        label="晚一"
        prop="tone">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-switch
              v-model="scope.row.tone"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"/>
          </template>
          <template v-else>
            <i v-if="scope.row.tone=='1'" class="el-icon-close" style="color:red"/>
            <i v-if="scope.row.tone=='0'" class="el-icon-check" style="color:green"/>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        width="63px"
        label="晚二"
        prop="ttwo">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-switch
              v-model="scope.row.ttwo"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"/>
          </template>
          <template v-else>
            <i v-if="scope.row.ttwo=='1'" class="el-icon-close" style="color:red"/>
            <i v-if="scope.row.ttwo=='0'" class="el-icon-check" style="color:green"/>
          </template>
        </template>
      </el-table-column>
      <el-table-column width="63px" label="晚三" prop="tthree">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-switch
              v-model="scope.row.tthree"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"/>
          </template>
          <template v-else>
            <i v-if="scope.row.tthree=='1'" class="el-icon-close" style="color:red"/>
            <i v-if="scope.row.tthree=='0'" class="el-icon-check" style="color:green"/>
          </template>
        </template>
      </el-table-column>
      <el-table-column width="63px" label="晚四" prop="tfour">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-switch
              v-model="scope.row.tfour"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"/>
          </template>
          <template v-else>
            <i v-if="scope.row.tfour=='1'" class="el-icon-close" style="color:red"/>
            <i v-if="scope.row.tfour=='0'" class="el-icon-check" style="color:green"/>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="success" size="small" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">Ok</el-button>
          <el-button v-else type="primary" size="small" icon="el-icon-edit" @click="changeEdit(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default{
  data() {
    return {
      statusradio: '可借用',
      tableData: [],
      loading: false,
      options: this.GLOBAL.options,
      roomlist: this.GLOBAL.classroom,
      dialogIndex: '',
      dialogFormVisible: false,
      currentPage: 1,
      offset: 0,
      limit: 8,
      count: null,
      formInline: {
        dateday: null,
        datetime: null,
        roomid: null
      }
    }
  },
  created: function() {
  },
  methods: {
    // 修改
    confirmEdit(row) {
      row.edit = false
      // 必须表格数据改变，才能使edit改变有效
      row.roomid = row.roomid.substr(0, 6)
      const sroomid = row.roomid.substr(3, 3)
      // console.log(sroomid)
      const sDaydata = row.data.substr(0, 4) + row.data.substr(5, 2) + row.data.substr(8, 2)
      // console.log(sDaydata)
      let sClasstime = new Array(15)
      sClasstime = [0, parseInt(row.one), parseInt(row.two), parseInt(row.three), parseInt(row.four), parseInt(row.five), parseInt(row.six), parseInt(row.seven), parseInt(row.eight), parseInt(row.nine), parseInt(row.ten), parseInt(row.tone), parseInt(row.ttwo),
        parseInt(row.tthree), parseInt(row.tfour)]
      const timestr = sClasstime.join(',')
      console.log(timestr)
      this.$axios.get(this.$URL + 'ChangeStatusServlet', {
        params: {
          sroomid: sroomid,
          sDaydata: sDaydata,
          sClasstime: timestr
        }
      }).then((response) => {
        if (response.data == true) {
          this.$message({
            message: '教室状态已修改完成',
            type: 'success'
          })
        }
      }).catch(() => {
      })
    },
    changeEdit(row) {
      row.edit = true
      row.roomid = row.roomid + ' '
      console.log(this.tableData)
      this.$message({
        message: '点击修改',
        type: 'success'
      })
    },
    initData(data) {
      this.tableData = data
      for (var i = 0; i < this.tableData.length; i++) {
        this.tableData[i].data = this.tableData[i].data.substr(0, 4) + '-' + this.tableData[i].data.substr(4, 2) + '-' + this.tableData[i].data.substr(6, 2)
        this.tableData[i].roomid = '3S-' + this.tableData[i].roomid
        this.tableData[i].edit = false
      }
      console.log(this.tableData)
    },
    onSubmit(formName) {
      if (formName.dateday == null) {
        this.$alert('日期为必选，教室为可选', '提示', {
          confirmButtonText: 'sure'
        }).then(() => {
        })
      } else if (formName.roomid == null) {
        this.loading = true
        console.log('日期查询')
        this.$axios.get(this.$URL + 'StatusByDataServlet', {
          params: {
            data: formName.dateday
          }
        }).then((response) => {
          this.initData(response.data)
          this.loading = false
        }).catch(() => {
        })
      } else {
        console.log('教师日期查询')
        this.$axios.get(this.$URL + 'StatusByRoomServlet', {
          params: {
            data: formName.dateday,
            roomid: formName.roomid[1]
          }
        }).then((response) => {
          this.initData(response.data)
          this.loading = false
        }).catch(() => {
        })
      }
    },
    // 修改
    handleEdit(index, row) {
      // this.dialogIndex = row.username
      this.dialogFormVisible = true
      // this.changusername = row.username
      this.statusradio = row.pass
    },
    // 修改确认
    addapproval() {
      console.log('dialogForm' + this.statusradio)
      this.dialogFormVisible = false
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
      // this.$axios.get(this.$URL + 'ExclAllServlet', {
      //   params: {
      //     firstL: this.offset,
      //     lastL: this.limit,
      //     typ: 12
      //   }
      // }).then((response) => {
      //   this.tableData = response.data
      //   for (var i = 0; i < this.tableData.length; i++) {
      //     this.tableData[i].url = 'http://www.istuadmission.com/zip/' + this.tableData[i].username + '_' + this.tableData[i].name + '.zip'
      //     this.tableData[i].date_birth = response.data[i].date_birth.substr(0, 4) + '-' + response.data[i].date_birth.substr(4, 2) + '-' + response.data[i].date_birth.substr(6, 2)
      //   }
      // }).catch(() => {
      //
      // })
    }
  }
}
</script>
  <style rel="stylesheet/scss" lang="scss" scoped>
  .statusApproval_container{
    padding: 40px;
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
    .tips{
      letter-spacing: 1px;
      font-size: 15px;
      line-height: 25px;
      color: #606266;
    }
  }
  </style>
