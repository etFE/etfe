<template>
  <section class="header">
    <div class="navicon-con">
      <a class="hamburger" :class="{'is-active':sideBarShow}" @click="toggleSideBar">
        <i class="iconfont">&#xe604;</i>
      </a>
    </div>
    <div class="header-middle">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="admin-breadcrumb">
          <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="breItem in BreadcrumbList" :key="breItem.path" :to="{ path: breItem.path }"> {{ breItem.meta.title }} </el-breadcrumb-item>
          </transition-group>
        </el-breadcrumb>
    </div>
    <div class="header-right">
      <a class="user">{{ user }}</a>

      <el-dropdown trigger="click">
        <span class="el-dropdown-link ">
          <div class="userimg"></div>
        </span>
        <el-dropdown-menu slot="dropdown" class="dropdown-menu">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item>安全退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "NavBar",
  data() {
    return {
      hamActive: true,
      title: "后台管理系统",
      user: "测试",
      BreadcrumbList: []
    };
  },
  props: ["isShow"],
  mounted() {
    this.getBreadcrumb();
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  computed: {
    ...mapGetters(["sideBarShow"])
  },
  methods: {
    ...mapActions(["toggleSideBar"]),
    getBreadcrumb() {
      let BreadcrumbList = this.$route.matched;
      this.BreadcrumbList = BreadcrumbList;

      // this.BreadcrumbList = this.$route.matched.map((item, index) => {
      //   return item.meta.title;
      // });
      // console.log(this.BreadcrumbList,222)
    }
  }
};
</script>

<style lang="scss">
.header {
  position: relative;
  display: flex;
  color: #6f6f6f;
  .header-middle {
    padding: 0 20px;
    height: 100%;
    line-height: 50px;
    .admin-breadcrumb {
      height: 100%;
      line-height: 50px;
      font-family: "Hiragino Sans GB";
    }
  }
}
.navicon-con {
  margin-left: 10px;
  height: 100%;
  line-height: 50px;

  .hamburger {
    display: inline-block;
    cursor: pointer;
    transform: rotate(90deg);
    transition: 0.38s;
    transform-origin: 50% 50%;
  }
  .is-active {
    transform: rotate(0deg);
  }
}

.header-middle {
  flex: 1;
  display: inline-block;
}

.header-right {
  margin-right: 20px;
  height: 100%;
  .user {
    padding: 10px;
    height: 100%;
    line-height: 50px;
  }
  .userimg {
    display: inline-block;
    height: 40px;
    width: 40px;
    cursor: pointer;
    border-radius: 50%;
    vertical-align: middle;
    border: 1px solid #ddd;
  }
}

.dropdown-menu {
  top: 40px !important;
  width: 200px;

  // .popper__arrow {
  //   display: none;
  // }
}
</style>
