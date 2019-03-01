<template >
  <div class="statusApproval_container">
    <!-- <div class="select-year">
      选择学年学期
      <el-select v-model="value" placeholder="请选择" style="margin-left:10px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </div>
    <div class="uploadfile">
      <el-upload
        :disabled="eqit"
        :action="params.action"
        :before-upload="onBeforeUpload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :on-success="(res,file)=>{return onSuccess(res,file,1)}"
        :limit="1"
        :data="params.data1"
        :auto-upload="true"
        :on-exceed="handleExceed"
        :file-list="fileList1"
        class="upload-demo"
        multiple>
        <el-button size="mini" type="primary">上传课表<i class="el-icon-upload el-icon--right"/></el-button>
      </el-upload>
      <el-button type="success" size="mini" class="button">录入</el-button>
    </div> -->

  </div>
</template>
<script>
export default{
  data() {
    return {
      // eqit: false,
      // fileList1: [],
      // year1: null,
      // year2: null,
      // options: [{
      //   value: '2018-2019-2',
      //   label: '2018-2019-2'
      // }, {
      //   value: '2018-2019-1',
      //   label: '2018-2019-1'
      // }, {
      //   value: '2017-2018-2',
      //   label: '2017-2018-2'
      // }, {
      //   value: '2017-2018-1',
      //   label: '2017-2018-1'
      // }],
      // value: '',
      // params: {
      //   action: this.$URL + '/UploadHandleServlet',
      //   data1: { 'username': '', 'kind': '15', 'filename': '', 'packname': '' }
      // }
    }
  },
  created() {
    this.$alert('此功能暂未开通', '提示', {
      confirmButtonText: '确定'
    }).then(() => {
      this.$router.push('/status/index')
    })
  },
  methods: {

  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.statusApproval_container{
  padding: 40px;
  .select-year{
    letter-spacing: 1px;
  }
  .uploadfile{
    width:25%;
    margin-top:40px;
    display: flex;
    flex-direction: row;
    .button{
      width: 80px;
      height: 30px;
      margin-left:70px;
    }
  }
  // text-align: center;
}
</style>
