import React from "react";
import { Metadata } from "next";
import Image from "next/image";

const getPokemonDetail = async (name: string) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await res.json();
  return data;
};

const getEvolutionData = async (id: string) => {
  const res = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}`);
  const data = await res.json();
  return data;
};

export async function generateMetadata({
  params: { name },
}: {
  params: { name: string };
}): Promise<Metadata> {
  const pokemonDetail = await getPokemonDetail(name);
  return {
    title: name,
    description: `${name}의 상세 정보를 보러오세요`,
    openGraph: {
      title: name,
      description: `${name}의 상세 정보`,
      url: pokemonDetail?.sprites?.front_default,
      type: "website",
    },
  };
}

//https://pokeapi.co/api/v2/pokemon/venusaur
const page = async ({ params: { name } }: { params: { name: string } }) => {
  console.log(name);

  const pokemonDetail = await getPokemonDetail(name);
  const evolutionData = await getEvolutionData(pokemonDetail.id);
  // console.log("evolutionData :>> ", evolutionData);
  console.log("name :>> ", name);
  console.log("pokemonDetail.id :>> ", pokemonDetail?.id);
  console.log(
    "evolutionData.chain.evolves_to[0].species.name :>> ",
    evolutionData?.chain.evolves_to[0]?.species.name
  );
  console.log("pokemonDetail :>> ", pokemonDetail);
  return (
    <div>
      <Image
        width={500}
        height={500}
        alt={name + "image"}
        src={pokemonDetail?.sprites?.front_default}
      />
      <h1>{pokemonDetail?.name}</h1>
      <p>{`pokemon id: ${pokemonDetail?.id}`}</p>
      <p>{`height: ${pokemonDetail?.height}`}</p>
      <p>{`weight: ${pokemonDetail?.weight}`}</p>
      <p>{`type: ${pokemonDetail?.types[0]?.type.name}`}</p>
      {evolutionData?.chain.evolves_to?.map((data: any) => (
        <p>{data?.species?.name}</p>
      ))}
    </div>
  );
};

export default page;
