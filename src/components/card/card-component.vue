<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { getImage } from '../../api';
import Loader from '../loader/loader-component.vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const { isLoading, data } = useQuery(['image', props.item.id], getImage, {
  refetchOnWindowFocus: false,
});
const notes = props.item.notes.split(',');
</script>

<template>
  <article class="card">
    <Loader v-if="isLoading" />
    <img v-if="data" class="card__image" :src="data.url" alt="Изображениие" />
    <div class="card__container">
      <span class="card__country">{{ item.origin }}</span>
      <h2 class="card__title">{{ item.blend_name }}</h2>
      <span class="card__kind">{{ item.variety }}</span>
      <div class="card__wrapper">
        <ul class="card__notes">
          <li v-for="note in notes" :key="note" class="card__note">
            {{ note }}
          </li>
        </ul>
      </div>
    </div>
    <span class="card__intensifier">{{ item.intensifier }}</span>
  </article>
</template>

<style scoped lang="scss">
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  width: 200px;
  /* min-height: 270px; */
  height: 100%;
  font-family: 'Fira Sans';
  font-style: normal;
}

.card__container {
  padding: 16px;
  min-height: 130px;
  display: flex;
  flex-direction: column;
}

.card__country {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #666666;
}

.card__title {
  margin: auto 0 5px 0;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
}

.card__kind {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #666666;
}

.card__intensifier {
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 5px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 14px;
  color: #262626;
  background: #ced89e;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card__wrapper {
  margin-top: 10px;
}

.card__notes {
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  list-style: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
}

.card__notes::-webkit-scrollbar {
  display: none;
}

.card__note {
  margin-right: 8px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #191919;
  padding: 5px;
  border-radius: 4px;
  white-space: nowrap;

  &:nth-child(3n-2) {
    background: #76ba99;
  }
  &:nth-child(3n-1) {
    background: #adcf9f;
  }
  &:nth-child(3n) {
    background: #ffdcae;
  }
}

.card__image {
  width: 100%;
  height: 100px;
  object-fit: cover;
}
</style>
