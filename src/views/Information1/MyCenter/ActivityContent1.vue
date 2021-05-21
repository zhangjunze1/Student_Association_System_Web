<template>
  <div>
    <el-page-header @back="goBack" :content="this.$route.query.activity.activitySub" >
    </el-page-header>
    <b-card border-variant="light" header="活动内容-报名通知" align="left" style="margin-top: 50px">
      <!-- fluid属性可以使container宽度最大化 -->
      <b-container >
        <b-row>
          <b-col cols="12" sm="12" md="12" lg="12" xl="12">
            <b-card class="card" :key="this.$route.query.activity.activityId">

              <b-card-title>{{this.$route.query.activity.activitySub}}</b-card-title>

              <b-card-text class="small text-muted">
                <b-badge variant="info">{{'原创'}}</b-badge>
                &nbsp;&nbsp;发起人：{{this.$route.query.activity.activityLeaderName}}&nbsp;&nbsp;社团：{{this.$route.query.assName}}
              </b-card-text>
              <b-card-text>{{this.$route.query.activity.activityContent}}</b-card-text>
              <div v-if="this.$route.query.activity.activityUrl != ''" class="demo-image">
                <div class="block" :key="cover">
                  <el-image
                    style="width: 200px; height: 200px"
                    :src="this.$route.query.activity.activityUrl"
                    :fit="cover"></el-image>
                </div>
              </div>
              <b-card-text class="small text-muted">
                <i class="icon iconfont icon-riqi"></i>开始时间：{{this.$route.query.activity.activityStartTime}}
                <i class="icon iconfont icon-yuedu" style="margin-right: 80px"></i>结束时间：{{this.$route.query.activity.activityFinishTime}}
                <i class="icon iconfont" style="margin-right: 80px"></i>活动分值：{{this.$route.query.activity.activityScore}}
                <!--              <div class="tag-box">-->
                <!--                <b-link class="tag" variant="info" v-for="(tag,index) in article.tags" :key="index">-->
                <!--                  <i class="icon iconfont icon-tag"></i>{{tag}}-->
                <!--                </b-link>-->
                <!--              </div>-->
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script>

export default {
  name: 'ActivityContent1',
  data () {
    return {

    }
  },
  created () {
    console.log(this.$route.query.activity)
  },
  methods: {
    goBack () {
      this.$router.back()
    }
  }

}
</script>

<style scoped>

</style>
