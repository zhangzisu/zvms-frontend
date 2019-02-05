<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 md6>
        <v-card>
          <v-card-title class="headline primary white--text">登录</v-card-title>
          <v-card-text>
            <v-text-field type="number" v-model.number="uid" label="用户ID"/>
            <v-text-field type="password" v-model="pass" label="密码"/>
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
    uid: undefined,
    pass: undefined
  }),
  methods: {
    async login () {
      this.$store.commit('loading', true)
      const form = {
        id: this.uid,
        password: this.pass
      }
      try {
        let s, p;
        ({ data: { s, p } } = await Axios.post('/auth/login', form))
        if (s !== 0) throw new Error(p)
        this.$store.commit('token', p.token);
        ({ data: { s, p } } = await Axios.get('/users/' + form.id))
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
