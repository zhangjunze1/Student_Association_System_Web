<template>
  <div>
    <div>
      <!--面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-left: 10px;padding-bottom: 10px;font-size: 12px">
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>社团相关</el-breadcrumb-item>
        <el-breadcrumb-item>社团成立</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-form ref="form" :model="form" :rules="Rules" label-width="110px" size="mini">
      <el-form-item prop="name" label="社团名字" style="width: 270px">
        <el-input v-model="form.name" ></el-input>
      </el-form-item >
      <el-form-item prop="position" label="社团位置" style="width: 270px">
        <el-input v-model="form.position" ></el-input>
      </el-form-item>
      <el-form-item prop="funds" label="社团经费" style="width: 270px">
        <el-input v-model="form.funds" ></el-input>
      </el-form-item>
      <el-form-item prop="teacher" label="社团指导老师" style="width: 270px">
        <el-input v-model="form.teacher" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">申请</el-button>
        <el-button  @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { applyNewAss } from '@/api/assData'

export default {
  name: 'Apply',
  data () {
    return {
      form: {
        name: '',
        position: '',
        funds: '',
        teacher: ''
      },
      Rules: {
        name: [
          { required: true, message: '输入社团名', trigger: 'blur' },
          { min: 1, max: 12, message: '请输入1-12位', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '请输入社团位置', trigger: 'blur' },
          { min: 1, max: 20, message: '格式不正确', trigger: 'blur' }
        ],
        funds: [
          { required: true, message: '请输入社团经费', trigger: 'blur' },
          { min: 1, max: 20, message: '格式不正确', trigger: 'blur' }
        ],
        teacher: [
          { required: true, message: '指导老师不能为空', trigger: 'blur' },
          { min: 1, max: 20, message: '格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  created () {

  },
  methods: {
    onSubmit (form) {
      // eslint-disable-next-line no-unused-expressions
      this.$refs[form].validate(valid => {
        if (!valid) {
          this.$message({
            message: '请完整输入',
            type: 'warning',
            duration: 1200
          })
          return false
        }
      })
      this.applyAss()
    },
    resetForm (form) {
      this.$refs[form].resetFields()
    },
    async applyAss () {
      const { data } = await applyNewAss(this.form.name, this.form.position, this.form.funds, this.form.teacher, this.$root.USER.id)
      // eslint-disable-next-line eqeqeq
      if (data.code == 3022) {
        this.$message({
          message: '您申请的社团名字他人已经使用',
          type: 'warning'
        })
        // eslint-disable-next-line eqeqeq
      } else if (data.code == 3023) {
        this.$message({
          message: '您已申请过一次社团，尚未审核',
          type: 'warning'
        })
        // eslint-disable-next-line eqeqeq
      } else if (data.code == 20000) {
        this.$message({
          message: '申请正在审核，请等候~',
          type: 'success'
        })
      } else {
        this.$message({
          message: '加载失败',
          type: 'warning'
        })
      }
      this.resetForm('form')
      console.log(data)
    }
  }
}
</script>

<style scoped>

</style>
