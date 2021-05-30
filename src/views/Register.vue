<template>
  <!--登录表单的容器-->
  <div class="register_container">
    <div class="video-container">
      <div :style="fixStyle" class="filter">
        <div class="title">
          <span>学生社团管理系统</span>
        </div>
        <!--登录区域-->
        <div class="register_box" style="margin-top: 50px">
          <!--头像-->
          <div class="avatar_box">
            <img src="../assets/img/timg.jpg">
          </div>
          <!--表单-->
          <el-form :model="registerForm" :rules="registerRules" ref="registerForm" label- width="0px" class="register_form">
            <el-form-item prop="name">
              <el-input v-model="registerForm.name" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item prop="true_name">
              <el-input v-model="registerForm.true_name" placeholder="请输入真实姓名" prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item>
            <el-form-item prop="pwd">
              <el-input type="password" v-model="registerForm.pwd" placeholder="请输入注册密码" prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-form-item prop="repwd">
              <el-input type="password" v-model="registerForm.repwd" placeholder="请输入重新输入密码" prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-form-item prop="number">
              <el-input v-model="registerForm.number" placeholder="请输入学号" prefix-icon="el-icon-s-grid"></el-input>
            </el-form-item>
            <el-form-item prop="gender">
              <el-select v-model="registerForm.gender" clearable placeholder="请选择性别" >
                <el-option
                  v-for="item in genders"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="phone">
              <el-input v-model="registerForm.phone" placeholder="请输入电话号码" prefix-icon="el-icon-phone"></el-input>
            </el-form-item>
            <el-form-item class="register_btn">
              <el-button type="warning" @click="back">返回</el-button>
              <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
              <el-button @click="resetForm('registerForm')">重置</el-button>
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
import { userRegister } from '@/api/user'

export default {
  name: 'Register',
  data () {
    return {
      registerForm: {
        name: '',
        true_name: '',
        pwd: '',
        repwd: '',
        phone: '',
        number: '',
        gender: ''
      },
      vedioCanPlay: false,
      fixStyle: '',
      registerRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 12, message: '请输入1-12位', trigger: 'blur' }
        ],
        true_name: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { min: 1, max: 10, message: '请输入1-10位', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        repwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '学号不能为空', trigger: 'blur' },
          { min: 4, max: 9, message: '学号格式不正确', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '电话号码不能为空', trigger: 'blur' },
          { min: 11, max: 11, message: '电话号码格式不正确', trigger: 'blur' }
        ]
      },
      genders: [{
        value: '男',
        label: '男'
      }, {
        value: '女',
        label: '女'
      }]
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
    submitForm (registerForm) {
      // eslint-disable-next-line no-unused-expressions
      this.$refs[registerForm].validate(valid => {
        if (!valid) {
          this.$message({
            message: '请完整输入',
            type: 'warning',
            duration: 1200
          })
          return false
        }
        this.MyuserRegister()
      })
    },
    back () {
      this.$router.push('/home')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    async MyuserRegister () {
      const { data } = await userRegister(this.registerForm.name, this.registerForm.true_name, this.registerForm.pwd, this.registerForm.repwd
        , this.registerForm.phone, this.registerForm.number, this.registerForm.gender)
      if (data.code === 3014) {
        this.$notify({
          title: '警告',
          message: data.message,
          type: 'warning',
          duration: 1200
        })
      } else if (data.code === 3015) {
        this.$notify({
          title: '警告',
          message: data.message,
          type: 'warning',
          duration: 1200
        })
      } else if (data.code === 3016) {
        this.$notify({
          title: '警告',
          message: data.message,
          type: 'warning',
          duration: 1200
        })
      } else if (data.code === 3017) {
        this.$notify({
          title: '警告',
          message: data.message,
          type: 'warning',
          duration: 1200
        })
      } else if (data.code === 20000) {
        this.$notify({
          message: '注册成功',
          type: 'success',
          duration: 1200
        })
        this.$router.push('/login')
      } else {
        this.$notify({
          message: '失败',
          type: 'warning',
          duration: 1200
        })
      }
      console.log(data)
    }
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

.register_container {
  height: 100%;
  background-color: #708090;
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

.register_box {
  width: 450px;
  height: 590px;
  background-color: #FFFFFF;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 45%;
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

  .register_form{
    position: absolute;
    bottom: 0px;
    width: 100%;
    padding: 0px 20px;
    box-sizing: border-box;

    .register_btn{
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
.register_container{
  background: url(../assets/img/pic3.jpg) no-repeat;
  background-size: 100% 770px;
  overflow: hidden;
  height: 100%;
}
</style>
