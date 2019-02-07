<template>
  <v-container fluid grid-list-md>
    <v-layout wrap>
      <v-flex sm8 xs12>
        <v-card>
          <!-- <v-card-title class="headline" primary-title>系统状态</v-card-title> -->
          <v-card-text>
            <v-img :src="require('../assets/topbanner.jpg')"/>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex sm4 xs12>
        <v-card>
          <v-card-title class="headline" primary-title>友情链接</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-tile v-for="(link, i) in links" :key="i" :href="link.href" target="_blank" rel="noopener">{{ link.name }}</v-list-tile>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'home',
  data: () => ({
    links: [
      { href: 'https://github.com/ZhangZisu/zvms', name: '开源项目' }
    ]
  })
}
</script>
