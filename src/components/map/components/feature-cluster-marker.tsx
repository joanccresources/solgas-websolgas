import React, {useCallback} from 'react';
import {
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';
import {CastleSvg} from './castle-svg';
import { Text } from '@/components/text';

type TreeClusterMarkerProps = {
  clusterId: number;
  onMarkerClick?: (
    marker: google.maps.marker.AdvancedMarkerElement,
    clusterId: number
  ) => void;
  position: google.maps.LatLngLiteral;
  size: number; 
  name?: string
};

export const FeaturesClusterMarker = ({
  position,
  size, 
  onMarkerClick,
  clusterId,
  name
}: TreeClusterMarkerProps) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const handleClick = useCallback(
    () => onMarkerClick && onMarkerClick(marker!, clusterId),
    [onMarkerClick, marker, clusterId]
  );
  const markerSize = Math.floor(48 + Math.sqrt(size) * 2);
  return (
    <AdvancedMarker
      ref={markerRef}
      position={position}
      zIndex={size}
      onClick={handleClick}
      className='relative'
      style={{width: markerSize, height: markerSize}}
      anchorPoint={AdvancedMarkerAnchorPoint.CENTER}>
      <CastleSvg />
      <Text className='absolute w-40 left-1/2 transform -translate-x-1/2 mt-2 text-xs' font='new'>{name}</Text>
    </AdvancedMarker>
  );
};