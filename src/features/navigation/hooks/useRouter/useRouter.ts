// eslint-disable-next-line no-restricted-imports
import { useRouter as useRouterNext } from "next/router";

export type UseRouterReturnType = ReturnType<typeof useRouter>;

export const useRouter = () => {
  const router = useRouterNext();

  return {
    ...router,
    _UNSAFE_QUERY: router.query,
    // use usePathParams or useSearchParams instead
    query: undefined,
  };
};
