import { View, Text, StyleSheet, Dimensions, Button } from 'react-native'
import MapView, { Polyline } from 'react-native-maps'
import { FloatingAction } from "react-native-floating-action";
import ActionButton from 'react-native-action-button';


export const Map = ({ navigation }: { navigation: unknown }) => {
	return (
		<View className='flex items-center justify-center'>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: 38.905869,
					longitude: -77.051598,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
				showsUserLocation
			>
				<Polyline
					coordinates={[
						{ latitude: 38.889484, longitude: -77.035278 },
						{ latitude: 38.897675, longitude: -77.03653 },
					]}
				/>
			</MapView>
			
		</View>
	)
}

const styles = StyleSheet.create({
	map: {
		...StyleSheet.absoluteFillObject,
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
	},
})

