<template>
  <v-card flat>
    <v-container fluid grid-list-md>
      <v-layout row>
        <v-flex xs3>
          <v-card>
            <v-card-text>
              <v-avatar tile size="100%">
                <img :src="avatarUrl"/>
              </v-avatar>
            </v-card-text>
            <v-card-text>
              <v-chip v-if="profile.isAdministrator">管理员</v-chip>
              <v-chip v-if="profile.isManager">学生部</v-chip>
              <v-chip v-if="profile.isSecretary">团支书</v-chip>
              <v-chip v-if="profile.isProvider">义工提供方</v-chip>
              <v-chip v-if="profile.isRemoved">无效用户</v-chip>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs9>
          <v-card>
            <v-card-title class="headline">
              {{ profile.name }}
            </v-card-title>
            <v-card-text>
              <v-list dense>
                <v-list-tile>
                  <v-list-tile-content>用户ID</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ profile.id }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>邮箱</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ profile.email }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>校内义工总时长</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ profile.iTime }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>校外义工总时长</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ profile.oTime }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>普适义工总时长</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ profile.uTime }}</v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card-text>
            <v-card-text>
              {{ profile.description }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row v-if="showHistory !== undefined">
        <v-flex xs12>
          <v-card>
            <v-card-title class="headline">义工历史</v-card-title>
            <v-card-text>
              未实现
            </v-card-text>
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
  props: ['profile', 'showHistory'],
  data: () => ({
    avatarUrl: undefined
  }),
  created () {
    this.avatarUrl = gravatar.url(this.profile.email, { s: '256' })
  }
}
</script>
