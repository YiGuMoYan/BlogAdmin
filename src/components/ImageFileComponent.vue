<template>
  <div class="imageFileForm">
    <div class="switch">
      <el-switch
        v-model="value1"
        active-text="背景"
        inactive-text="博客">
      </el-switch>
    </div>
    <div class="upload">
      <el-upload
        class="upload-demo from"
        drag
        :action="uploadUrl"
        multiple
        :on-success="handleChange">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
    <div>
      <h3>Url:</h3>
      <el-link :href="imageFileUrl" target="_blank">{{ imageFileUrl }}</el-link>
      <el-button icon="el-icon-document-copy copyButton" circle @click="copyClick"></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageFileComponent',
  data () {
    return {
      value1: false,
      uploadUrl: this.$url + 'blogImageFile/upload/',
      imageFileUrl: ''
    }
  },
  methods: {
    handleChange (response, file, fileList) {
      this.imageFileUrl = response.data
      this.copy(this.imageFileUrl)
    },
    copyClick () {
      this.copy(this.imageFileUrl)
    },
    copy (text) {
      const textareaEl = document.createElement('textarea')
      // 防止手机上弹出软键盘
      textareaEl.setAttribute('readonly', 'readonly')
      textareaEl.value = text
      document.body.appendChild(textareaEl)
      textareaEl.select()
      const res = document.execCommand('copy')
      document.body.removeChild(textareaEl)
      return res
    }
  },
  watch: {
    value1 () {
      if (this.value1) {
        this.uploadUrl = this.$url + 'backgroundImageFile/upload'
      } else {
        this.uploadUrl = this.$url + 'blogImageFile/upload'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.imageFileForm {
  width: 100%;
  height: 100%;
  text-align: center;

  .switch {
    margin-bottom: 40px;
  }

  .upload {
    margin-bottom: 20px;
  }
}

.copyButton {
  margin-left: 20px;
}
</style>
