<template >
  <div class="statusApproval_container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="教室">
        <el-cascader
          v-model="formInline.roomid"
          :options="roomlist"
          separator=" "
          clearable="true"
          change-on-select
          style="width:180px"
        />
      </el-form-item>
      <el-form-item label="日期" style="margin-left:30px">
        <el-date-picker v-model="formInline.dateday" value-format="yyyyMMdd" style="width:180px" type="date" placeholder="选择日期"/>
      </el-form-item>
      <el-form-item label="节次" style="margin-left:30px">
        <el-cascader
          v-model="formInline.datetime"
          :options="options"
          separator="至"
          clearable="true"
          change-on-select
          style="width:180px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin-left:30px" @click="onSubmit(formInline)">查询</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
export default{
  data() {
    return {
      options: this.GLOBAL.options,
      roomlist: this.GLOBAL.classroom,
      formInline: {
        dateday: null,
        datetime: null,
        roomid: null
      }
    }
  },
  methods: {
    onSubmit(formName) {
      console.log(formName.roomid)
      console.log(formName.dateday)
      console.log(formName.datetime)
    }
  }
}
</script>
  <style rel="stylesheet/scss" lang="scss" scoped>
  .statusApproval_container{
    padding: 40px;
  }
  </style>
