<template>
  <div>
    <div>
      <!--面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-left: 10px;padding-bottom: 10px;font-size: 12px">
        <el-breadcrumb-item :to="{ path: '/main1' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>社团相关</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-card class="box-card" style="margin-top: 20px">
      <!--表格内容显示区域-->
      <!--      @row-dblclick='handleTaskItemClick'-->
      <el-form :inline="true" class="demo-form-inline">
        <el-row type="flex" justify="start">
          <el-form-item style="margin-left: 10px"  >
            <el-button type="primary" @click="addDialogVisible = true">申请活动</el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <el-table
        v-loading="loading"
        :data="activityList"
        @row-dblclick='handleAssItemClick'
        border
        max-height="380px"
        style="width: 100%;">
        <el-table-column
          prop="activityId"
          label="活动编号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="activitySub"
          label="活动主题"
          width="150">
        </el-table-column>
        <el-table-column
          prop="activityContent"
          label="内容"
          width="70">
          <template slot-scope="scope">
            <span  v-if="scope.row.activityContent != ''" style="color: black;">略</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="activityStartTime"
          label="开始时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="activityFinishTime"
          label="结束时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="activityState"
          label="活动状态"
          width="100">
        </el-table-column>
        <el-table-column
          prop="activityScore"
          label="活动分值"
          width="100">
        </el-table-column>
        <el-table-column
          prop="activityLeaderName"
          label="申报社长"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="300">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-search" @click="showConcentDialog(scope.row)">报名通知</el-button>
            <el-button v-if="scope.row.activityState==='活动结束'&&scope.row.activityEndContent!=null" type="primary" size="mini" icon="el-icon-search" @click="showEndConcentDialog(scope.row)">活动结束</el-button>
            <el-button v-if="scope.row.activityState==='报名中'&&scope.row.activityEndContent==null" type="success" size="mini" icon="el-icon-circle-check" @click="endApply(scope.row)">报名结束</el-button>
            <el-button v-if="scope.row.activityState==='报名结束'&&scope.row.activityEndContent==null" type="warning" size="mini" icon="el-icon-plus" @click="endActivity(scope.row)">活动结语</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteActivity(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页功能-->
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          style="padding-top: 20px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current"
          :page-sizes="[2,6,10,20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>

    <!--添加活动的对话框-->
    <el-dialog title="添加活动" :visible.sync="addDialogVisible" width="40%" @close="addDialogClosed">
      <!--内容主体区域-->
      <el-form :model="addForm" :rules="addFormRules" ref="addRuleForm" label-width="100px">
        <el-form-item label="活动名称" prop="activitySub">
          <el-input v-model="addForm.activitySub" placeholder="请输入活动主题"></el-input>
        </el-form-item>
        <el-form-item label="活动内容" prop="activityContent">
          <el-input type="textarea" v-model="addForm.activityContent" placeholder="请输入活动内容"></el-input>
        </el-form-item>
        <el-form-item label="活动开始时间">
          <el-col :span="11">
            <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="addForm.activityStartTime1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">------</el-col>
          <el-col :span="11">
            <el-time-picker value-format="HH:mm:ss" placeholder="选择时间" v-model="addForm.activityStartTime2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="活动结束时间" >
          <el-col :span="11">
            <el-date-picker value-format="yyyy-MM-dd"  type="date" placeholder="选择日期" v-model="addForm.activityFinishTime1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">------</el-col>
          <el-col :span="11">
            <el-time-picker value-format="HH:mm:ss" placeholder="选择时间" v-model="addForm.activityFinishTime2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="活动分值" prop="activityScore">
          <el-input v-model="addForm.activityScore" placeholder="请输入活动分值"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" prop="imageUrl" ref="uploadElement">
          <el-input disabled v-model="addForm.imageUrl" v-if="true" ></el-input>
<!--          <el-upload-->
<!--            class="avatar-uploader"-->
<!--            ref="upload"-->
<!--            :show-file-list="false"-->
<!--            action="http://localhost:8085/oss/activityPre/uploadFile"-->
<!--            :on-success="handleSuccess"-->
<!--            :on-preview="handlePreview"-->
<!--            :auto-upload="false"-->
<!--            :data="addForm"-->
<!--            list-type="picture"-->
<!--            :limit="1"-->
<!--          >-->
<!--            <el-button size="small" type="primary">点击上传</el-button>-->
<!--            <img v-if="addForm.imageUrl" :src="addForm.imageUrl" class="avatar">-->
<!--            <i v-else class="el-icon-plus avatar-uploader-icon" ></i>-->
<!--          </el-upload>-->
          <el-upload
            action="http://localhost:8085/oss/activityPre/uploadFile"
            :on-preview="handlePreview"
            :http-request="upload"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            list-type="picture"
            :on-success="handleSuccess"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetform('addForm')">取消</el-button>
        <el-button type="primary" @click="addActivity">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="图片预览" :visible.sync="previewDialogVisible" width="50%">
      <img :src="picPreviewPath" alt="" class="previewImg">
    </el-dialog>

    <!--活动结语的对话框-->
    <el-dialog title="活动结语" :visible.sync="endDialogVisible" width="40%" @close="endDialogClosed">
      <!--内容主体区域-->
      <el-form :model="endForm" :rules="endFormRules" ref="endRuleForm" label-width="100px">
        <el-form-item label="活动编号" prop="activityId">
          <el-input disabled v-model="endForm.activityId" ></el-input>
        </el-form-item>
        <el-form-item label="活动结语" prop="activityEndContent">
          <el-input type="textarea" v-model="endForm.activityEndContent" placeholder="请输入活动结语内容"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" prop="imageUrl" ref="uploadElement">
          <el-input disabled v-model="endForm.imageUrl" v-if="true" ></el-input>
          <!--          <el-upload-->
          <!--            class="avatar-uploader"-->
          <!--            ref="upload"-->
          <!--            :show-file-list="false"-->
          <!--            action="http://localhost:8085/oss/activityPre/uploadFile"-->
          <!--            :on-success="handleSuccess"-->
          <!--            :on-preview="handlePreview"-->
          <!--            :auto-upload="false"-->
          <!--            :data="addForm"-->
          <!--            list-type="picture"-->
          <!--            :limit="1"-->
          <!--          >-->
          <!--            <el-button size="small" type="primary">点击上传</el-button>-->
          <!--            <img v-if="addForm.imageUrl" :src="addForm.imageUrl" class="avatar">-->
          <!--            <i v-else class="el-icon-plus avatar-uploader-icon" ></i>-->
          <!--          </el-upload>-->
          <el-upload
            action="http://localhost:8085/oss/activityPre/uploadFile"
            :on-preview="handlePreview1"
            :http-request="upload1"
            :on-remove="handleRemove1"
            :before-upload="beforeUpload1"
            list-type="picture"
            :on-success="handleSuccess1"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetform('endForm')">取消</el-button>
        <el-button type="primary" @click="addEndActivity">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="图片预览" :visible.sync="previewDialogVisible1" width="50%">
      <img :src="picPreviewPath1" alt="" class="previewImg">
    </el-dialog>
  </div>
</template>

<script>

import {
  addActivityPic,
  addEndActivity,
  addNewActivity,
  deleteActivityByActivityId,
  endActivityApply,
  findAssActivityPage
} from '@/api/activity'

export default {
  name: 'ApplyActivity',
  data () {
    return {
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      // 当前页
      current: 1,
      // 每页显示的条数
      pageSize: 6,
      // 总条数
      total: 200,
      activityList: [],
      loading: true,
      // 控制添加活动对话框的显示和隐藏
      addDialogVisible: false,
      // 控制活动结语对话框的显示和隐藏
      endDialogVisible: false,
      // 图片预览对话框
      previewDialogVisible: false,
      previewDialogVisible1: false,
      picPreviewPath: '',
      picPreviewPath1: '',
      // 添加活动的表单数据
      addForm: {
        activitySub: '',
        activityContent: '',
        activityStartTime1: '',
        activityStartTime2: '',
        activityFinishTime1: '',
        activityFinishTime2: '',
        activityScore: '',
        imageUrl: '',
        // 图片的数组
        pics: []
      },
      // 活动结语的表单数据
      endForm: {
        activityEndContent: '',
        imageUrl: '',
        activityId: '',
        // 图片的数组
        pics: []
      },
      // 添加活动表单数据的规则
      addFormRules: {
        activitySub: [
          { required: true, message: '主题不能为空', trigger: 'blur' }
        ],
        activityContent: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        activityStartTime1: [
          { required: true, message: '开始日期不能为空', trigger: 'blur' }
        ],
        activityFinishTime1: [
          { required: true, message: '结束日期不能为空', trigger: 'blur' }
        ],
        activityStartTime2: [
          { required: true, message: '开始时间不能为空', trigger: 'blur' }
        ],
        activityFinishTime2: [
          { required: true, message: '结束时间不能为空', trigger: 'blur' }
        ],
        activityScore: [
          { required: true, message: '活动分值不能为空', trigger: 'blur' }
        ],
        imageUrl: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ]
      },
      endFormRules: {
        activityEndContent: [
          { required: true, message: '活动结语内容不能为空', trigger: 'blur' }
        ],
        imageUrl: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getAssActivity()
  },
  methods: {
    async getAssActivity () {
      const { data } = await findAssActivityPage(this.current, this.pageSize, this.$root.ASS.assId)
      this.activityList = data.data.activities
      console.log(data)
      this.total = data.data.total
      this.loading = false
    },
    onSubmit () {
      console.log('submit!')
    },
    resetform (formName) {
      this.addDialogVisible = false
      this.addForm.activityStartTime2 = ''
      this.addForm.activityStartTime1 = ''
      this.addForm.activityFinishTime2 = ''
      this.addForm.activityFinishTime1 = ''
      this.$refs[formName].resetFields()
    },
    // 当每一页条数改变的时候，
    handleSizeChange (val) {
      // eslint-disable-next-line no-template-curly-in-string
      console.log(`每页 ${val} 条`)
      // 将val赋值给size
      this.pageSize = val
      this.getAssActivity()
    },
    // 当页码改变的时候
    handleCurrentChange (val) {
      // eslint-disable-next-line no-template-curly-in-string
      console.log(`当前页: ${val}`)
      this.current = val
      this.getAssActivity()
    },
    showConcentDialog (e) {
      console.log(e.activityId)
      this.$router.push({ path: '/activity/' + e.activityId + '/content1', query: { activity: e, assName: this.$root.ASS.assName } })
    },
    showEndConcentDialog (e) {
      console.log(e.activityId)
      this.$router.push({ path: '/activity/' + e.activityId + '/endcontent1', query: { activity: e, assName: this.$root.ASS.assName } })
    },
    handleAssItemClick (e) {
      console.log(e.activityId)
      this.$router.push({ path: '/activity/' + e.activityId + '/activityMember1', query: { activity: e, assName: this.$root.ASS.assName } })
    },
    // 监听活动的对话框关闭事件
    addDialogClosed () {
      this.$refs.addRuleForm.resetFields()
    },
    // 监听活动结语的对话框关闭事件
    endDialogClosed () {
      this.$refs.endRuleForm.resetFields()
    },
    // 监听图片上传成功事件
    handleSuccess (response) {

    },
    // 监听图片上传成功事件
    handleSuccess1 (response) {

    },
    handlePreview (file) {
      this.picPreviewPath = file.response.data.url
      console.log(this.picPreviewPath)
      this.previewDialogVisible = true
    },
    handlePreview1 (file) {
      this.picPreviewPath1 = file.response.data.url
      console.log(this.picPreviewPath1)
      this.previewDialogVisible1 = true
    },
    beforeUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    beforeUpload1 (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    async upload (item) {
      var formData = new FormData()
      formData.append('file', item.file)
      const { data } = await addActivityPic(formData)
      console.log(data)
      this.addForm.imageUrl = data.data.url
      console.log(this.addForm.imageUrl)
    },
    async upload1 (item) {
      var formData = new FormData()
      formData.append('file', item.file)
      const { data } = await addActivityPic(formData)
      console.log(data)
      this.endForm.imageUrl = data.data.url
      console.log(this.endForm.imageUrl)
    },
    handleRemove (file) {
      // 1.获取将要删除图片的临时路径
      const filePath = file.response.data.tmp_path
      // 2.从pics数组中，找到图片对应的索引值
      const i = this.addForm.pics.findIndex(x => x.pic === filePath)
      // 3.调用splice方法，移除图片信息
      this.addForm.splice(i, 1)
      this.addForm.imageUrl = ''
    },
    handleRemove1 (file) {
      // 1.获取将要删除图片的临时路径
      const filePath = file.response.data.tmp_path
      // 2.从pics数组中，找到图片对应的索引值
      const i = this.endForm.pics.findIndex(x => x.pic === filePath)
      // 3.调用splice方法，移除图片信息
      this.endForm.splice(i, 1)
      this.endForm.imageUrl = ''
    },
    async addActivity () {
      const { data } = await addNewActivity(this.addForm.activitySub, this.addForm.activityContent, this.addForm.activityScore, this.addForm.activityFinishTime1, this.addForm.activityFinishTime2
        , this.addForm.activityStartTime1, this.addForm.activityStartTime2, this.addForm.imageUrl, this.$root.USER.id, this.$root.ASS.assId, this.$root.USER.trueName)
      console.log(data)
      if (data.code === 20000) {
        this.$notify({
          title: '成功',
          message: '您的活动正在由管理员审核',
          type: 'success',
          duration: 2000
        })
      }
      this.resetform('addForm')
      this.getAssActivity()
      this.getAssActivity()
      this.addDialogVisible = false
      this.getAssActivity()
      this.getAssActivity()
      this.getAssActivity()
      this.getAssActivity()
      this.getAssActivity()
    },
    async endApply (e) {
      const confirmResult = await this.$confirm('将<' + e.activitySub + '>的报名截至, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => {
        return err
      })
      // 如果商家点击确定返回字符串 confirm
      // 如果商家点击取消返回字符串 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消本次操作')
      }
      const { data } = await endActivityApply(e.activityId)
      if (data.code === 20000) {
        this.$notify({
          title: '成功',
          message: '<' + e.activitySub + '>报名截止',
          type: 'success',
          duration: 2000
        })
      }
      this.getAssActivity()
      console.log(data)
    },
    endActivity (e) {
      this.endDialogVisible = true
      this.endForm.activityId = e.activityId
    },
    async addEndActivity () {
      const { data } = await addEndActivity(this.endForm.activityId, this.endForm.activityEndContent, this.endForm.imageUrl)
      console.log(data)
      if (data.code === 20000) {
        this.$notify({
          title: '成功',
          message: '活动最终结束，并统计分值',
          type: 'success',
          duration: 2000
        })
      }
      this.endDialogVisible = false
      this.getAssActivity()
    },
    async deleteActivity (e) {
      const { data } = await deleteActivityByActivityId(e.activityId)
      if (data.code === 20000) {
        this.$notify({
          title: '成功',
          message: '<' + e.activitySub + '>已删除',
          type: 'success',
          duration: 2000
        })
      }
      this.getAssActivity()
      console.log(data)
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
