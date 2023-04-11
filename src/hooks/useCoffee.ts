import { ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { getCoffee } from '@/api';
import { REFETCH_INTERVAL } from '@/constants';
import type { Coffee } from '@/types';

export const useCoffee = () => {
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

  return { coffeeList, isLoading, isFetching };
};
