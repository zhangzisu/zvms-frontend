<template>
  <v-container fluid grid-list-md>
    <v-layout row>
      <v-flex xs3>
        <v-card class="fill-height">
          <v-card-text class="display-3 font-weight-thin text-xs-center">#{{ item.id }}</v-card-text>
          <v-card-text>
            <v-chip label>{{ status[item.state] }}</v-chip>
            <v-chip label>{{ item.isComputed ? '已生效' : '未生效' }}</v-chip>
            <v-chip label>{{ item.isPublic ? '校外' : '校内' }}</v-chip>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs9>
        <v-form v-if="showEdit" v-model="valid">
          <v-card class="fill-height">
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
        <v-card v-else class="fill-height">
          <v-card-title class="headline">{{ item.name }}</v-card-title>
          <v-card-text>
            <pre>{{ item.description }}</pre>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="primary" @click="showEdit = !showEdit" depressed v-if="profile.isAdmin || (profile.isProvider && profile.id === item.ownerId)">编辑</v-btn>
            <v-btn color="accent" @click="changeState" depressed :disabled="item.state === 4" v-if="profile.isAdmin">更改状态</v-btn>
            <v-btn color="warning" @click="compute" depressed :disabled="item.state !== 4 || item.isComputed" v-if="profile.isAdmin">计算贡献</v-btn>
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
            <v-tab :key="3" v-if="!!myself">我的义工</v-tab>
            <v-tab :key="4" v-if="item.state === 3">批量操作</v-tab>
            <v-tab :key="5">媒体资料</v-tab>
            <v-tab :key="6" v-if="!!myself && item.state === 3">资料上传</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item :key="0">
              <chance-view :id="id" :items.sync="item.chances" :state="item.state" ref="chance"/>
            </v-tab-item>
            <v-tab-item :key="1">
              <team-view :id="id" :items.sync="item.teams" :state="item.state" ref="team"/>
            </v-tab-item>
            <v-tab-item :key="2">
              <member-view :id="id" :items.sync="item.members" :state="item.state" ref="member" @updated="updateChances"/>
            </v-tab-item>
            <v-tab-item :key="3" v-if="!!myself">
              <member-item :id="id" :state="item.state" :item="myself"/>
            </v-tab-item>
            <v-tab-item :key="4" v-if="item.state === 3">
              <batch :id="id" @updated="updateMembers"/>
            </v-tab-item>
            <v-tab-item :key="5">
              <gallery :items="item.medias" @updated="updateMedias"/>
            </v-tab-item>
            <v-tab-item :key="6" v-if="!!myself && item.state === 3">
              <v-card flat>
                <v-card-text>
                  <input type="file" ref="input"/>
                </v-card-text>
                <v-card-actions>
                  <v-spacer/>
                  <v-btn color="primary" depressed @click="upload" :loading="$store.state.loading">上传</v-btn>
                </v-card-actions>
              </v-card>
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
import dialogs from '../../utils/dialogs'
import { V_NOT_EMPTY } from '../../utils/validation'
import userInfo from '../../components/userinfo.vue'
import gallery from '../../components/gallery.vue'
import chanceView from './chance/view.vue'
import teamView from './team/view.vue'
import memberView from './member/view.vue'
import batch from './batch.vue'
import memberItem from './member/item.vue'

export default {
  components: {
    userInfo,
    chanceView,
    teamView,
    memberView,
    batch,
    gallery,
    memberItem
  },
  props: ['id'],
  computed: {
    profile () {
      return this.$store.state.profile
    },
    myself () {
      return this.item.members.find(x => x.userId === this.profile.id)
    }
  },
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
      members: [],
      medias: []
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
  watch: {
    id: {
      handler () {
        this.load()
      },
      immediate: true
    }
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
        dialogs.toasts.error(err)
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
        dialogs.toasts.error(err)
      } finally {
        this.$store.commit('loading', false)
      }
    },
    async changeState () {
      if (await dialogs.confirm('该操作无法撤销！责任自负！')) {
        this.$store.commit('loading', true)
        const form = { name: this.name, description: this.description }
        try {
          const { data: { s, p } } = await Axios.post(`/activities/${this.id}/changestate`, form)
          if (s !== 0) throw new Error(p)
          await this.load()
        } catch (err) {
          dialogs.toasts.error(err)
        } finally {
          this.$store.commit('loading', false)
        }
      }
    },
    async compute () {
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.post(`/activities/${this.id}/compute`)
        if (s !== 0) throw new Error(p)
        await this.load()
      } catch (err) {
        console.log(err)
      } finally {
        this.$store.commit('loading', false)
      }
    },
    async upload () {
      if (!this.$refs.input.files.length) {
        dialogs.toasts.error('请选择文件')
        return
      }
      this.$store.commit('loading', true)
      const form = new FormData()
      form.append('memberId', this.myself.id)
      form.append('file', this.$refs.input.files[0])
      try {
        const { data: { s, p } } = await Axios.post(`/medias`, form)
        if (s !== 0) throw new Error(p)
        await this.load()
      } catch (err) {
        dialogs.toasts.error(err)
      } finally {
        this.$store.commit('loading', false)
      }
    },
    async updateMedias () {
      this.$store.commit('loading', true)
      try {
        const { data: { s, p } } = await Axios.get(`/activities/${this.id}/medias`)
        if (s !== 0) throw new Error(p)
        this.item.medias = p
      } catch (err) {
        dialogs.toasts.error(err)
      } finally {
        this.$store.commit('loading', false)
      }
    },
    updateChances () {
      this.$refs.chance.load()
    },
    updateMembers () {
      this.$refs.member.load()
    }
  }
}
</script>
