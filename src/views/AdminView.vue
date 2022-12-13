<template>
  <div class="base">
    <el-container class="base">
      <el-aside class="aside">
        <div class="avatar_box">
          <img src="../assets/logo.png" alt="">
        </div>
        <el-menu :collapse="isCollapse" @select="handleSelect">
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">博客</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">账号</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="head">
          <div v-if="key === '1'">
            博客
          </div>
          <div v-else-if="key === '2'">账号</div>
        </el-header>
        <el-main>
          <BlogComponents/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import BlogComponents from '@/components/BlogComponents.vue'

export default {
  name: 'AdminView',
  components: { BlogComponents },
  data () {
    return {
      isCollapse: false,
      key: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.key = key
      console.log(this.key)
    }
  }
}
</script>

<style lang="less" scoped>
.base {
  height: 100%;
}

.aside {
  width: 200px;
}

.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  margin: 30px auto 20px;
  background-color: #fff;

  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}

.head {
  height: 100px !important;
  padding: 20px;

  div {
    height: 100%;
    font-size: 30px;
    line-height: 60px;
    margin-left: 30px;
  }
}
</style>
