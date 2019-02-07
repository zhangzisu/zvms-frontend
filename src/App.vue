<template>
  <v-app>
    <v-navigation-drawer app v-model="nav">
      <v-list>
        <v-list-tile to="/">
          <v-list-tile-content>首页</v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/activities">
          <v-list-tile-content>义工列表</v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/users">
          <v-list-tile-content>用户列表</v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/my">
          <v-list-tile-content>个人中心</v-list-tile-content>
        </v-list-tile>
        <template v-if="$store.state.token">
          <v-list-tile @click="logout">
            <v-list-tile-content>登出</v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon @click="nav = !nav"/>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-bold">镇海中学义工管理系统</span>
        <span class="font-weight-light text-none">α-test-2</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-progress-circular indeterminate v-show="$store.state.isLoading"/>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer app inset height="auto">
      <v-card class="flex" flat tile>
        <v-card-actions class="justify-center">
          <a href="https://github.com/ZhangZisu/zvms-frontend" target="_blank" rel="noopener">开源项目</a>-&copy;2019&nbsp;
          <strong>镇海中学义管社</strong>-
          <a href="https://github.com/ZhangZisu/zvms-frontend/issues/new" target="_blank" rel="noopener">问题反馈</a>
        </v-card-actions>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    nav: false
  }),
  methods: {
    logout () {
      this.$store.commit('token', undefined)
      this.$router.push('/')
    }
  }
}
</script>
