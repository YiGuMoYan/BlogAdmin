<template>
  <div>
    <div>
      <el-button type="primary" @click="dialogVisible = true">新增博客</el-button>
      <el-dialog
        title="新增博客"
        :visible.sync="dialogVisible"
        width="50%">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-input type="textarea" v-model="form.classification"></el-input>
          </el-form-item>
          <el-form-item label="上传">
            <el-upload
              drag
              class="upload-demo"
              :on-change="handleChange"
              :auto-upload="false">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传md文件</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">创建</el-button>
            <el-button @click="cancelDialog">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="successDialog"
        width="30%">
        <el-result icon="success" title="成功">
          <template slot="extra">
            <el-button type="primary" size="medium" @click="successDialogConfirm">确认</el-button>
          </template>
        </el-result>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="errorDialog"
        width="30%">
        <el-result icon="error" title="错误">
          <template slot="extra">
            <el-button type="primary" size="medium" @click="errorDialogConfirm">返回</el-button>
          </template>
        </el-result>
      </el-dialog>
      <el-dialog
        title="编辑博客"
        :visible.sync="editDialog"
        width="80%">
        <el-form ref="form" :model="editForm" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="editForm.title"></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-input type="textarea" v-model="editForm.classification"></el-input>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="editForm.time"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="博客">
            <v-md-editor v-model="editForm.markdown" :value="editForm.markdown" height="400px"
                         preview-class="vuepress-markdown-body"></v-md-editor>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSave">保存</el-button>
            <el-button @click="cancelEdit">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        border>
        <el-table-column
          prop="id"
          label="id"
          width="40"
          header-align="center"
          align="center">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="time"
          label="时间"
          width="180"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="classification"
          label="分类"
          header-align="center">
          <template slot-scope="tagScope">
            <el-tag v-for="(tag, index) in tagScope.row.classification" :key="index" class="tag">{{ tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200"
          header-align="center"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BlogComponents',
  created () {
    this.getTableData()
  },
  data () {
    return {
      dialogVisible: false,
      successDialog: false,
      errorDialog: false,
      editDialog: false,
      tableData: [],
      form: {
        title: '',
        classification: '',
        markdown: '',
        time: ''
      },
      editForm: {
        id: '',
        title: '',
        classification: '',
        markdown: '',
        time: ''
      }
    }
  },
  methods: {
    getTableData (format) {
      const that = this
      axios({
        url: 'http://127.0.0.1:8080/markdown/selectAllMarkdown',
        method: 'get'
      }).then(function (res) {
        that.tableData = res.data.data
        for (const data of that.tableData) {
          data.time = that.$moment(data.time).format('YYYY-MM-DD HH:mm:ss')
          data.classification = data.classification.split('|')
        }
      })
    },
    handleEdit (index, row) {
      const that = this
      axios({
        url: 'http://127.0.0.1:8080/markdown/selectMarkdownById',
        method: 'post',
        data: {
          id: row.id
        }
      }).then(function (res) {
        that.editForm = res.data.data
        that.editForm = res.data.data
        that.editDialog = true
        console.log(that.editForm)
      })
    },
    handleDelete (index, row) {
      const that = this
      axios({
        url: 'http://127.0.0.1:8080/markdown/deleteMarkdownById',
        method: 'post',
        data: { id: row.id }
      }).then(function (res) {
        that.getTableData()
      })
    },
    onSubmit () {
      this.form.time = this.$moment().format('yyyy-MM-DD hh:mm:ss')
      const that = this
      console.log(that.form)
      axios({
        url: 'http://127.0.0.1:8080/markdown/insertMarkdown',
        method: 'post',
        data: that.form
      }).then(function (res) {
        if (res.data.data) {
          that.successDialog = true
        } else {
          that.errorDialog = true
        }
      })
    },
    handleChange (file) {
      const that = this
      if (file.raw) {
        const fileContent = file.raw
        const reader = new FileReader()
        reader.readAsText(fileContent, 'utf-8')
        reader.onload = (e) => {
          that.form.markdown = e.target.result
          console.log(that.form.markdown)
        }
      }
    },
    successDialogConfirm () {
      this.successDialog = false
      this.dialogVisible = false
      this.getTableData()
    },
    errorDialogConfirm () {
      this.errorDialog = false
    },
    cancelDialog () {
      this.dialogVisible = false
      this.form.title = ''
      this.form.markdown = ''
      this.form.classification = ''
    },
    cancelEdit () {
      this.editDialog = false
    },
    onSave () {
      const that = this
      axios({
        url: 'http://127.0.0.1:8080/markdown/updateMarkdown',
        method: 'post',
        data: that.editForm
      }).then(function (res) {
        if (res.data.data) {
          that.editDialog = false
          that.getTableData()
          that.editForm = {
            id: '',
            title: '',
            classification: '',
            markdown: '',
            time: ''
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.tag {
  margin-left: 10px;
}
</style>
