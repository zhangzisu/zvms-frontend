<template>
  <v-card flat class="transparent">
    <v-container fluid grid-list-md>
      <v-layout row>
        <v-flex xs3>
          <v-card class="fill-height">
            <v-card-text>
              <v-avatar tile size="100%">
                <img :src="avatarUrl"/>
              </v-avatar>
            </v-card-text>
            <v-card-text>
              <v-chip v-if="info.isAdmin">义管会</v-chip>
              <v-chip v-if="info.isManager">实践部</v-chip>
              <v-chip v-if="info.isSecretary">团支书</v-chip>
              <v-chip v-if="info.isProvider">义工提供方</v-chip>
              <v-chip v-if="info.isRemoved">无效用户</v-chip>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs9>
          <v-card class="fill-height">
            <v-card-title class="headline">{{ info.name }}</v-card-title>
            <v-card-text>
              <v-list dense>
                <v-list-tile>
                  <v-list-tile-content>用户ID</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ info.id }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>邮箱</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ info.email }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>校内义工总时长</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ info.iTime }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>校外义工总时长</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ info.oTime }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>普适义工总时长</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ info.uTime }}</v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card-text>
            <v-card-text>
              <pre>{{ info.description }}</pre>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <template v-if="showRelations !== undefined">
        <v-layout row>
          <v-flex xs12>
            <v-card>
              <v-card-title class="headline">义工历史</v-card-title>
              <v-data-table :items="info.history" :headers="headers" :loading="$store.state.loading">
                <template slot="items" slot-scope="{ item }">
                  <tr>
                    <td>{{ item.id }}</td>
                    <td>{{ item.activityId }}</td>
                    <td>{{ item.iTime }}</td>
                    <td>{{ item.oTime }}</td>
                    <td>{{ item.uTime }}</td>
                    <td>{{ item.isLeaderApproved && item.isManagerApproved && item.isAdminApproved }}</td>
                    <td>
                      <v-btn icon :to="`/activities/show/${item.activityId}`">
                        <v-icon small>open_in_new</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-card>
              <v-card-title class="headline">我上传的图片</v-card-title>
              <gallery :items="info.medias" @updated="$emit('updated')"/>
            </v-card>
          </v-flex>
        </v-layout>
      </template>
    </v-container>
  </v-card>
</template>

<script>
import gravatar from 'gravatar'
import gallery from './gallery.vue'

export default {
  name: 'userinfo',
  components: {
    gallery
  },
  props: ['info', 'showRelations'],
  data: () => ({
    avatarUrl: undefined,
    headers: [
      { text: 'MID', value: 'id' },
      { text: '活动ID', value: 'activityId' },
      { text: '校内时间', value: 'iTime' },
      { text: '校外时间', value: 'oTime' },
      { text: '通用时间', value: 'uTime' },
      { text: '是否生效', sortable: false },
      { text: '操作', sortable: false }
    ]
  }),
  watch: {
    info: {
      deep: true,
      immediate: true,
      handler () {
        this.avatarUrl = gravatar.url(this.info.email, { s: '256', d: 'mp' })
      }
    }
  }
}
</script>
