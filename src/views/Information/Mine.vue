<template>
  <div>
    <div>
      <!--面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-left: 10px;padding-bottom: 10px;font-size: 12px">
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>我的中心</el-breadcrumb-item>
        <el-breadcrumb-item>个人资料</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-form ref="form" :model="form" label-width="70px" size="mini">
      <el-form-item label="我的编号" style="width: 270px">
        <el-input v-model="form.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户名" style="width: 270px">
        <el-input v-model="form.name" ></el-input>
      </el-form-item>
      <el-form-item label="密码" style="width: 270px">
        <el-input v-model="form.password" ></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" style="width: 270px">
        <el-input v-model="form.trueName" disabled></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.gender" placeholder="性别不能为空">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学号" style="width: 270px">
        <el-input v-model="form.number" disabled></el-input>
      </el-form-item>
      <el-form-item label="电话号码" style="width: 270px">
        <el-input v-model="form.phone" ></el-input>
      </el-form-item>
      <el-form-item label="分数" style="width: 270px">
          <el-input v-model="form.score" disabled></el-input>
        <el-progress style="margin-top: 15px" type="circle"  :percentage="percent" ></el-progress>
        <el-tooltip content="满分为150分" placement="top">
          <el-button>情况</el-button>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="个性签名" style="width: 800px">
        <el-input type="textarea" v-model="form.signature"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button  @click="resetform">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { editUserMessage } from '@/api/user'

export default {
  name: 'Mine',
  data () {
    return {
      form: {
        id: '',
        name: '',
        password: '',
        trueName: '',
        gender: '',
        delivery: '',
        number: '',
        position: '',
        signature: '',
        phone: '',
        score: ''
      },
      percent: ''
    }
  },
  created () {
    this.percent = this.$root.USER.score / 150
    this.form.id = this.$root.USER.id
    this.form.name = this.$root.USER.name
    this.form.password = this.$root.USER.pwd
    this.form.trueName = this.$root.USER.trueName
    this.form.gender = this.$root.USER.gender
    this.form.delivery = false
    this.form.number = this.$root.USER.number
    this.form.position = this.$root.USER.position
    this.form.signature = this.$root.USER.signature
    this.form.phone = this.$root.USER.phone
    this.form.score = this.$root.USER.score
  },
  methods: {
    async onSubmit () {
      // eslint-disable-next-line eqeqeq
      if (this.form.password !== this.$root.USER.pwd) {
        const confirmResult = await this.$confirm('您已更改密码,是否确定?', '警示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => {
          return err
        })
        // 如果点击确定返回字符串 confirm
        // 如果点击取消返回字符串 cancel
        if (confirmResult !== 'confirm') {
          this.resetform()
          return this.$message.info('已经取消更改')
        }
      }
      const { data } = await editUserMessage(this.$root.USER.id, this.form.name, this.form.gender, this.form.phone, this.form.signature)
      console.log(data)
    },
    resetform () {
      this.percent = this.$root.USER.score / 1.5
      this.form.id = this.$root.USER.id
      this.form.name = this.$root.USER.name
      this.form.password = this.$root.USER.pwd
      this.form.trueName = this.$root.USER.trueName
      this.form.gender = this.$root.USER.gender
      this.form.delivery = false
      this.form.number = this.$root.USER.number
      this.form.position = this.$root.USER.position
      this.form.signature = this.$root.USER.signature
      this.form.phone = this.$root.USER.phone
      this.form.score = this.$root.USER.score
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
}
</style>
