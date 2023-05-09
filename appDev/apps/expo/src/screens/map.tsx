import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  Pressable,
} from "react-native";
import MapView, {
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import MapViewDirections, {
  MapDirectionsResponse,
} from "react-native-maps-directions";
import * as RNLocation from "expo-location";

import { GOOGLE_MAPS_API_KEY } from "../apiKeys";
import { trpc } from "../utils/trpc";
import { LocationObject } from "expo-location";

const URL = "http://161.253.78.224:9090";
//const URL = "http://172.20.10.5:9090";

export interface GoogleLocationResponse {
  location: Location;
  accuracy: number;
}

export interface Location {
  lat: number;
  lng: number;
}

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_REGION = {
  latitude: 38.9007,
  longitude: 77.0518,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

export const Map = ({ navigation, route }: { navigation: any; route: any }) => {
  const mapRef = useRef<MapView>(null);

  const [name, _] = useState<string>(route.params.name);

  const userQuery = trpc.user.byId.useQuery(name);

  const [region, setRegion] = useState<Region>(INITIAL_REGION);

  const [currentRoute, setCurrentRoute] = useState<MapDirectionsResponse>();
  const [currentStep, setCurrentStep] = useState("");

  const [closestStep, setClosestStep] = useState("");
  const [steps, setSteps] = useState<string[]>([]);

  const [duration, setDuration] = useState<string>("");
  const [distance, setDistance] = useState<string>("");

  const [location, setLocation] = useState<LocationObject>();

  const pref_names = ["Shade", "PoI", "Paved", "Lit"];

  const preferences = {
    shade: userQuery.data?.shade,
    PoI: userQuery.data?.POI,
    paved: userQuery.data?.paved,
    lit: userQuery.data?.lit,
    distance: userQuery.data?.distance,
  };

  //check that timeout worked
  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
        let { status } = await RNLocation.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }

        let location = await RNLocation.getCurrentPositionAsync({});
        setLocation(location);
        console.log("CURRENT LOCATION: ", location);
      })();
    }, 1000);
    return () => clearInterval(interval);
  }, [currentRoute, region]);

  useEffect(() => {
    if (currentRoute?.legs === undefined) {
      return;
    }
    let min = 1e6;
    let min_inst = "";
    for (let leg of currentRoute?.legs) {
      for (let step of leg.steps) {
        let euclidean_distance = Math.sqrt(
          Math.pow(location?.coords.latitude - step.start_location.lat, 2) +
            Math.pow(location?.coords.longitude - step.start_location.lng, 2)
        );
        if (euclidean_distance < min) {
          min = euclidean_distance;
          min_inst = step.html_instructions.replace(/<[^>]+>/g, "");
        }
      }
    }
    setClosestStep(min_inst);
  }, [location]);

  useEffect(() => {
    if (currentRoute?.legs === undefined) {
      return;
    }
    let all_steps = [];
    for (let leg of currentRoute?.legs) {
      for (let step of leg.steps) {
        all_steps.push(step.html_instructions.replace(/<[^>]+>/g, ""));
      }
    }
    setSteps(all_steps);
  }, [currentRoute]);

  const fetchFinalRoute = async () => {
    const res = await fetch(`${URL}/route`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ location: origin, preferences: preferences }),
    });
    return res.json();
  };

  const finalRouteQuery = useQuery({
    queryKey: ["finalRoute"],
    queryFn: fetchFinalRoute,
  });

  const origin: LatLng = {
    // latitude: 38.89963,
    // longitude: -77.0489,
    latitude: 38.899176,
    longitude: -77.047092,
  };

  const dest: LatLng = { latitude: 38.89963, longitude: -77.0489 };

  if (finalRouteQuery.isLoading) {
    return (
      <SafeAreaView className="flex items-center justify-center h-screen -m-24 bg-sky-100">
        <Image
          source={require("../../assets/bird.gif")}
          className="h-80 w-80"
        />
        <Text className="m-2">This may take a minute</Text>
      </SafeAreaView>
    );
  }

  if (finalRouteQuery.isError) {
    return (
      <SafeAreaView>
        <Text>
          Error getting route data, {(finalRouteQuery.error as Error).message}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex items-center justify-center w-full h-full">
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        onRegionChange={setRegion}
        // onRegionChangeComplete={() => {
        // 	mapRef.current?.animateToRegion(INITIAL_REGION)
        // }}
        showsUserLocation
        onUserLocationChange={(e) => {
          setRegion({
            latitude: e.nativeEvent.coordinate?.latitude!,
            longitude: e.nativeEvent.coordinate?.longitude!,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          mapRef.current?.animateToRegion(region);
        }}
      >
        {finalRouteQuery.data !== undefined ? (
          <>
            <MapViewDirections
              origin={finalRouteQuery.data.route1[0] ?? origin}
              destination={finalRouteQuery.data.route1.at(-1) ?? dest}
              waypoints={finalRouteQuery.data.route1.slice(1, 24)}
              apikey={GOOGLE_MAPS_API_KEY}
              mode="WALKING"
              splitWaypoints={true}
              strokeWidth={3}
              strokeColor="hotpink"
              onStart={(s) => console.log("START: ", s)}
              onError={(e) => console.error("ERROR: ", e)}
              onReady={(res) => {
                setCurrentRoute(res);
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
            {currentRoute?.legs.flatMap((leg, i) =>
              leg.steps.flatMap((step, j) => (
                <Marker
                  key={step.polyline.points + i + j}
                  coordinate={{
                    latitude: step.start_location.lat,
                    longitude: step.start_location.lng,
                  }}
                  title={step.html_instructions.replace(/<[^>]+>/g, "")}
                  description={step.distance.text}
                  pinColor={
                    step.polyline.points === currentStep ? "blue" : "red"
                  }
                  onPress={() => setCurrentStep(step.polyline.points)}
                ></Marker>
              ))
            )}
          </>
        ) : (
          <Text>{JSON.stringify(finalRouteQuery)}</Text>
        )}
      </MapView>
      <Pressable
        className="absolute top-0 h-24 w-5/6 p-2 bg-white my-2 shadow-xl flex items-center justify-center rounded-xl active:bg-gray-200"
        onPress={() => navigation.navigate("Directions", { directions: steps })}
      >
        <Text className="text-xl font-bold">
          {closestStep != "" ? closestStep : "Start Walking"}
        </Text>
      </Pressable>
      <View className="absolute bottom-8 left-0 m-2 flex items-start justify-start bg-white shadow-xl rounded-xl p-2">
        {duration && <Text className="font-bold">{duration} minutes</Text>}
        {distance && <Text className="font-bold">{distance} km</Text>}
      </View>
      <View className="absolute flex bottom-8 right-0 m-2 gap-y-2 items-center justify-center bg-white shadow-xl rounded-xl p-2">
        {pref_names.map((pref) => {
          let pref_score = finalRouteQuery.data.score1[pref.toLowerCase()];
          if (pref_score < 0) {
            return (
              <View
                key={pref}
                className="bg-red-300 rounded-xl p-2 w-full items-center"
              >
                <Text>{pref}</Text>
              </View>
            );
          } else if (pref_score == 0) {
            return (
              <View
                key={pref}
                className="bg-yellow-300 rounded-xl p-2 w-full items-center"
              >
                <Text>{pref}</Text>
              </View>
            );
          } else if (pref_score > 0) {
            return (
              <View
                key={pref}
                className="bg-green-300 rounded-xl p-2 w-full items-center"
              >
                <Text>{pref}</Text>
              </View>
            );
          }
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    // flex: 1,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
});
