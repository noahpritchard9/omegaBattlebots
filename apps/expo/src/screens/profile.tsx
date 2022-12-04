import { View, Text, Button, StyleSheet, Pressable, Alert, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import type { inferProcedureOutput } from '@trpc/server'
import type { AppRouter } from '@acme/api'
import { trpc } from '../utils/trpc'
import React, { useState, useRef } from 'react'
import {
	useFonts,
	Roboto_100Thin,
	Roboto_100Thin_Italic,
	Roboto_300Light,
	Roboto_300Light_Italic,
	Roboto_400Regular,
	Roboto_400Regular_Italic,
	Roboto_500Medium,
	Roboto_500Medium_Italic,
	Roboto_700Bold,
	Roboto_700Bold_Italic,
	Roboto_900Black,
	Roboto_900Black_Italic,
  } from '@expo-google-fonts/roboto';

  import Slider from '@react-native-community/slider';


export const Profile = ({ navigation, route }: { navigation: unknown, route: any }) => {
	const [message, setMessage] = useState("");
	const [sliderValue, setSliderValue] = useState(0);

	let [fontsLoaded] = useFonts({
		Roboto_100Thin,
    	Roboto_100Thin_Italic,
    	Roboto_300Light,
    	Roboto_300Light_Italic,
    	Roboto_400Regular,
    	Roboto_400Regular_Italic,
    	Roboto_500Medium,
    	Roboto_500Medium_Italic,
    	Roboto_700Bold,
    	Roboto_700Bold_Italic,
    	Roboto_900Black,
    	Roboto_900Black_Italic,
	  });
	
	  if (!fontsLoaded) {
		return null;
	  }

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
			<Text style={{ fontFamily: 'Roboto_400Regular', fontSize: 20 }}>                         Lit{"\n"}Low             Medium               High</Text>
			<Slider
          		style={{width: 200, height: 40}}
				maximumValue={1}
          		minimumValue={-1}
          		minimumTrackTintColor="#307ecc"
          		maximumTrackTintColor="#000000"
          		step={1}
          		value={sliderValue}
          		onValueChange={
            		(sliderValue) => setSliderValue(sliderValue)
          		}
       		 />
            </View>
			<View style={styles.buttonContainer}>
			<Text style={{ fontFamily: 'Roboto_400Regular', fontSize: 20 }}>                         Lit{"\n"}Low             Medium               High</Text>
			<Slider
          		style={{width: 200, height: 40}}
				maximumValue={1}
          		minimumValue={-1}
          		minimumTrackTintColor="#307ecc"
          		maximumTrackTintColor="#000000"
          		step={1}
          		value={sliderValue}
          		onValueChange={
            		(sliderValue) => setSliderValue(sliderValue)
          		}
       		 />
            </View>
            <View style={styles.buttonContainer}>
			<Text style={{ fontFamily: 'Roboto_400Regular', fontSize: 20 }}>                         Lit{"\n"}Low             Medium               High</Text>
			<Slider
          		style={{width: 200, height: 40}}
				maximumValue={1}
          		minimumValue={-1}
          		minimumTrackTintColor="#307ecc"
          		maximumTrackTintColor="#000000"
          		step={1}
          		value={sliderValue}
          		onValueChange={
            		(sliderValue) => setSliderValue(sliderValue)
          		}
       		 />
            </View>
			<View style={styles.buttonContainer}>
			<Text style={{ fontFamily: 'Roboto_400Regular', fontSize: 20 }}>                         Lit{"\n"}Low             Medium               High</Text>
			<Slider
          		style={{width: 200, height: 40}}
				maximumValue={1}
          		minimumValue={-1}
          		minimumTrackTintColor="#307ecc"
          		maximumTrackTintColor="#000000"
          		step={1}
          		value={sliderValue}
          		onValueChange={
            		(sliderValue) => setSliderValue(sliderValue)
          		}
       		 />
            </View>
			<View style={styles.buttonContainer}>
			<Text style={{ fontFamily: 'Roboto_400Regular', fontSize: 20 }}>                         Lit{"\n"}Low             Medium               High</Text>
			<Slider
          		style={{width: 200, height: 40}}
				maximumValue={1}
          		minimumValue={-1}
          		minimumTrackTintColor="#307ecc"
          		maximumTrackTintColor="#000000"
          		step={1}
          		value={sliderValue}
          		onValueChange={
            		(sliderValue) => setSliderValue(sliderValue)
          		}
       		 />
            </View>
			<View style={styles.buttonContainer}>
			<Text style={{ fontFamily: 'Roboto_400Regular', fontSize: 20 }}>                         Lit{"\n"}Low             Medium               High</Text>
			<Slider
          		style={{width: 200, height: 40}}
				maximumValue={1}
          		minimumValue={-1}
          		minimumTrackTintColor="#307ecc"
          		maximumTrackTintColor="#000000"
          		step={1}
          		value={sliderValue}
          		onValueChange={
            		(sliderValue) => setSliderValue(sliderValue)
          		}
       		 />
            </View>
			<View style={styles.buttonContainer}>
			<Text style={{ fontFamily: 'Roboto_400Regular', fontSize: 20 }}>                         Lit{"\n"}Low             Medium               High</Text>
			<Slider
          		style={{width: 200, height: 40}}
				maximumValue={1}
          		minimumValue={-1}
          		minimumTrackTintColor="#307ecc"
          		maximumTrackTintColor="#000000"
          		step={1}
          		value={sliderValue}
          		onValueChange={
            		(sliderValue) => setSliderValue(sliderValue)
          		}
       		 />
            </View>
			<View style={styles.buttonContainer}>
			<Text style={{ fontFamily: 'Roboto_400Regular', fontSize: 20 }}>                         Lit{"\n"}Low             Medium               High</Text>
			<Slider
          		style={{width: 200, height: 40}}
				maximumValue={1}
          		minimumValue={-1}
          		minimumTrackTintColor="#307ecc"
          		maximumTrackTintColor="#000000"
          		step={1}
          		value={sliderValue}
          		onValueChange={
            		(sliderValue) => setSliderValue(sliderValue)
          		}
       		 />
            </View>
			<View style={styles.buttonContainer}>
			<Text style={{ fontFamily: 'Roboto_400Regular', fontSize: 20 }}>                         Lit{"\n"}Low             Medium               High</Text>
			<Slider
          		style={{width: 200, height: 40}}
				maximumValue={1}
          		minimumValue={-1}
          		minimumTrackTintColor="#307ecc"
          		maximumTrackTintColor="#000000"
          		step={1}
          		value={sliderValue}
          		onValueChange={
            		(sliderValue) => setSliderValue(sliderValue)
          		}
       		 />
            </View>
			<View style={styles.buttonContainer}>
			<Text style={{ fontFamily: 'Roboto_400Regular', fontSize: 20 }}>                         Lit{"\n"}Low             Medium               High</Text>
			<Slider
          		style={{width: 200, height: 40}}
				maximumValue={1}
          		minimumValue={-1}
          		minimumTrackTintColor="#307ecc"
          		maximumTrackTintColor="#000000"
          		step={1}
          		value={sliderValue}
          		onValueChange={
            		(sliderValue) => setSliderValue(sliderValue)
          		}
       		 />
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
		//padding:10,
		borderColor: 'blue',
		borderWidth: 1, 
		borderRadius: 4,
		backgroundColor: '#36fbf6',
		justifyContent: 'center',
    	alignItems: 'center',
		alignSelf: 'stretch'
    },
	setFontSizeThree: {
		fontSize: 25 
	  }
  });

  
