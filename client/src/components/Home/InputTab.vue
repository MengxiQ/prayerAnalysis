<template>
  <div class="">
    <div class="top"><Button type="primary" plain hairline size="mini" @click="clear">清空</Button></div>
    <van-field
        v-model="path"
        rows="6"
        type="textarea"
        placeholder="粘贴抽卡记录链接到这里 ~"
    />
    <div class="toolbar">
      <Button @click="analysis" color="linear-gradient(to right, #ff6034, #ee0a24)" size="small">
        开始分析
      </Button>
    </div>
    <div style="margin-top: 20px"><slot/></div>
  </div>
</template>

<script setup>
import { Loading, Button, Toast  } from 'vant';
import {ref} from "vue";
const emits = defineEmits(['message'])

const path = ref('')

const clear = () => {
  path.value = ''
}

import axios from 'axios'

const getData = async (path) => {


  // 活动角色
  const activeRole = (await axios.post('/home',{path, gacha_type: 301})).data
  // 活动武器
  const activeWeapons = (await axios.post('/home',{path, gacha_type: 302})).data
  // 新手
  const greenhorn = (await axios.post('/home',{path, gacha_type: 100})).data
  // 常驻
  const resident = (await axios.post('/home',{path, gacha_type: 200})).data
  return {
    activeRole,
    activeWeapons,
    greenhorn,
    resident
  }
}

const analysis = async () => {
  const toast = Toast.loading({
    duration: 0,
    message: '算力君分析中...',
    forbidClick: true,
  });
  try {
    const data = await getData(path.value)
    emits('message', data)
    toast.clear();
  }catch (e) {
    toast.clear();
    Toast.fail('链接已失效，请从应用获取新的连接.')
  }


}
</script>

<style scoped>
.top{
  text-align: left;
  margin-bottom: 7px;
}
.toolbar{
  margin-top: 7px;
  text-align: right;
}
</style>
