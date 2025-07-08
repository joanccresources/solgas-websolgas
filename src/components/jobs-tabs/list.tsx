import React, { useState, useEffect, useCallback, useRef } from "react";
import { Virtuoso } from "react-virtuoso";
import {
  Card,
  Text,
  LocationIcon,
  ClockIcon,
  PhoneOutlineIcon,
} from "@/components";
import tailwindConfig from "@root/tailwind.config";
import { useAtom, useSetAtom } from "jotai";
import { getDataMap } from "@/app/(general)/productos-y-servicios/glp-vehicular/(index)/actions";
import { updateStationServiceAtom, stationServiceAtom } from "@/store";

const primaryBlue = tailwindConfig.theme.extend.colors["primary-blue"];
const inactive = tailwindConfig.theme.extend.colors["select"];

const Item = ({ index }: { index: number }) => {
  const [items] = useAtom(stationServiceAtom);
  const [isHovered, setIsHovered] = useState(false);
  const color = isHovered ? primaryBlue : inactive;
  const setData = useSetAtom(updateStationServiceAtom);

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  const item = items?.data ? items.data[index] : null;
  const handleItemClick = () => {
    setData({
      center: { lat: Number(item?.latitude), lng: Number(item?.longitude) },
    });
  };

  return (
    <div
      className="px-4 lg:w-full w-[316px]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleItemClick}
    >
      <Card
        className="lg:w-full w-[316px] h-[283px] hover:border-primary-orange cursor-pointer shadow-[0px_20px_59px_rgba(0,0,0,0.07)] mt-4"
        color="gray"
      >
        <div>
          <Text className="text-primary-blue lg:text-[27px] text-base truncate" type="h5" font="new" >
            {item?.name}
          </Text>
        </div>
        <div className="flex-col lg:mt-8 mt-2 space-y-4">
          <div className="flex gap-x-4 items-center">
           <div>
             <LocationIcon color={color} />
           </div>
            <Text className="text-primary-blue lg:text-[17px] text-xs whitespace-normal" type="p" line="3">
              {item?.address}
            </Text>
          </div>
          <div className="flex gap-x-4 items-center">
              <div>
              <ClockIcon color={color} /> 
              </div>
              <Text
                className="text-primary-blue lg:text-[17px] text-xs  truncate whitespace-normal" line="3"
                type="p" 
              >
                {item?.schedule}
              </Text> 
          </div>
          {item?.phone ?
          <div className="flex gap-x-4 items-center">
            <PhoneOutlineIcon color={color} />
            <Text className="text-primary-blue lg:text-[17px] text-xs" type="h6">
              {item?.phone || "-----"}
            </Text>
          </div>
          : null}
        </div>
      </Card>
    </div>
  );
};

const VirtualizedList = ({horizontal}: {horizontal: boolean}) => {
  const [items] = useAtom(stationServiceAtom); 
  const page = useRef(0);
  const [, setLastPage] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const setData = useSetAtom(updateStationServiceAtom);
  const itemsRef = useRef(items.data || []);
  const tabRef = useRef(items.id || 0);
  const subTabRef = useRef(items.subItem || null);

  useEffect(() => {
    itemsRef.current = items.data || [];
  }, [items.data]);

  useEffect(() => {
    tabRef.current = items.id ?? 0;
    console.log(tabRef.current, "tabRef.current");
    if (tabRef.current === 0 || tabRef.current === 1) {
      loadMoreItems();
      page.current = 0;
      itemsRef.current = [];
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.id]);

  useEffect(() => {
    subTabRef.current = items.subItem ?? null;
    if (subTabRef.current) {
      loadMoreItems();
      page.current = 0;
      itemsRef.current = [];
    }
  }, [items.subItem]);

  const loadMoreItems = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    page.current = page.current + 1;
    let typeMap;
    if (subTabRef.current !== null && subTabRef.current > 0) {
      typeMap = subTabRef.current;
    } else {
      typeMap = tabRef.current === 0 ? "1" : "2,3";
    }
    const { data, meta } = await getDataMap({
      type_map: String(typeMap),
      page: page.current,
    });
    setLastPage(meta.last_page);
    setData({ data: [...itemsRef.current, ...data] });
    setLoading(false);
  }, [loading, setData]);

  useEffect(() => {
    if (page.current === 0) loadMoreItems();
  }, [loadMoreItems]);

  const handleEndReached = useCallback(() => {
    if (page.current > 0) {
      loadMoreItems();
    }
  }, [page, loadMoreItems]);

  return (
    <Virtuoso
      horizontalDirection={horizontal}
      style={{ height: horizontal ? 250 : '100%' }}
      className="lg:mt-0 mt-4"
      totalCount={items.data?.length}
      itemContent={(index) => <Item index={index} />}
      endReached={handleEndReached}
      initialTopMostItemIndex={0}
      overscan={200}
    />
  );
};

export default VirtualizedList;
