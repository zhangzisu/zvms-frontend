<template>
  <v-card flat class="transparent">
    <v-container fluid grid-list-md>
      <v-layout row>
        <v-flex xs3>
          <v-card class="fill-height">
            <v-card-text>
              <v-avatar tile size="100%">
                <img :src="avatarUrl">
              </v-avatar>
            </v-card-text>
            <v-card-text>
              <v-chip v-if="info.isAdministrator">管理员</v-chip>
              <v-chip v-if="info.isManager">学生部</v-chip>
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
            <v-card-text>{{ info.description }}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row v-if="showHistory !== undefined">
        <v-flex xs12>
          <v-card>
            <v-card-title class="headline">义工历史</v-card-title>
            <v-card-text>未实现</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import gravatar from 'gravatar'

export default {
  name: 'userinfo',
  props: ['info', 'showHistory'],
  data: () => ({
    avatarUrl: undefined
  }),
  watch: {
    info: {
      deep: true,
      immediate: true,
      handler () {
        this.avatarUrl = gravatar.url(this.info.email, { s: '256' })
      }
    }
  }
}
</script>
