import { View, Text, Button, StyleSheet, Pressable, Alert, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import type { inferProcedureOutput } from '@trpc/server'
import type { AppRouter } from '@acme/api'
import { trpc } from '../utils/trpc'
import React, { useState, useRef } from 'react'


export const Profile = ({ navigation, route }: { navigation: unknown, route: any }) => {
	const [message, setMessage] = useState("");
	
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
                <TouchableOpacity 
					onPress={() => Alert.alert('Cannot press this one')}> 
					<Text style={[styles.setFontSizeThree]}>
						Historic Sites
					</Text>
				</TouchableOpacity>
            </View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity 
					onPress={() => Alert.alert('Cannot press this one')}> 
					<Text style={[styles.setFontSizeThree]}>
					Local Attractions
					</Text>
				</TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
				<TouchableOpacity 
					onPress={() => Alert.alert('Cannot press this one')}> 
					<Text style={[styles.setFontSizeThree]}>
					Parks/Greenery
					</Text>
				</TouchableOpacity>
            </View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity 
					onPress={() => Alert.alert('Cannot press this one')}> 
					<Text style={[styles.setFontSizeThree]}>
					Shady
					</Text>
				</TouchableOpacity>
            </View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity 
					onPress={() => Alert.alert('Cannot press this one')}> 
					<Text style={[styles.setFontSizeThree]}>
					Low Elevation Gain
					</Text>
				</TouchableOpacity>
            </View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity 
					onPress={() => Alert.alert('Cannot press this one')}> 
					<Text style={[styles.setFontSizeThree]}>
					High Elevation Gain
					</Text>
				</TouchableOpacity>
            </View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity 
					onPress={() => Alert.alert('Cannot press this one')}> 
					<Text style={[styles.setFontSizeThree]}>
					Short (Less than 2 miles)
					</Text>
				</TouchableOpacity>
            </View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity 
					onPress={() => Alert.alert('Cannot press this one')}> 
					<Text style={[styles.setFontSizeThree]}>
					Long (More than 2 miles)
					</Text>
				</TouchableOpacity>
            </View>
   	 	</View>
		
		
		
		
	

	)
}	

  
const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});


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
		backgroundColor: '#36fbf6',
		justifyContent: 'center',
    	alignItems: 'center',
		alignSelf: 'stretch'
    },
	setFontSizeThree: {
		fontSize: 25 
	  }
  });

  
