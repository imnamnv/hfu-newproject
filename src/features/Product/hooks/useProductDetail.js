import { useEffect, useState } from 'react';
import ProductApi from '../../../api/productApi';

export default function useProductDetail(productId) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const result = await ProductApi.get(productId);
        setProduct(result);
      } catch (error) {
        console.log(error);
      }
    })();

    setLoading(false);
    return () => {
      // cleanup;
    };
  }, [productId]);
  return { product, loading };
}
