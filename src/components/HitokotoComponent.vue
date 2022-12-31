<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">新增一言</el-button>
    <el-dialog
      title="新增一言"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item label="一言">
          <el-input type="textarea" v-model="formData.say"></el-input>
        </el-form-item>
        <el-form-item label="出处作品">
          <el-input v-model="formData.fromArt"></el-input>
        </el-form-item>
        <el-form-item label="出处人物">
          <el-input v-model="formData.fromWho"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">创建</el-button>
          <el-button @click="cancelDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="编辑一言"
      :visible.sync="editVisible"
      width="50%">
      <el-form ref="form" :model="editData" label-width="80px">
        <el-form-item label="一言">
          <el-input type="textarea" v-model="editData.say"></el-input>
        </el-form-item>
        <el-form-item label="出处作品">
          <el-input v-model="editData.fromArt"></el-input>
        </el-form-item>
        <el-form-item label="出处人物">
          <el-input v-model="editData.fromWho"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSave">创建</el-button>
          <el-button @click="cancelSave">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="id"
          label="id"
          width="40"
          header-align="center"
          align="center">
        </el-table-column>
        <el-table-column
          prop="say"
          label="一言"
          header-align="center">
        </el-table-column>
        <el-table-column
          label="出处"
          header-align="center">
          <el-table-column
            prop="fromArt"
            label="作品"
            width="250"
            header-align="center">
          </el-table-column>
          <el-table-column
            prop="fromWho"
            label="人物"
            width="100"
            header-align="center">
          </el-table-column>
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
  name: 'HitokotoComponent',
  created () {
    this.getTableData()
  },
  data () {
    return {
      dialogVisible: false,
      editVisible: false,
      tableData: [],
      formData: {
        id: '',
        say: '',
        fromWho: '',
        fromArt: ''
      },
      editData: {
        id: '',
        say: '',
        fromWho: '',
        fromArt: ''
      }
    }
  },
  methods: {
    getTableData () {
      const that = this
      axios({
        method: 'get',
        url: that.$url + 'hitokoto/selectAllHitokoto'
      }).then(function (res) {
        that.tableData = res.data.data
      })
    },
    handleEdit (index, row) {
      this.editVisible = true
      this.editData.id = row.id
      this.editData.say = row.say
      this.editData.fromWho = row.fromWho
      this.editData.fromArt = row.fromArt
    },
    handleDelete (index, row) {
      const that = this
      axios({
        method: 'post',
        url: that.$url + 'hitokoto/deleteHitokoto',
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
      const that = this
      axios({
        method: 'post',
        url: that.$url + 'hitokoto/insertHitokoto',
        data: that.formData
      }).then(function (res) {
        if (res.data.data) {
          that.getTableData()
          that.dialogVisible = false
        }
      })
    },
    cancelDialog () {
      this.formData = {
        id: '',
        say: '',
        fromWho: '',
        fromArt: ''
      }
      this.dialogVisible = false
    },
    onSave () {
      const that = this
      axios({
        method: 'post',
        url: that.$url + 'hitokoto/updateHitokoto',
        data: that.editData
      }).then(function (res) {
        that.getTableData()
        that.editVisible = false
        that.editData = {
          id: '',
          say: '',
          fromWho: '',
          fromArt: ''
        }
      })
    },
    cancelSave () {
      this.editVisible = false
      this.editData = {
        id: '',
        say: '',
        fromWho: '',
        fromArt: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
