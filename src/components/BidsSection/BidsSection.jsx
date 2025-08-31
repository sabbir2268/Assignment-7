import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { ImCross } from "react-icons/im";
import Bid from "../Bid/Bid";

const BidsSection = () => {
  // fetching data for showing in left side bar
  const [auctionData, setAuctionData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [bidAmount, setBidAmount] = useState(0);

  useEffect(() => {
    fetch("/public/auctionData.json")
      .then((res) => res.json())
      .then((data) => setAuctionData(data));
  }, []);

  const handleBidNow = (auctionData) => {
    setFavorites((favorites) => {
      if (favorites.find((item) => item.id === auctionData.id))
        return favorites;
      return [...favorites, auctionData];
    });
  };

  // remove one favorite item
  const handleRemoveFavorite = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  const hanldelAddBidAmount = (amount) => {
    const newAmount = bidAmount + amount;
    setBidAmount(newAmount);
  };

  const handleRemoveBidAmount = (amount) => {
    const newAmount = bidAmount - amount;
    setBidAmount(newAmount);
  };

  return (
    <div className="p-10 bg-gray-300 flex flex-col gap-5">
      <div className="flex flex-col gap-0">
        <h1 className="text-2xl">Active Auctions</h1>
        <p className="opacity-80 text-sm">
          Discover and bid on extraordinary items
        </p>
      </div>

      <div className="flex gap-5 justify-start">
        {/* left sidebar */}
        <div className="w-[60%]">
          <div className="overflow-x-auto bg-white rounded-lg">
            <table className="table">
              <thead>
                <tr>
                  <th>Items</th>
                  <th>Current Bid</th>
                  <th>Time left</th>
                  <th>Bid now</th>
                </tr>
              </thead>
              <tbody>
                {auctionData.map((item) => (
                  <Bid
                    key={item.id}
                    auctionData={item}
                    handleBidNow={handleBidNow}
                    favorites={favorites}
                    hanldelAddBidAmount={hanldelAddBidAmount}
                  ></Bid>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* right sidebar */}
        <div className="w-[40%]">
          <div className="overflow-x-auto bg-white rounded-lg">
            <table className="table">
              <thead>
                <tr className="text-center text-black">
                  <th colSpan={2} className="font-extrabold text-xl">
                    <div className="flex items-center justify-center">
                      <CiHeart />
                      Favourite Items
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* this tr will be hiden and show dynamic content */}
                {favorites.length === 0 ? (
                  <tr>
                    <th colSpan={2}>
                      <p className="font-extrabold text-center pb-2">
                        No Favorites Yet
                      </p>
                      <p className="opacity-60 text-xs text-center">
                        Click the heart icon on any item to add it
                      </p>
                    </th>
                  </tr>
                ) : (
                  favorites.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="flex items-center gap-2">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-10 h-10 rounded"
                          />
                          <div className="flex flex-col">
                            <p>{item.title}</p>
                            <div className="flex gap-3">
                              <p>{item.currentBidPrice}</p>
                              <p>Bid:{item.bidsCount}</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => {
                            handleRemoveFavorite(item.id);
                            handleRemoveBidAmount(item.currentBidPrice);
                          }}
                          className="cursor-pointer"
                        >
                          <ImCross />
                        </button>
                      </td>
                    </tr>
                  ))
                )}

                <tr>
                  <th>Total Bids Amount</th>
                  <th>${bidAmount}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidsSection;
