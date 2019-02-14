<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-tabs v-model="tab" grow centered>
            <v-tab :key="0">简单</v-tab>
            <v-tab :key="1">高级</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item :key="0">
              <v-form>
                <v-card-text>
                  <v-text-field v-model="form.name" label="用户名" :rules="rules"/>
                  <v-text-field v-model="form.email" type="email" label="邮箱" :rules="rules"/>
                  <v-textarea v-model="form.description" label="描述" placeholder="留空以使用默认值"/>
                  <v-text-field v-model="form.password" type="password" label="密码" :rules="rules"/>
                  <v-checkbox v-model="form.isSecretary" label="团支书"/>
                  <v-checkbox v-model="form.isManager" label="实践部"/>
                  <v-checkbox v-model="form.isAdmin" label="义管会"/>
                  <v-checkbox v-model="form.isProvider" label="提供方"/>
                  <v-text-field v-model="form.groupId" type="number" label="用户组ID"/>
                </v-card-text>
                <v-card-actions>
                  <v-spacer/>
                  <v-btn color="primary" @click="create">创建</v-btn>
                </v-card-actions>
              </v-form>
            </v-tab-item>
            <v-tab-item :key="1">
              <v-card flat>
                <v-card-text>
                  Coming soon
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Axios from 'axios'
import dialogs from '../../utils/dialogs'
import { Z_NOT_EMPTY } from '../../utils/validation'

export default {
  data: () => ({
    tab: 0,
    form: {
      name: undefined,
      email: undefined,
      description: undefined,
      password: undefined,
      isSecretary: false,
      isManager: false,
      isAdmin: false,
      isProvider: false,
      groupId: undefined
    },
    rules: [Z_NOT_EMPTY()]
  }),
  methods: {
    async create () {
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.post(`/users/`, this.form)
        if (s !== 0) throw new Error(p)
        dialogs.toasts.success('用户ID: ' + p[0])
      } catch (err) {
        dialogs.toasts.error(err)
      } finally {
        this.$store.commit('loading', false)
      }
    }
  }
}
</script>
