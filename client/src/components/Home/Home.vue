<template>
  <div>
    <div class="card">
      <div class="labels">
        <Tag type="primary" size="large">总数卡数：{{ data.total }}</Tag>
        <Tag type="primary" size="large" v-if="data.hitList">五星：{{ data.hitList.length }}</Tag>
        <Tag type="primary" size="large">已垫：{{ data.bedding }}</Tag>
      </div>
      <div class="stage">
        <van-badge v-for="(ele, index) in data.hitList" :key="index" position="top-left" >
          <div class="role" >
            <VanImage width="80"
                      height="80"
            ></VanImage>
            <div>
              <span style="font-size: smaller">{{ ele.name }}</span>
            </div>
          </div>
          <template #content>
            <div>{{ele.cost}}</div>
          </template>
        </van-badge>

      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import {Tag} from 'vant'
import { Badge } from 'vant';
import {Image as VanImage} from 'vant';
import {ref} from "vue";

const data = ref({})
const getData = async () => {
  const res = await axios.get('/be/home')
  data.value = res.data
}
getData()
</script>

<style lang="scss" scoped>
.card {
  .labels {
    & > * {
      margin-right: 10px;
    }
  }
  .stage{
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
}

</style>
