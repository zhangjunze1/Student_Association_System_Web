<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 800px">
    <el-table-column type="index" label="排名"/>
    <el-table-column prop="nickname" label="昵称" width="180"/>
    <el-table-column prop="name" label="姓名" width="100"/>
    <el-table-column prop="score" label="得分" width="100"/>
    <el-table-column prop="slogan" label="签名"/>
  </el-table>
</template>

<script>
import { getUserRank } from '../../api/user'

export default {
  name: 'Ranklist',
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.getUserRank()
  },
  methods: {
    async getUserRank () {
      const { data } = await getUserRank()
      const ranklist = data.data.rank
      ranklist.forEach(user => {
        this.tableData.push({
          nickname: user.userName,
          score: user.userScore,
          slogan: user.userSignature,
          name: user.userTrueName
        })
      })
      console.log(ranklist)
    }
  }
}
</script>
