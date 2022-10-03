import { View, Text } from 'react-native'

export const Profile = ({ navigation, route }: { navigation: unknown, route: any }) => {
	return (
		<View className='flex items-center justify-center'>
			<Text className='text-4xl mt-4'>Welcome {route.params.name}</Text>
		</View>
	)
}
