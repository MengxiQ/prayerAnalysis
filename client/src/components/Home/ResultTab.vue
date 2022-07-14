<template>
  <div class="" v-if="result">
    <div class="card">
      <div class="cart-title">
        <van-icon name="/icon/星星.svg" size="30" />{{title}}</div>
      <div>
        <div class="labels">
          <Tag type="primary" size="large">累计抽卡：{{ result.total }}</Tag>
          <Tag type="primary" size="large" v-if="result.hitList">五星：{{ result.hitList.length }}</Tag>
          <Tag type="primary" size="large">已垫：{{ result.bedding }}</Tag>
        </div>
        <div class="labels">
          <Tag type="primary" size="large" v-if="result.hitList">平均每金：{{ parseInt((result.total - result.bedding) / result.hitList.length) }}</Tag>
        </div>
      </div>
      <div class="stage">
        <van-row>
          <van-col v-for="(ele, index) in result.hitList" :key="index" span="8" class="col">
            <van-badge position="top-left" >
              <div class="role" >
                <VanImage width="80"
                          height="80"
                          fit="contain"
                          :src="`/images/Illustration/${ele.name}.png`"
                ></VanImage>
                <div class="name">
                  <span>{{ ele.name }}</span>
                </div>
              </div>
              <template #content>
                <div>{{ele.cost}}</div>
              </template>
            </van-badge>
          </van-col>
        </van-row>
      </div>
      <Divider/>
    </div>
  </div>
</template>

<script setup>

import {Tag} from 'vant'
import { Badge } from 'vant';
import { Col, Row, Divider } from 'vant';
import {Image as VanImage} from 'vant';
const props = defineProps({
  result: Object,
  title: String,
})
// const emits = defineEmits(['back'])
</script>

<style lang="scss" scoped>
.card {
  background: #fbfbfb;
  padding: 0 4px;
  .cart-title{
    display: flex;
    align-items: center;
    padding: 10px 0px;
  }
  .labels {
    & > * {
      margin-bottom: 6px;
      margin-right: 10px;
    }
  }
  .stage{
    margin-top: 20px;
  }
}
.col{
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  .role{
    //background: rgba(246, 240, 8, 0.71);
    background: gold;
    padding: 2px;
    box-sizing: border-box;
    box-shadow: 0px 0px 4px 0px rgba(252, 245, 7, 1);
    .name{
      font-size: smaller;
      text-align: center
    }
  }


}

</style>
