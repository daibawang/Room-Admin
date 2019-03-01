<template>
  <div class="statusApproval_container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="教室" style="margin-left:30px">
        <el-cascader
          v-model="formInline.roomid"
          :options="roomlist"
          :clearable="true"
          separator=" "
          change-on-select
          style="width:200px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin-left:30px" @click="onSubmit(formInline)">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="chart-wrapper">
      <PieChart v-if="hackReset" :chartdata="chartdata" :roomid="roomid"/>
    </div>
  </div>

  <!-- <div class="chart-wrapper">
    <BarChart/>
  </div> -->
</template>

<script>
import { formatDate } from '@/utils/formatDate.js'
import PieChart from '@/components/echarts/PieChart'
import BarChart from '@/components/echarts/BarChart'
export default {
  name: 'Dashboard',
  components: {
    PieChart,
    BarChart
  },
  data() {
    return {
      chartdata: null,
      roomid: null,
      hackReset: false,
      roomlist: this.GLOBAL.classroom,
      formInline: {
        roomid: null
      },
      today: null
    }
  },
  computed: {
  },
  created: function() {
  },
  methods: {
    onSubmit(formName) {
      console.log(formName.roomid)
      this.today = formatDate(new Date(), 'yyyyMMdd')
      this.$axios.get(this.$URL + 'PurposeAnalysisServlet', {
        params: {
          data: this.today,
          roomid: formName.roomid[1]
        }
      }).then((response) => {
        this.roomid = response.data[0].roomid
        this.chartdata = [
          { value: response.data[0].a, name: '班会' },
          { value: response.data[0].b, name: '补习' },
          { value: response.data[0].c, name: '讲座' },
          { value: response.data[0].d, name: '工作室活动' },
          { value: response.data[0].e, name: '其他' }
        ],
        this.hackReset = false
        // 在下次DOM更新循环结束后，执行延迟回调
        this.$nextTick(() => {
          this.hackReset = true
        })
      }).catch(() => {
        this.chartdata = []
        this.roomid = null
        this.hackReset = false
        this.$alert('该教室暂无统计分析', '提示', {
          confirmButtonText: 'sure'
        }).then(() => {
        })
      })
      console.log(this.chartdata)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.statusApproval_container{
  padding: 30px;
  text-align: center;
}
.chart-wrapper {
  background: #fff;
  padding: 40px 16px 0;
  margin-bottom: 32px;
}
</style>
