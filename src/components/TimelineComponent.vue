<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">新增时间轴</el-button>
    <el-dialog
      title="新增时间轴"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="时间轴">
          <el-input v-model="form.point"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">创建</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="编辑时间轴"
      :visible.sync="editDialogVisible"
      width="30%">
      <el-form ref="form" :model="editForm" label-width="80px">
        <el-form-item label="时间轴">
          <el-input v-model="editForm.point"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="editForm.time"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSave">修改</el-button>
          <el-button @click="editDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="40"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="point"
        label="内容"
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="time"
        label="时间"
        width="250"
        header-align="center">
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
</template>

<script>
import axios from 'axios'

export default {
  name: 'TimelineComponent',
  created () {
    this.getTableData()
  },
  data () {
    return {
      dialogVisible: false,
      editDialogVisible: false,
      tableData: [],
      form: {
        id: '',
        point: '',
        time: ''
      },
      editForm: {
        id: '',
        point: '',
        time: ''
      }
    }
  },
  methods: {
    getTableData () {
      const that = this
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8080/timeline/selectAllTimeline'
      }).then(function (res) {
        that.tableData = res.data.data
        for (const data of that.tableData) {
          data.time = that.$moment(data.time).format('YYYY-MM-DD HH:mm:ss')
        }
      })
    },
    handleEdit (index, row) {
      this.editForm = {
        id: row.id,
        point: row.point,
        time: row.time
      }
      this.editDialogVisible = true
    },
    handleDelete (index, row) {
      const that = this
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/timeline/deleteTimelineById',
        data: {
          id: row.id
        }
      }).then(function (res) {
        if (res.data.data) {
          that.getTableData()
        }
      })
    },
    onSubmit () {
      this.form.time = this.$moment().format('YYYY-MM-DD HH:mm:ss')
      console.log(this.form)
      const that = this
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/timeline/insertTimeline',
        data: that.form
      }).then(function (res) {
        if (res.data.data) {
          that.form.point = ''
          that.dialogVisible = false
          that.getTableData()
          that.$message({
            message: '插入成功',
            type: 'success'
          })
        }
      })
    },
    onSave () {
      const that = this
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/timeline/updateTimeline',
        data: that.editForm
      }).then(function (res) {
        if (res.data.data) {
          that.$message({
            message: '修改成功',
            type: 'success'
          })
          that.editDialogVisible = false
          that.getTableData()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
