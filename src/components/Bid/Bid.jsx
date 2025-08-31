import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
// import { useState } from "react";

const Bid = ({ auctionData, handleBidNow, favorites, hanldelAddBidAmount }) => {
  const { id, currentBidPrice, image, timeLeft, title } = auctionData;

  // const [liked, setLiked] = useState(false);
  // const handleClick = () => {
  //   setLiked(true); // fill heart on click
  //   handleBidNow(auctionData); // still call your parent function
  // };

  const liked = favorites.some((fav) => fav.id === id);

  return (
    <tr className="text-center">
      <td className="text-start">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={image} />
            </div>
          </div>
          <div>
            <div className="font-bold">{title}</div>
          </div>
        </div>
      </td>
      <td>{currentBidPrice}</td>
      <td>{timeLeft}</td>
      <td className="text-center">
        <button
          disabled={liked}
          onClick={() => {
            handleBidNow(auctionData);
            hanldelAddBidAmount(currentBidPrice);
          }}
          className={`${
            liked ? "opacity-80 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {liked ? <FaHeart size={30} color="red" /> : <CiHeart size={30} />}
        </button>
      </td>
    </tr>
  );
};

export default Bid;
