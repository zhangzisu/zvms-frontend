<template>
  <v-card class="grey lighten-3" flat>
    <v-card-actions>
      <v-spacer/>
      <v-btn
        color="primary"
        @click="load"
        depressed
        :loading="$store.state.loading"
        :disabled="!!extra"
      >加载信息</v-btn>
      <v-btn color="accent" @click="remove" depressed>删除</v-btn>
    </v-card-actions>
    <v-card-text>
      <v-card>
        <v-tabs v-model="tab" centered grow>
          <v-tab :key="0">成员批量操作</v-tab>
          <v-tab :key="1" v-if="!!extra">成员信息</v-tab>
          <v-tab :key="2" v-if="!!extra">组长信息</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item :key="0">
            <strong>Coming soon!!!</strong>
          </v-tab-item>
          <v-tab-item :key="1" v-if="!!extra">
            <member-view :id="id" :items="extra.members" no-action/>
          </v-tab-item>
          <v-tab-item :key="2" v-if="!!extra">
            <user-info :info="extra.leader"/>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import Axios from 'axios'
import userInfo from '../../../components/userinfo.vue'
import memberView from '../member/view.vue'

export default {
  name: 'teamItem',
  props: ['id', 'item'],
  components: {
    userInfo,
    memberView
  },
  data: () => ({
    extra: undefined,
    tab: undefined
  }),
  methods: {
    async remove () {
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.delete(`/activities/${this.id}/teams/${this.item.id}`)
        if (s !== 0) throw new Error(p)
        this.$emit('updated')
      } catch (e) {
        console.log(e)
      } finally {
        this.$store.commit('loading', false)
      }
    },
    async load () {
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.get(`/activities/${this.id}/teams/${this.item.id}`)
        if (s !== 0) throw new Error(p)
        this.extra = p
      } catch (err) {
        console.log(err)
      } finally {
        this.$store.commit('loading', false)
      }
    }
  }
}
</script>
