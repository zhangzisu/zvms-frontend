<template>
  <v-card flat>
    <v-container fluid grid-list-md>
      <v-layout row>
        <v-flex xs12>
          <v-card>
            <v-card-title class="headline">{{ info.name }}</v-card-title>
            <v-card-text>
              <v-container fluid grid-list-md>
                <v-layout>
                  <v-flex xs3>
                    <div class="text-xs-center">
                      <span class="display-3 font-weight-light">{{ count }}</span>
                      <span class="headline">人</span>
                    </div>
                    <div class="font-weight-regular text-xs-center">总人数</div>
                  </v-flex>
                  <v-flex xs3>
                    <div class="text-xs-center">
                      <span class="display-3 font-weight-light">{{ validCount }}</span>
                      <span class="headline">人</span>
                    </div>
                    <div class="font-weight-regular text-xs-center">达标人数</div>
                  </v-flex>
                  <v-flex xs3>
                    <div class="text-xs-center">
                      <span class="display-3 font-weight-light">{{ Math.round(validCount / count * 100) }}</span>
                      <span class="headline">%</span>
                    </div>
                    <div class="font-weight-regular text-xs-center">达标率</div>
                  </v-flex>
                  <v-flex xs3>
                    <div class="text-xs-center">
                      <span class="display-3 font-weight-light">{{ info.chances.length }}</span>
                      <span class="headline">次</span>
                    </div>
                    <div class="font-weight-regular text-xs-center">总参与义工</div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <v-card>
            <v-card-title class="headline">义工活动</v-card-title>
            <v-data-table expand :headers="chanceHeaders" :items="info.chances" :loading="$store.state.loading">
              <template slot="items" slot-scope="props">
                <tr @click="props.expanded = !props.expanded">
                  <td>{{ props.item.id }}</td>
                  <td>{{ props.item.quota }}</td>
                  <td>{{ props.item.activityId }}</td>
                  <td>
                    <v-btn icon :to="`/activities/show/${props.item.id}`">
                      <v-icon small>open_in_new</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-card>
            <v-card-title class="headline">成员</v-card-title>
            <v-data-table expand :headers="userHeaders" :items="info.users" :loading="$store.state.loading">
              <template slot="items" slot-scope="props">
                <tr @click="props.expanded = !props.expanded">
                  <td>{{ props.item.id }}</td>
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.iTime }}</td>
                  <td>{{ props.item.oTime }}</td>
                  <td>{{ props.item.uTime }}</td>
                  <td>{{ Math.min(props.item.iTime, 20) + Math.min(props.item.oTime, 20) + props.item.uTime >= 40 }}</td>
                </tr>
              </template>
              <template slot="expand" slot-scope="{ item }">
                <userinfo :info="item"/>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import userinfo from './userinfo.vue'

export default {
  name: 'groupinfo',
  props: ['info'],
  components: {
    userinfo
  },
  computed: {
    count () {
      return this.info.users.length
    },
    validCount () {
      return this.info.users.filter(x => (Math.min(20, x.iTime) + Math.min(20, x.oTime) + x.uTime) >= 40).length
    }
  },
  data: () => ({
    userHeaders: [
      { text: 'UID', value: 'id' },
      { text: '用户名', value: 'name' },
      { text: '校内时间', value: 'iTime' },
      { text: '校外时间', value: 'oTime' },
      { text: '通用时间', value: 'uTime' },
      { text: '达标', sortable: false }
    ],
    chanceHeaders: [
      { text: '报名许可编号', value: 'id' },
      { text: '剩余人数', value: 'quota' },
      { text: '活动', value: 'activityId' },
      { text: '操作', sortable: false }
    ]
  })
}
</script>
