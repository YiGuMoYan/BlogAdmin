<template>
  <div>
    <v-md-editor v-model="about.markdown" :value="about.markdown" height="500px"
                 preview-class="vuepress-markdown-body"></v-md-editor>
    <el-button type="primary" @click="onSave" class="saveButton">保存</el-button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AboutComponent',
  created () {
    this.getMarkdown()
  },
  data () {
    return {
      about: {
        id: '',
        markdown: ''
      }
    }
  },
  methods: {
    getMarkdown () {
      const that = this
      axios({
        url: that.$url + 'about/selectOneAbout',
        method: 'get'
      }).then(function (res) {
        that.about = res.data.data
        console.log(that.about)
      })
    },
    onSave () {
      const that = this
      console.log(that.about)
      axios({
        url: that.$url + 'about/updateAbout',
        method: 'post',
        data: that.about
      }).then(function (res) {
        if (res.data.data) {
          that.$message({
            message: '保存成功',
            type: 'success'
          })
        } else {
          that.$message({
            message: '保存失败',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.saveButton {
  margin-top: 30px;
}
</style>
