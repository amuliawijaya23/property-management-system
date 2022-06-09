import Listing from "./Listing";
import Dashboard from "./Dashboard";

import useVisualMode from "../hooks/useVisualMode";
import { LISTINGS, HIDDEN, DASHBOARD } from "../helper/modes";

export default function Body(props) {
  const {mode, transition} = useVisualMode(DASHBOARD)

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
      {mode === DASHBOARD && (
        <Dashboard
          properties={props.properties}
        />
      )}
    </section>
  );
};