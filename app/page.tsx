"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import useSWRInfinite from "swr/infinite";

interface PokemonList {
  count: string;
  next: string;
  previous: string;
  results: {
    url: string;
    name: string;
  }[];
}

export default function Home() {
  const [hasMore, setHasMore] = useState<boolean>(true);

  const getKey = (pageIndex: number, previousPageData: any) => {
    console.log("pageIndex :>> ", pageIndex);
    console.log("previousPageData :>> ", previousPageData);
    if (previousPageData && !previousPageData?.results?.length) {
      setHasMore(false);
      return null;
    }
    return `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${
      pageIndex * 20
    }`;
  };

  const { data, setSize, size, error } = useSWRInfinite<PokemonList>(
    getKey,
    (url) => fetch(url).then((res) => res.json())
  );

  console.log("data :>> ", data);
  console.log("size :>> ", size);
  console.log("error :>> ", error);
  return (
    <main className="w-[967px] mx-auto flex flex-col">
      <InfiniteScroll
        className="flex flex-wrap px-32 justify-between"
        dataLength={data?.length ?? 20}
        next={() => setSize(size + 1)}
        scrollThreshold={0.5} // 50%
        hasMore={hasMore}
        loader={
          <div className="flex h-[80px] w-full items-center justify-center">
            loading...
          </div>
        }
        endMessage={
          <div className="flex h-[80px] w-full items-center justify-center">
            end
          </div>
        }
      >
        {data?.map((pokemonList) => {
          return pokemonList?.results?.map((pokemon) => {
            const pokemonIndex = pokemon.url.split("/")[6];
            const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;
            return (
              <div
                key={pokemon.name}
                className="flex flex-col items-center justify-center"
              >
                <Link href={`/pokemon/${pokemon.name}`}>
                  <Image
                    src={image}
                    alt={pokemon.name}
                    width={200}
                    height={200}
                    className="rounded-lg"
                  />
                </Link>
                <Link href={`/pokemon/${pokemon.name}`}>
                  <span className="text-xl">{pokemon.name}</span>
                </Link>
              </div>
            );
          });
        })}
      </InfiniteScroll>
    </main>
  );
}
