import { View, Text, Button, StyleSheet, Pressable, Alert } from 'react-native'

export const Profile = ({ navigation, route }: { navigation: unknown, route: any }) => {
	return (
		//<View className='flex items-center justify-center'>
		//	<Text className='text-4xl mt-4'>Welcome {route.params.name}</Text>

		//	<Button
        //		title="Press me"
        //		color="#f194ff"
      	//	/>
		//</View>
		<View style={styles.container}>
			<View style={styles.buttonContainer}>
                <Button 
					title="Button 1"
					onPress={() => Alert.alert('Cannot press this one')}
				/>
            </View>
            <View style={styles.buttonContainer}>
                <Button 
					title="Button 2"
					onPress={() => Alert.alert('Cannot press this one')}
				/>
            </View>
			<View style={styles.buttonContainer}>
                <Button 
					title="Button 3"
					onPress={() => Alert.alert('Cannot press this one')}
				/>
            </View>
			<View style={styles.buttonContainer}>
                <Button 
					title="Button 4"
					onPress={() => Alert.alert('Cannot press this one')}
				/>
            </View>
			<View style={styles.buttonContainer}>
                <Button 
					title="Button 5"
					onPress={() => Alert.alert('Cannot press this one')}
				/>
            </View>
			<View style={styles.buttonContainer}>
                <Button 
					title="Button 6"
					onPress={() => Alert.alert('Cannot press this one')}
				/>
            </View>
			<View style={styles.buttonContainer}>
                <Button 
					title="Button 7"
					onPress={() => Alert.alert('Cannot press this one')}
				/>
            </View>
   	 	</View>
		
		
		
		
		


	)
}	
const styles = StyleSheet.create({
	container: {
		flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        //justifyContent: 'flex-end',
	},
	buttonContainer: {
		//flex: 1,
        //marginBottom: 10,
		alignSelf: 'stretch'
    }
  });
