<script setup lang="ts">
import { ref } from 'vue';
import { useQueryClient, useQuery } from '@tanstack/vue-query';
import { getCoffee } from './api';
import Button from './components/button/load-button.vue';
import Card from './components/card/card-component.vue';
import type { Coffee } from './types';
import { REFETCH_INTERVAL } from './constants';

const queryClient = useQueryClient();
const coffeeList = ref<Array<Coffee>>([]);
const refetchInterval = ref(REFETCH_INTERVAL);

const { isLoading, isFetching } = useQuery({
  queryKey: ['coffee'],
  queryFn: getCoffee,
  refetchInterval: refetchInterval.value,
  refetchOnWindowFocus: false,
  onSuccess: (data) => {
    coffeeList.value.push(data);
    refetchInterval.value = REFETCH_INTERVAL;
  },
});

const loadCoffee = () => {
  queryClient.invalidateQueries({ queryKey: ['coffee'] });
};
</script>

<template>
  <section class="coffee-shop">
    <h1 class="visually-hidden">Coffee shop</h1>
    <ul class="coffee-list">
      <li v-for="item in coffeeList" :key="item.id" class="coffee-list__item">
        <Card :item="item" :is-loading="isFetching" />
      </li>
    </ul>
    <Button :is-loading="isLoading || isFetching" @click="loadCoffee" />
  </section>
</template>

<style scoped lang="scss">
.visually-hidden {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
.coffee-shop {
  padding: 10px;
  text-align: center;
}
.coffee-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  min-height: 274px;
}

.coffee-list__item {
  margin: 0 10px 10px 0;
}
</style>
