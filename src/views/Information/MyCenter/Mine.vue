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

        <el-progress style="margin-top: 15px" type="circle"  :percentage="percent" ></el-progress>
        <el-tooltip content="满分为150分" placement="top">
          <el-button>{{form.score}}分</el-button>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="个性签名" style="width: 800px">
        <el-input type="textarea" v-model="form.signature"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改/更新</el-button>
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
    console.log(this.$root.USER.signature)
    this.initMessage()
  },
  methods: {
    initMessage () {
      this.percent = Math.ceil(this.$root.USER.score / 1.5)
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
      const { data } = await editUserMessage(this.$root.USER.id, this.form.password, this.form.name, this.form.gender, this.form.phone, this.form.signature)
      if (data.code === 20000) {
        this.$root.USER.id = data.data.user.userId
        this.$root.USER.name = data.data.user.userName
        this.$root.USER.pwd = data.data.user.userPwd
        this.$root.USER.trueName = data.data.user.userTrueName
        this.$root.USER.authority = data.data.user.userAuthority
        this.$root.USER.score = data.data.user.userScore
        this.$root.USER.number = data.data.user.userNumber
        this.$root.USER.gender = data.data.user.userGender
        this.$root.USER.position = data.data.user.userPosition
        this.$root.USER.phone = data.data.user.userPhone
        this.$root.USER.pic = data.data.user.userPic
        this.$root.USER.signature = data.data.user.userSignature
        this.initMessage()
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
      }
      console.log(data)
    },
    resetform () {
      this.initMessage()
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
}
</style>
