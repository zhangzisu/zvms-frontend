<template>
  <v-card class="grey lighten-3" flat>
    <v-card-actions>
      <v-spacer/>
      <v-btn color="primary" @click="load" :loading="$store.state.loading" :disabled="!!extra" depressed>加载信息</v-btn>
      <v-btn color="accent" @click="remove" depressed v-if="noAction === undefined">删除</v-btn>
    </v-card-actions>
    <v-card-text>
      <v-tabs v-model="tab" centered grow>
        <v-tab :key="0">状态</v-tab>
        <v-tab :key="1">编辑</v-tab>
        <v-tab :key="2" v-if="!!extra">用户</v-tab>
      </v-tabs>
      <v-tabs-items>
        <v-tab-item :key="0">
        </v-tab-item>
        <v-tab-item :key="1">
        </v-tab-item>
        <v-tab-item :key="2" v-if="!!extra">
          <user-info :info="extra.user"/>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
import Axios from 'axios'
import userInfo from '../../../components/userinfo.vue'

export default {
  name: 'memberItem',
  components: {
    userInfo
  },
  props: ['id', 'item', 'state', 'noAction'],
  data: () => ({
    tab: undefined,
    extra: undefined
  }),
  methods: {
    async load () {
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.get(`/activities/${this.id}/members/${this.item.id}`)
        if (s !== 0) throw new Error(p)
        this.extra = p
      } catch (err) {
        console.log(err)
      } finally {
        this.$store.commit('loading', false)
      }
    },
    async remove () {
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.delete(`/activities/${this.id}/members/${this.item.id}`)
        if (s !== 0) throw new Error(p)
        this.$emit('updated')
      } catch (err) {
        console.log(err)
      } finally {
        this.$store.commit('loading', false)
      }
    }
  }
}
</script>
