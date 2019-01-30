<template>
  <v-container fluid>
    <v-layout fill-height>
      <v-flex xs12>
        <v-card>
          <v-tabs v-model="tab" centered grow>
            <v-tab :key="0">我的</v-tab>
            <v-tab :key="1">班级</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item :key="0">
              <userinfo :profile="$store.state.profile" show-history/>
            </v-tab-item>
            <v-tab-item :key="1" v-if="!!classInfo">
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
import userinfo from '../components/userinfo.vue'
import groupinfo from '../components/groupinfo.vue'

export default {
  name: 'my',
  components: {
    userinfo,
    groupinfo
  },
  data: () => ({
    tab: 0,
    classInfo: undefined
  }),
  async created () {
    this.$store.commit('loading', true)
    try {
      const { data: { s, p } } = await Axios.get('/users/' + this.$store.state.profile.id)
      if (s !== 0) throw new Error(p)
      this.$store.commit('profile', p)
    } catch (err) {
      console.log(err)
    } finally {
      this.$store.commit('loading', false)
    }
  },
  watch: {
    tab () {
      if (this.tab === 1) {
        if (this.classInfo === undefined) {
          this.loadClassInfo()
        }
      }
    }
  },
  methods: {
    async loadClassInfo () {
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.get('/groups/' + this.$store.state.profile.groupId)
        if (s !== 0) throw new Error(p)
        this.classInfo = p
        this.tab = 1
      } catch (err) {
        console.log(err)
      } finally {
        this.$store.commit('loading', false)
      }
    }
  }
}
</script>
