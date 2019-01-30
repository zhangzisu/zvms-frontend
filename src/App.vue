<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-bold">镇海中学义工管理系统</span>
        <span class="font-weight-light">测试版</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-progress-circular indeterminate v-show="$store.state.isLoading"/>
      <v-btn flat to="/">
        <span>首页</span>
      </v-btn>
      <v-btn flat to="/my">
        <span>个人中心</span>
      </v-btn>
      <template v-if="$store.state.token">
        <v-btn flat @click="logout">
          <span>登出</span>
        </v-btn>
        <v-btn flat to="/admin">
          <span>管理</span>
        </v-btn>
      </template>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
  }),
  methods: {
    logout () {
      this.$store.commit('token', undefined)
      this.$router.push('/')
    }
  }
}
</script>
