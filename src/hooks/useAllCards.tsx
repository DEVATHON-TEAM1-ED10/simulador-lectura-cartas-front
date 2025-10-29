import { useEffect, useState } from 'react';
import type { TarotCardAPI } from '../types/carts-types';
import { api } from '../api/axios';

type ErrorType = Error | null;

const useAllCards = () => {
  const [dataCards, setDataCards] = useState<TarotCardAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);

  useEffect(() => {
    const controller = new AbortController();

    const getDataAllCarts = async () => {
      try {
        const response = await api.get('/cards', { signal: controller.signal });
        //console.log(response);

        setDataCards(response.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
      return () => {
        controller.abort();
      };
    };

    getDataAllCarts();
  }, []);

  return { dataCards, loading, error };
};
export default useAllCards;
