<template>
  <!--登录表单的容器-->
  <div class="login_container">
    <div class="video-container">
      <div :style="fixStyle" class="filter">
        <div class="title">
          <span>学生社团管理系统</span>
        </div>
        <!--登录区域-->
        <div class="login_box" style="margin-top: 50px">
          <!--头像-->
          <div class="avatar_box">
            <img src="../assets/img/timg.jpg">
          </div>
          <!--表单-->
          <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label- width="0px" class="login_form">
            <el-form-item prop="number">
              <el-input v-model="loginForm.number" placeholder="请输入学号" prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="loginForm.password" placeholder="请输入登录密码" prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-form-item prop="verifyCode">
              <div class="verifyCode_box">
                <el-input v-model="loginForm.verifyCode" placeholder="请输入计算结果" prefix-icon="el-icon-mobile" class="verifyCode"></el-input>
                <img src="../assets/img/mskKPg.png" alt="" class="verifyCode_img">
              </div>
            </el-form-item>
            <el-form-item class="login_btn">
              <el-button type="warning" @click="back">返回</el-button>
              <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
              <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <video :style="fixStyle" autoplay loop muted class="fillWidth" v-on:canplay="canplay">
        <source src="../assets/video/background.mp4" type="video/mp4"/>
        浏览器不支持 video 标签，建议升级浏览器。
      </video>
    </div>
  </div>
</template>

<script>

import { userLogin } from '@/api/user'
import { findLeaderAss } from '@/api/assData'

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        number: '',
        password: '',
        verifyCode: ''
      },
      loginRules: {
        number: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          { min: 4, max: 9, message: '学号格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
        ],
        verifyCode: [
          { required: true, message: '请输入计算结果', trigger: 'blur' }
        ]
      },
      vedioCanPlay: false,
      fixStyle: ''
    }
  },
  mounted: function () {
    window.onresize = () => {
      const windowWidth = document.body.clientWidth
      const windowHeight = document.body.clientHeight
      const windowAspectRatio = windowHeight / windowWidth
      let videoWidth
      let videoHeight
      if (windowAspectRatio < 0.5625) {
        videoWidth = windowWidth
        videoHeight = videoWidth * 0.5625
        this.fixStyle = {
          height: windowWidth * 0.5625 + 'px',
          width: windowWidth + 'px',
          'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
          'margin-left': 'initial'
        }
      } else {
        videoHeight = windowHeight
        videoWidth = videoHeight / 0.5625
        this.fixStyle = {
          height: windowHeight + 'px',
          width: windowHeight / 0.5625 + 'px',
          'margin-left': (windowWidth - videoWidth) / 2 + 'px',
          'margin-bottom': 'initial'
        }
      }
    }
    window.onresize()
  },
  methods: {
    canplay () {
      this.vedioCanPlay = true
    },
    submitForm (loginForm) {
      // eslint-disable-next-line no-unused-expressions
      this.$refs[loginForm].validate(valid => {
        if (!valid) {
          this.$notify({
            message: '请完整输入',
            type: 'warning',
            duration: 1200
          })
          return false
        }
      })
      this.getuserLogin()
      // 获取admin的信息
    },
    back () {
      this.$router.push('/home')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    async getLeaderAss () {
      const { data } = await findLeaderAss(this.$root.USER.id)
      this.$root.ASS.assId = data.data.ass.assId
      this.$root.ASS.assName = data.data.ass.assName
      this.$root.ASS.assPosition = data.data.ass.assPositon
      this.$root.ASS.assTeacher = data.data.ass.assTeacher
      this.$root.ASS.assCapital = data.data.ass.assCapital
      this.$root.ASS.assNotice = data.data.ass.assNotice
      console.log(data)
      console.log(this.$root.ASS.assId)
    },
    async getuserLogin () {
      const { data } = await userLogin(this.loginForm.number, this.loginForm.password)
      console.log(data)

      if (data.code === 3012) {
        this.$notify({
          title: '警告',
          message: data.message,
          type: 'warning',
          duration: 2000
        })
      } else if (data.code === 3018) {
        this.$notify({
          title: '警告',
          message: data.message,
          type: 'warning',
          duration: 2000
        })
      } else if (data.code === 20000) {
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
        this.$root.USER.token = data.data.token
        this.$root.USER.signature = data.data.user.userSignature
        console.log(this.$root.USER.id)
        console.log(this.$root.USER.name)
        console.log(this.$root.USER.signature)
        // eslint-disable-next-line eqeqeq
        this.$notify({
          title: '成功',
          message: '登录成功',
          type: 'success',
          duration: 2000,
          onClose: () => {
            // eslint-disable-next-line eqeqeq
            if (this.$root.USER.authority == 0) {
              this.$router.push('/main')
              // eslint-disable-next-line eqeqeq
            } else if (this.$root.USER.authority == 1) {
              // 获取社长的社团信息
              this.getLeaderAss()
              this.$router.push('/main1')
            } else {
              this.$router.push('/main2')
            }
          }
        })
      }
    }

    // async getadminLogin () {
    //   // eslint-disable-next-line no-unused-vars
    //   const { data } = await adminLogin(this.loginForm.admin, this.loginForm.password)
    //   console.log(data)
    //   // eslint-disable-next-line no-undef
    //   this.$store.commit('getToken', data.data.token)
    //   this.$store.commit('getData', data.data.shop)
    //   console.log(this.$store.state.token)
    //   console.log(this.$store.state.data)
    //   if (data.code === 4001) {
    //     this.$message({
    //       message: '本管理员用户名不存在',
    //       type: 'warning',
    //       duration: 2000
    //     })
    //   } else if (data.code === 4002) {
    //     this.$message({
    //       message: '管理员用户名对应密码错误',
    //       type: 'warning',
    //       duration: 2000
    //     })
    //   } else if (data.code === 20000) {
    //     this.$message({
    //       message: '登录成功',
    //       type: 'success',
    //       duration: 2000,
    //       onClose: () => {
    //         this.$router.push('/main')
    //       }
    //     })
    //   }
    // }
  }
}
</script>

<style lang="less" scoped>

.title {
  color: dimgray;
  -webkit-text-stroke: 1px black;
  letter-spacing: 0.04em;
  background-color: #FFFFFF;
  font-size: 50px;
  font-weight: bold;
  text-shadow: 1px -1px black, 2px -2px white;
  text-align: center;
  opacity: 0.55;
}

.login_box {
  width: 450px;
  height: 380px;
  background-color: #FFFFFF;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);

  .avatar_box{
    width: 130px;
    height: 130px;
    border: 1px solid #EEEEEE;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin: -65px auto;
    background-color: #FFFFFF;

    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #EEEEEE;
    }
  }

  .login_form{
    position: absolute;
    bottom: 0px;
    width: 100%;
    padding: 0px 20px;
    box-sizing: border-box;

    .login_btn{
      display: flex;
      justify-content: flex-end;
    }

    .verifyCode_box{
      display: flex;
      .verifyCode{
        width: 70%;
        justify-content: left;
      }

      .verifyCode_img{
        width: 30%;
        height: 45px;
        justify-content: flex-end;
      }
    }
  }
}
.login_container{
  background: url(../assets/img/pic3.jpg) no-repeat;
  background-size: 100% 770px;
  overflow: hidden;
  height: 100%;
}

.home,
.video-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}
.video-container .filter {
  z-index: 1;
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
}
</style>
