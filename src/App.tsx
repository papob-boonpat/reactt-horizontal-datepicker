import { FixedSizeList, ListOnScrollProps } from "react-window";

import classes from "./App.module.css";
import { CSSProperties, useEffect, useRef, useState } from "react";
import InfiniteLoader from "react-window-infinite-loader";
import Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);
function App() {
  const loader = useRef<FixedSizeList<{ date: Moment.Moment }[]> | null>(null);
  const debounce = useRef<number>();
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

  const onScroll = (prop: ListOnScrollProps) => {
    clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      loader.current?.scrollToItem(
        Math.round(prop.scrollOffset / 100),
        "start"
      );
    }, 50);
  };

  useEffect(() => {}, []);

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
            onScroll={onScroll}
            direction="rtl"
            ref={(list) => {
              ref(list);
              loader.current = list;
            }}
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
