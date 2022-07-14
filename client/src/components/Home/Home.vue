<template>
  <div class="container">
    <InputTab v-show="activeTab === 'input'" @message="onMessage">
      <van-cell v-if="results" title="历史记录" icon="underway-o" @click="history" is-link/>
    </InputTab>
    <div v-if="results" v-show="activeTab === 'result'" >
      <div class="bar">
        <van-icon name="arrow-left" @click="goBack" />
      </div>
      <ResultTab :result="results.activeRole" title="活动角色祈愿"></ResultTab>
      <ResultTab :result="results.activeWeapons" title="活动武器祈愿"></ResultTab>
      <ResultTab :result="results.resident" title="常驻祈愿"></ResultTab>
      <ResultTab :result="results.greenhorn" title="新手祈愿"></ResultTab>
    </div>

  </div>
</template>

<script setup>
import InputTab from './InputTab.vue'
import ResultTab from './ResultTab.vue'
import {reactive, ref, toRefs} from "vue";
const activeTab = ref('input')
const results = ref(null)
const onMessage = (data) => {
  results.value = data
  activeTab.value = 'result'
}

const goBack = () => {
  activeTab.value = 'input'
}
const history = () => {
  activeTab.value = 'result'
}
</script>

<style scoped>
.container {
  background: aliceblue;
  height: calc(100vh - 20px);
  width: calc(100vw - 20px);
  padding: 10px;
  overflow-x: hidden;
}
.bar{
  padding: 10px;
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.44);
  color: white;
  border-radius: 5px;
}
</style>
