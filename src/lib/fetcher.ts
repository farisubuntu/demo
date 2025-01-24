import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export { fetcher };
