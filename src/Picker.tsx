import React, { CSSProperties, useRef } from "react";
import { FixedSizeList, ListOnScrollProps } from "react-window";

const Picker = () => {
  const scrollView = useRef<FixedSizeList>(null);
  const startIndex = useRef(0);
  const debounce = useRef<number>();
  const items = Array(100)
    .fill(null)
    .map((_, i) => i + 1);
  const onScroll = (prop: ListOnScrollProps) => {
    clearTimeout(debounce.current);
    startIndex.current = Math.round(prop.scrollOffset / 100);
    debounce.current = setTimeout(() => {
      scrollView.current?.scrollToItem(
        Math.round(prop.scrollOffset / 100),
        "start"
      );
    }, 100);
  };

  return (
    <div>
      <FixedSizeList
        itemSize={100}
        itemCount={items.length}
        height={300}
        itemData={items}
        width={300}
        onScroll={onScroll}
        direction="rtl"
        ref={scrollView}
      >
        {({
          index,
          style,
          data,
        }: {
          index: number;
          style: CSSProperties;
          data: number[];
        }) => (
          <div
            style={{
              ...style,
              ...(startIndex.current + 1 === index
                ? {
                    color: "black",
                    fontSize: 18,
                  }
                : {
                    color: "red",
                    fontSize: 14,
                  }),
              border: "1px solid #000",
            }}
          >
            {data[index]}
          </div>
        )}
      </FixedSizeList>
    </div>
  );
};

export default Picker;
