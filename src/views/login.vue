<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 md6>
        <v-card>
          <v-card-title class="headline primary white--text">登录</v-card-title>
          <v-card-text>
            <v-text-field type="username" v-model="form.username" label="用户名/邮箱"/>
            <v-text-field type="password" v-model="form.password" label="密码"/>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="primary" :loading="$store.state.loading" @click="login">提交</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Axios from 'axios'
import dialogs from '../utils/dialogs'

export default {
  name: 'login',
  data: () => ({
    form: {
      username: undefined,
      password: undefined
    }
  }),
  methods: {
    async login () {
      this.$store.commit('loading', true)
      try {
        let s, p;
        ({ data: { s, p } } = await Axios.post('/auth/login', this.form))
        if (s !== 0) throw new Error(p)
        this.$store.commit('token', p.token);
        ({ data: { s, p } } = await Axios.get('/users/' + p.userId))
        if (s !== 0) throw new Error(p)
        this.$store.commit('profile', p)
        dialogs.toasts.success('Login succeeded')
        this.$router.push('my')
      } catch (err) {
        dialogs.toasts.error(err)
      } finally {
        this.$store.commit('loading', false)
      }
    }
  }
}
</script>
