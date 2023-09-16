import { FixedSizeList } from "react-window";

import classes from "./App.module.css";
import { CSSProperties, useEffect, useState } from "react";
import InfiniteLoader from "react-window-infinite-loader";
import Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);
function App() {
  const [items, setItem] = useState(Array(10).fill("load"));

  useEffect(() => {
    const formDate = moment();
    const toDate = formDate.subtract(14, "days");

    const range = moment().range(toDate, formDate);
    console.log(Array.from(range.by("day")));
  }, []);

  const isItemLoaded = (index: number) => !!items[index];

  const loadMoreItems = () => {
    setItem((prev) => [...prev, ...Array(10).fill("new load")]);
  };
  return (
    <div>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={30}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <FixedSizeList
            className={classes["no-scrollbars"]}
            itemSize={100}
            itemCount={30}
            height={80}
            onItemsRendered={onItemsRendered}
            width={window.innerWidth}
            layout="horizontal"
            direction="rtl"
            ref={ref}
          >
            {({ index, style }: { index: number; style: CSSProperties }) => (
              <div style={style}>{items[index]}</div>
            )}
          </FixedSizeList>
        )}
      </InfiniteLoader>
    </div>
  );
}

export default App;
