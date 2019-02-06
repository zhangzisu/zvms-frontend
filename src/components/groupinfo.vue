<template>
  <v-card flat>
    <v-container fluid grid-list-md>
      <v-layout row>
        <v-flex xs12>
          <v-card>
            <v-card-title class="headline">{{ info.name }}</v-card-title>
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
                  <td>{{ props.item.isPublic }}</td>
                  <td>{{ props.item.activityId }}</td>
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
                  <td class="text-xs-right">{{ props.item.name }}</td>
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
  data: () => ({
    userHeaders: [
      { text: 'UID', value: 'id', align: 'left' },
      { text: '用户名', value: 'name', align: 'right' }
    ],
    chanceHeaders: [
      { text: 'CID', value: 'id' },
      { text: '剩余人数', value: 'quota' },
      { text: '公开', value: 'isPublic' },
      { text: '活动', value: 'activityId' }
    ]
  })
}
</script>
