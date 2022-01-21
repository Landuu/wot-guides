import { useState, useEffect } from "react";
import TankTile from "./TankTile";

const getRandomNums = (max, count) => {
    let nums = [];
    for (let i = 0; i < count; i++) {
        const random = Math.random() * (max - 0) + 0;
        nums.push(Math.floor(random));
    }
    return nums;
} 

const TierWrapper = ({ tierName, tanks }) => {
  const id = `tier-${tierName}`;
  const [display, setDisplay] = useState(null);

  useEffect(() => {
    if(!tanks) return;

    const nums = getRandomNums(tanks.length, 3);
    let temp = [];
    nums.forEach(num => temp.push(tanks[num]));
    console.log(id, temp, nums);
    setDisplay(temp);
  }, [tanks, id])

  

  return (
    <div id={id} className="p-5">
      <p className="text-xl text-left">{id.toUpperCase()}</p>
      <hr />
      <div className="grid grid-cols-4 gap-3 py-4 px-1">
        {
            display &&
            display.map(tank => (
                <TankTile key={Math.random()} name={tank.short_name} imgSrc={tank.images.big_icon} />
            ))
        }
      </div>
    </div>
  );
};

export default TierWrapper;
