<template>
  <div class="home">
    <el-row :gutter="0">
      <el-col :span="10" :offset="21" class="top" style="margin-top: 11px">
        <el-button :span="1" type="primary" size="mini" @click="gotologin">成员登录</el-button>
        <el-button :span="1" type="warning" size="mini" @click="UserRegister">成员注册</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 100px;margin-left: 300px">
      <div class="title" style="margin-right: 200px">
        <span>学生社团管理系统</span>
      </div>
    </el-row>

    <el-row style="margin-top: 200px;margin-left: 300px">
      <el-col :span="8" class="t1">
        <div class="text text1" >{{ memberNum }}</div>
        <div class="textt tt1" >系统成员</div>
      </el-col>
      <el-col :span="8" class="t2">
        <div class="text text2">{{ assNum }}</div>
        <div class="textt tt2">社团数量</div>
      </el-col>
      <el-col :span="8" class="t3">
        <div class="text text3">{{ activityNum }}</div>
        <div class
                 ="textt tt3">活动数量
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { findsystemData } from '@/api/assData'

export default {
  name: 'home',
  components: {},
  data () {
    return {
      memberNum: 111,
      assNum: 2222,
      activityNum: 33333
    }
  },
  created () {
    this.getsystemData()
  },
  methods: {
    async getsystemData () {
      const { data } = await findsystemData()
      this.memberNum = data.data.memberNum
      this.assNum = data.data.assNum
      this.activityNum = data.data.activityNum
    },
    gotologin () {
      this.$router.push('/login')
    },
    UserRegister () {
      this.$router.push('/register')
    }
  }
}
</script>
<style>

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

.home {
  background: url(../assets/img/pic3.jpg) no-repeat;
  background-size: 100% 770px;
  overflow: hidden;
  height: 100%;
}

.text,
.textt {
  font-size: 1.5rem;
  color: #fff;
}
</style>
