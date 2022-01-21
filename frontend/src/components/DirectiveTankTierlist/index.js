import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import TierWrapper from "../../components/DirectiveTankTierlist/TierWrapper";

const url =
  "https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=b9d068409f8fc9b5f173a9ea17c5cc9e&tier=1&fields=tank_id%2C+short_name%2C+name%2C+images";

const DirectiveTankTierlist = () => {
  const { data } = useFetch(url);
  const [tanks, setTanks] = useState(null);

  useEffect(() => {
    if(!data) return;

    let temp = data.data;
    let parsedData = Object.keys(temp).map(key => temp[key]);
    setTanks(parsedData);
  }, [data])

  return (
    <div
      id="directive-tank-tierlist"
      className="grid gap-4 grid-cols-1 text-center text-white"
    >
      <TierWrapper tierName="s" tanks={tanks} />
      <TierWrapper tierName="1" tanks={tanks} />
      <TierWrapper tierName="2" tanks={tanks} />
    </div>
  );
};

export default DirectiveTankTierlist;
