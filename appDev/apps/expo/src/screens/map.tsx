import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import MapView, { LatLng, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { GOOGLE_MAPS_API_KEY } from '../apiKeys';

export interface GoogleLocationResponse {
	location: Location;
	accuracy: number;
}

export interface Location {
	lat: number;
	lng: number;
}

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_REGION = {
	latitude: 38.9007,
	longitude: 77.0518,
	latitudeDelta: LATITUDE_DELTA,
	longitudeDelta: LONGITUDE_DELTA,
};

export const Map = (navigation: { navigation: any }) => {
	const mapRef = useRef<MapView>(null);

	const [region, setRegion] = useState<Region>(INITIAL_REGION);

	const [duration, setDuration] = useState<string>('');
	const [distance, setDistance] = useState<string>('');

	// const fetchLocation = async (): Promise<GoogleLocationResponse> =>
	// 	(
	// 		await fetch(
	// 			`https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_MAPS_API_KEY}`
	// 		)
	// 	).json()

	// const location = useQuery({
	// 	queryKey: ['userLocation'],
	// 	queryFn: fetchLocation,
	// })

	// const origin: LatLng = {
	// 	latitude: location.data?.location.lat ?? 37.79879,
	// 	longitude: location.data?.location.lng ?? -122.442753,
	// }

	const origin: LatLng = {
		latitude: 37.79879,
		longitude: -122.442753,
	};

	const dest: LatLng = { latitude: 37.790651, longitude: -122.422497 };

	return (
		<SafeAreaView className='flex items-center justify-center'>
			<MapView
				ref={mapRef}
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				initialRegion={region}
				// region={region}
				onRegionChange={r => setRegion(r)}
				// region={INITIAL_REGION}
				// onRegionChangeComplete={() => {
				// 	mapRef.current?.animateToRegion(INITIAL_REGION)
				// }}
				showsUserLocation
				onUserLocationChange={e => {
					setRegion({
						latitude: e.nativeEvent.coordinate?.latitude!,
						longitude: e.nativeEvent.coordinate?.longitude!,
						latitudeDelta: 0.01,
						longitudeDelta: 0.01,
					});
					mapRef.current?.animateToRegion(region);
				}}
			>
				<MapViewDirections
					origin={origin}
					destination={dest}
					apikey={GOOGLE_MAPS_API_KEY}
					strokeWidth={3}
					strokeColor='hotpink'
					onReady={res => {
						setDuration(res.duration.toFixed(0));
						setDistance(res.distance.toFixed(1));
						mapRef.current?.fitToCoordinates(res.coordinates, {
							edgePadding: {
								top: height / 20,
								right: width / 20,
								bottom: height / 20,
								left: width / 20,
							},
						});
					}}
				></MapViewDirections>
			</MapView>
			{duration && (
				<Text className='absolute top-0 right-0 m-2 font-bold'>
					{duration} minutes
				</Text>
			)}
			{distance && (
				<Text className='absolute top-4 right-0 m-2 font-bold'>
					{distance} km
				</Text>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	map: {
		// flex: 1,
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
	},
});
