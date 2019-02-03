<template>
  <v-container fluid grid-list-md>
    <v-layout row>
      <v-flex xs3>
        <v-card>
          <v-card-text class="display-3 font-weight-thin text-xs-center">#{{ item.id }}</v-card-text>
          <v-card-text>
            <v-chip>{{ status[item.state] }}</v-chip>
            <v-chip>{{ item.isComputed ? '已生效' : '未生效' }}</v-chip>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs9>
        <v-form v-if="showEdit" v-model="valid">
          <v-card>
            <v-card-text>
              <v-text-field v-model="item.name" :rules="rules" label="名称"/>
              <v-textarea v-model="item.description" :rules="rules" label="描述"/>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn @click="load" depressed color="warning">重置</v-btn>
              <v-btn @click="submit" :loading="$store.state.loading" :disabled="!valid" depressed color="primary">提交</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
        <v-card v-else>
          <v-card-title class="headline">{{ item.name }}</v-card-title>
          <v-card-text>
            <pre>{{ item.description }}</pre>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="primary" @click="showEdit = !showEdit" depressed>编辑</v-btn>
            <v-btn color="accent" @click="changeState" depressed>更改状态</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-tabs v-model="tab" centered grow>
            <v-tab :key="0">报名控制</v-tab>
            <v-tab :key="1">分队信息</v-tab>
            <v-tab :key="2">人员管理</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item :key="0">
              <chance-view :id="id" :items.sync="item.chances"/>
            </v-tab-item>
            <v-tab-item :key="1">
              <team-view :id="id" :items.sync="item.teams"/>
            </v-tab-item>
            <v-tab-item :key="2">
              <member-view :id="id" :items.sync="item.members"/>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-card dark>
          <v-card-title class="headline">义工提供方</v-card-title>
          <user-info :info="item.owner"/>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Axios from 'axios'
import { V_NOT_EMPTY } from '../../utils/validation'
import userInfo from '../../components/userinfo.vue'
import chanceView from './chance/view.vue'
import teamView from './team/view.vue'
import memberView from './member/view.vue'

export default {
  components: {
    userInfo,
    chanceView,
    teamView,
    memberView
  },
  props: ['id'],
  data: () => ({
    item: {
      id: -1,
      name: undefined,
      description: undefined,
      state: undefined,
      isComputed: undefined,
      owner: {},
      chances: [],
      teams: [],
      members: []
    },
    valid: false,
    rules: [V_NOT_EMPTY()],
    showEdit: false,
    status: [
      '等待审核',
      '审核通过',
      '报名中',
      '等待核查',
      '完成'
    ],
    tab: 0
  }),
  created () {
    this.load()
  },
  methods: {
    async load () {
      this.showEdit = false
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.get(`/activities/${this.id}`)
        if (s !== 0) throw new Error(p)
        this.item = p
      } catch (err) {
        console.log(err)
      } finally {
        this.$store.commit('loading', false)
      }
    },
    async submit () {
      this.showEdit = false
      this.$store.commit('loading', true)
      const form = { name: this.item.name, description: this.item.description }
      try {
        const { data: { s, p } } = await Axios.put(`/activities/${this.id}`, form)
        if (s !== 0) throw new Error(p)
        await this.load()
      } catch (err) {
        console.log(err)
      } finally {
        this.$store.commit('loading', false)
      }
    },
    async changeState () {
      this.$store.commit('loading', true)
      const form = { name: this.name, description: this.description }
      try {
        const { data: { s, p } } = await Axios.post(`/activities/${this.id}/changestate`, form)
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
