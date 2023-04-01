<script setup lang="ts">
import { ref } from 'vue';
import { useQueryClient, useQuery } from '@tanstack/vue-query';
import { getCoffee } from './api';
// import Button from './components/button/index.vue';
import Card from './components/card/card-component.vue';

// type Coffee = {
//   id: number;
//   blend_name: string;
//   intensifier: string;
//   notes: string;
//   origin: string;
//   variety: number;
//   uid: string;
// };

const queryClient = useQueryClient();

const coffeeList = ref<Array<any>>([]);
const refetchInterval = ref(30000);

const { isLoading, isFetching } = useQuery({
  queryKey: ['coffee'],
  queryFn: getCoffee,
  refetchInterval: refetchInterval.value,
  refetchOnWindowFocus: false,
  onSuccess: (data) => {
    coffeeList.value.push(data);
    refetchInterval.value = 30000;
  },
});

const loadCoffee = () => {
  queryClient.invalidateQueries({ queryKey: ['coffee'] });
};
</script>

<template>
  <section class="coffee-shop">
    <ul class="coffee-list">
      <li v-for="item in coffeeList" :key="item.id" class="coffee-list__item">
        <Card :item="item" />
      </li>
    </ul>
  </section>
  <button :disabled="isLoading || isFetching" @click="loadCoffee">
    Click me
  </button>
</template>

<style scoped lang="scss">
.coffee-shop {
  padding: 10px;
}
.coffee-list {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
}

.coffee-list__item {
  margin: 0 10px 10px 0;
}
</style>
