import React, {useCallback} from 'react';
import {
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';
import {CastleSvg} from './castle-svg';
import { Text } from '@/components/text';

type TreeMarkerProps = {
  position: google.maps.LatLngLiteral;
  featureId: string;
  onMarkerClick?: (
    marker: google.maps.marker.AdvancedMarkerElement,
    featureId: string
  ) => void;
  name?: string
};

export const FeatureMarker = ({
  position,
  featureId,
  onMarkerClick,
  name
}: TreeMarkerProps) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const handleClick = useCallback(
    () => onMarkerClick && onMarkerClick(marker!, featureId),
    [onMarkerClick, marker, featureId]
  );

  return ( 
      <AdvancedMarker
      ref={markerRef}
      position={position}
      onClick={handleClick}
      anchorPoint={AdvancedMarkerAnchorPoint.CENTER} 
      className='flex flex-col justify-center items-center'
     >
      <CastleSvg />
      <Text className=' mt-2 text-xs' font='new'>{name}</Text> 
    </AdvancedMarker> 
       
  );
};