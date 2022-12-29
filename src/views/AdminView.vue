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
            <span slot="title">一言</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">图床</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-menu"></i>
            <span slot="title">时间轴</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-menu"></i>
            <span slot="title">关于</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="head">
          <div v-if="key === '1'">博客</div>
          <div v-else-if="key === '2'">一言</div>
          <div v-else-if="key === '3'">图床</div>
          <div v-else-if="key === '4'">时间轴</div>
          <div v-else-if="key === '5'">关于</div>
        </el-header>
        <el-main>
          <div v-if="key === '1'"><BlogComponents/></div>
          <div v-else-if="key === '2'"><HitokotoComponent/></div>
          <div v-else-if="key === '3'"><ImageFileComponent/></div>
          <div v-else-if="key === '4'"><TimelineComponent/></div>
          <div v-else-if="key === '5'"><AboutComponent/></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import BlogComponents from '@/components/BlogComponent.vue'
import HitokotoComponent from '@/components/HitokotoComponent.vue'
import ImageFileComponent from '@/components/ImageFileComponent.vue'
import TimelineComponent from '@/components/TimelineComponent.vue'
import AboutComponent from '@/components/AboutComponent.vue'

export default {
  name: 'AdminView',
  components: {
    AboutComponent,
    TimelineComponent,
    ImageFileComponent,
    HitokotoComponent,
    BlogComponents
  },
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
