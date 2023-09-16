import { FixedSizeList } from "react-window";

import classes from "./App.module.css";
import { CSSProperties, useState } from "react";
import InfiniteLoader from "react-window-infinite-loader";
import Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);
function App() {
  const [items, setItem] = useState(
    Array(14)
      .fill(null)
      .map((_, i) => ({
        date: moment().subtract(i, "day"),
      }))
  );

  const isItemLoaded = (index: number) => !!items[index];

  const loadMoreItems = () => {
    const newDates = Array(7)
      .fill(null)
      .map((_, i) => ({
        date: moment(items[items.length - 1].date).subtract(i + 1, "day"),
      }));
    setItem((prev) => [...prev, ...newDates]);
  };

  return (
    <div>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={items.length + 1}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <FixedSizeList
            className={classes["no-scrollbars"]}
            itemSize={100}
            itemCount={items.length + 1}
            height={80}
            itemData={items}
            onItemsRendered={onItemsRendered}
            width={window.innerWidth}
            layout="horizontal"
            direction="rtl"
            ref={ref}
          >
            {({
              index,
              style,
              data,
            }: {
              index: number;
              style: CSSProperties;
              data: { date: Moment.Moment }[];
            }) => (
              <div style={style} className={classes.item}>
                {data[index].date.format("DD/MM")}
              </div>
            )}
          </FixedSizeList>
        )}
      </InfiniteLoader>
    </div>
  );
}

export default App;
