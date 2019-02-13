<template>
  <v-card class="grey lighten-3" flat>
    <v-card-actions>
      <v-spacer/>
      <v-btn color="primary" @click="load" depressed :loading="$store.state.loading" :disabled="!!extra">加载信息</v-btn>
      <v-btn color="accent" @click="remove" depressed :loading="$store.state.loading">删除</v-btn>
    </v-card-actions>
    <v-card-text>
      <v-card>
        <v-tabs v-model="tab" centered grow>
          <v-tab :key="0" v-if="state === 3">成员批量操作</v-tab>
          <v-tab :key="1" v-if="!!extra">成员信息</v-tab>
          <v-tab :key="2" v-if="!!extra">组长信息</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item :key="0" v-if="state === 3">
            <batch :id="id" :tid="item.id" @updated="load"/>
          </v-tab-item>
          <v-tab-item :key="1" v-if="!!extra">
            <member-view :id="id" :items="extra.members" :state="state" no-action/>
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
import dialogs from '../../../utils/dialogs'
import userInfo from '../../../components/userinfo.vue'
import memberView from '../member/view.vue'
import batch from '../batch.vue'

export default {
  props: ['id', 'item', 'state'],
  components: {
    userInfo,
    memberView,
    batch
  },
  data: () => ({
    extra: undefined,
    tab: undefined
  }),
  methods: {
    async remove () {
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.delete(`/teams/${this.item.id}`)
        if (s !== 0) throw new Error(p)
        this.$emit('updated')
      } catch (err) {
        dialogs.toasts.error(err)
      } finally {
        this.$store.commit('loading', false)
      }
    },
    async load () {
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.get(`/teams/${this.item.id}`)
        if (s !== 0) throw new Error(p)
        this.extra = p
      } catch (err) {
        dialogs.toasts.error(err)
      } finally {
        this.$store.commit('loading', false)
      }
    }
  }
}
</script>
