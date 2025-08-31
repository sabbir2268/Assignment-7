import React from "react";

const Banner = () => {
  return (
    <>
      <div
        className="w-full h-[730px] bg-cover bg-center text-white px-20 py-[20%] flex flex-col gap-5"
        style={{
          backgroundImage: "url('./src/assets/Banner-min.jpg')",
        }}
      >
        <h1 className="text-4xl font-bold">
          Bid on Unique Items from <br /> Around the World
        </h1>
        <p className="opacity-80">
          Discover rare collectibles, luxury goods, and vintage <br /> treasures
          in our curated auctions
        </p>
        <div>
          <button className="btn">Explore Auction</button>
        </div>
      </div>
    </>
  );
};

export default Banner;
