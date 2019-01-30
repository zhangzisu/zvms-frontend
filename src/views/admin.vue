<template>
  <v-container fluid>
    <v-layout fill-height>
      <v-flex xs12>
        <v-card>
          <v-tabs v-model="tab" centered grow>
            <v-tab :key="0">创建义工活动</v-tab>
            <v-tab :key="1">系统管理</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item :key="0">
            </v-tab-item>
            <v-tab-item :key="1">
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
