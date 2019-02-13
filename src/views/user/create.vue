<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-tabs v-model="tab" grow centered>
            <v-tab :key="0">简单</v-tab>
            <v-tab :key="1">高级</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item :key="0">
              <v-form>
                <v-card-text>
                  <v-text-field label="用户名" :rules="rules"/>
                  <v-text-field type="email" label="邮箱" :rules="rules"/>
                  <v-textarea label="描述" placeholder="留空以使用默认值" :rules="rules"/>
                  <v-text-field type="password" label="密码" :rules="rules"/>
                  <v-checkbox label="团支书"/>
                  <v-checkbox label="实践部"/>
                  <v-checkbox label="义管会"/>
                  <v-checkbox label="提供方"/>
                  <v-checkbox label="无效用户"/>
                  <v-text-field type="number" label="用户组ID"/>
                </v-card-text>
                <v-card-actions>
                  <v-spacer/>
                  <v-btn color="primary">创建</v-btn>
                </v-card-actions>
              </v-form>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { Z_NOT_EMPTY } from '../../utils/validation'

export default {
  data: () => ({
    tab: 0,
    form: {
    },
    rules: [Z_NOT_EMPTY()]
  })
}
</script>
