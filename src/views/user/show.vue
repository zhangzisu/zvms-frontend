<template>
  <v-container fluid>
    <v-layout fill-height>
      <v-flex xs12>
        <v-card flat>
          <v-tabs v-model="tab" centered grow>
            <v-tab :key="0">用户</v-tab>
            <v-tab :key="1">编辑</v-tab>
            <v-tab :key="2">班级</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item :key="0">
              <userinfo :info="userInfo" show-relations/>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-text-field v-model="userInfo.email" type="email" label="邮箱"/>
                  <v-textarea v-model="userInfo.description" label="描述（留空为不变）"/>
                  <v-text-field v-model="userInfo.password" type="password" label="新密码（留空为不变）"/>
                  <v-text-field v-model="userInfo.name" label="用户名" :disabled="!$store.state.profile.isAdmin"/>
                  <v-checkbox v-model="userInfo.isSecretary" label="团支书" :disabled="!$store.state.profile.isAdmin"/>
                  <v-checkbox v-model="userInfo.isManager" label="实践部" :disabled="!$store.state.profile.isAdmin"/>
                  <v-checkbox v-model="userInfo.isAdmin" label="义管会" :disabled="!$store.state.profile.isAdmin"/>
                  <v-checkbox v-model="userInfo.isProvider" label="提供方" :disabled="!$store.state.profile.isAdmin"/>
                  <v-checkbox v-model="userInfo.isRemoved" label="无效用户" :disabled="!$store.state.profile.isAdmin"/>
                  <v-text-field v-model.number="userInfo.groupId" type="number" :disabled="!$store.state.profile.isAdmin" label="用户组ID"/>
                </v-card-text>
                <v-card-actions>
                  <v-spacer/>
                  <v-btn color="primary" @click="update" depressed>更新</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
            <v-tab-item :key="2" v-if="!!classInfo">
              <groupinfo :info="classInfo"/>
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
import userinfo from '../../components/userinfo.vue'
import groupinfo from '../../components/groupinfo.vue'

export default {
  props: ['id'],
  components: {
    userinfo,
    groupinfo
  },
  data: () => ({
    tab: 0,
    classInfo: undefined,
    userInfo: {}
  }),
  watch: {
    id: {
      handler () {
        this.load()
      },
      immediate: true
    },
    tab: {
      handler () {
        if (this.tab === 2) {
          if (this.classInfo === undefined) {
            this.loadClassInfo()
          }
        }
      }
    }
  },
  methods: {
    async load () {
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.get('/users/' + this.id)
        if (s !== 0) throw new Error(p)
        this.userInfo = p
        if (this.$store.state.profile.id === this.id) {
          this.$store.commit('profile', p)
        }
      } catch (err) {
        dialogs.toasts.error(err)
      } finally {
        this.$store.commit('loading', false)
      }
    },
    async loadClassInfo () {
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.get('/groups/' + this.userInfo.groupId)
        if (s !== 0) throw new Error(p)
        this.classInfo = p
        this.tab = 2
      } catch (err) {
        dialogs.toasts.error(err)
      } finally {
        this.$store.commit('loading', false)
      }
    },
    async update () {
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.put(`/users/${this.id}`, this.userInfo)
        if (s !== 0) throw new Error(p)
        await this.load()
      } catch (err) {
        console.log(err)
      } finally {
        this.$store.commit('loading', false)
      }
    }
  }
}
</script>
