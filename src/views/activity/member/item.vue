<template>
  <v-card class="grey lighten-3" flat>
    <v-card-actions>
      <v-spacer/>
      <v-btn color="primary" @click="load" :loading="$store.state.loading" :disabled="!!extra" depressed>加载信息</v-btn>
      <v-btn color="accent" @click="remove" :loading="$store.state.loading" depressed v-if="noAction === undefined">删除</v-btn>
    </v-card-actions>
    <v-card-text>
      <v-tabs v-model="tab" centered grow>
        <v-tab :key="0">状态</v-tab>
        <v-tab :key="1" v-if="state === 3">编辑</v-tab>
        <template v-if="!!extra">
          <v-tab :key="2">用户</v-tab>
          <v-tab :key="3">资料</v-tab>
        </template>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item :key="0">
          <v-card flat>
            <v-card-text>
              <div class="headline">评论</div>
              <pre>{{ item.comment }}</pre>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item :key="1" v-if="state === 3">
          <v-card flat>
            <v-card-text>
              <v-text-field v-model.number="item.iTime" type="number" label="内部时间"/>
              <v-text-field v-model.number="item.oTime" type="number" label="外部时间"/>
              <v-text-field v-model.number="item.uTime" type="number" label="万能时间"/>
              <v-textarea v-model="item.comment" label="评论" placeholder="留空为不变"/>
              <v-checkbox v-model="item.isLeaderApproved" label="队长批准"></v-checkbox>
              <v-checkbox v-model="item.isManagerApproved" label="学生会批准"></v-checkbox>
              <v-checkbox v-model="item.isAdminApproved" label="义管会批准"></v-checkbox>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn depressed @click="update">更新</v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
        <template v-if="!!extra">
          <v-tab-item :key="2">
            <user-info :info="extra.user"/>
          </v-tab-item>
          <v-tab-item :key="3">
            <gallery :items="extra.medias" @updated="load()"/>
          </v-tab-item>
        </template>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
import Axios from 'axios'
import dialogs from '../../../utils/dialogs'
import userInfo from '../../../components/userinfo.vue'
import gallery from '../../../components/gallery.vue'

export default {
  name: 'memberItem',
  components: {
    userInfo,
    gallery
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
        const { data: { s, p } } = await Axios.get(`/members/${this.item.id}`)
        if (s !== 0) throw new Error(p)
        this.extra = p
      } catch (err) {
        dialogs.err(err)
      } finally {
        this.$store.commit('loading', false)
      }
    },
    async remove () {
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.delete(`/members/${this.item.id}`)
        if (s !== 0) throw new Error(p)
        this.$emit('updated')
      } catch (err) {
        dialogs.err(err)
      } finally {
        this.$store.commit('loading', false)
      }
    },
    async update () {
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.put(`/members/${this.item.id}`, this.item)
        if (s !== 0) throw new Error(p)
        this.$emit('updated')
      } catch (err) {
        dialogs.err(err)
      } finally {
        this.$store.commit('loading', false)
      }
    }
  }
}
</script>
