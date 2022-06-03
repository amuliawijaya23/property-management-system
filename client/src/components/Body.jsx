import Listing from "./Listing";

import useVisualMode from "../hooks/useVisualMode";
import { LISTINGS, HIDDEN } from "../helper/modes";

export default function Body(props) {
  const {mode, transition} = useVisualMode(LISTINGS)

  const listings = props.properties?.map((listing, i) => (
    <Listing
      key={`listing-${i}`}
      id={`listing-${i}`}
      {...listing}
    />
  ))

  return (
    <section className="App__body">
      {mode === LISTINGS && <div className="listings">{listings}</div>}
    </section>
  );
};