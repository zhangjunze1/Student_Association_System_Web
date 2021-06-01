<template>
  <div class="home">
    <div class="video-container">
      <div :style="fixStyle" class="filter">
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

<!--        <el-row style="margin-top: 100px;margin-left: 300px">-->
<!--          <div class="textBox">-->
<!--            <div class="title" style="margin-right: 200px;height: 40px">-->
<!--              <div class="inner-container">-->
<!--                <p class="text" v-for="(text, index) in arr" :key="index">{{text}}</p>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-row>-->

      </div>
            <video :style="fixStyle" autoplay loop muted class="fillWidth" v-on:canplay="canplay">
              <source src="../assets/video/background.mp4" type="video/mp4"/>
              浏览器不支持 video 标签，建议升级浏览器。
            </video>
    </div>
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
      activityNum: 33333,
      vedioCanPlay: false,
      fixStyle: '',
      arr: [
        '1 不是被郭德纲发现的，也不是一开始就收为徒弟。',
        '2 现在雅阁这个状态像极了新A4L上市那段日子。',
        '3 低配太寒碜，各种需要加装，中配定价过高，又没啥特色',
        '4 然后各种机油门、经销商造反什么的幺蛾子。',
        '5 看五月销量，建议参考A4，打8折吧。',
        '1 不是被郭德纲发现的，也不是一开始就收为徒弟。'
      ]
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
    },
    canplay () {
      this.vedioCanPlay = true
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

.text,
.textt {
  font-size: 1.5rem;
  color: #fff;
}

.inner-container {
  animation: myMove 5s linear infinite;
  animation-fill-mode: forwards;
}
/*文字无缝滚动*/
@keyframes myMove {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-150px);
  }
}

.textBox {
  width: 100%;
  height: 40px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  text-align: center;
}
</style>
