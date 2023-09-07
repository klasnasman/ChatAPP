import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  Text,
} from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { Camera as ExpoCamera, CameraType, FlashMode } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import ImagePreview from "./ImagePreview";

const CameraApp = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaPermission, setHasMediaPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await ExpoCamera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");

      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasMediaPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  const cameraRef = useRef(null);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const picture = await cameraRef.current.takePictureAsync();
        setPicture(picture);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };
  const toggleFlash = () => {
    setFlash((current) =>
      current === FlashMode.off ? FlashMode.on : FlashMode.off
    );
  };

  const [picture, setPicture] = useState(null);

  if (hasCameraPermission === null || hasMediaPermission === null) {
    return (
      <View>
        <Text>Waiting for permissions....</Text>
      </View>
    );
  }
  if (hasCameraPermission === false || hasMediaPermission === false) {
    return (
      <View>
        <Text>Permissions denied....</Text>
      </View>
    );
  }

  const handleResetCamera = () => {
    setPicture(null);
  };

  if (picture !== null) {
    return (
      <View style={styles.container}>
        <ImagePreview
          pictureUri={picture.uri}
          resetCamera={handleResetCamera}
        />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ExpoCamera
          style={styles.cameraContainer}
          type={type}
          flashMode={flash}
          ref={cameraRef}>
          <View style={styles.buttonsTopContainer}>
            <TouchableOpacity style={styles.generalButton}>
              <FontAwesome
                name="refresh"
                size={24}
                color="black"
                onPress={() => toggleCameraType()}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.generalButton}>
              <Entypo
                name="flash"
                size={24}
                color={flash === FlashMode.on ? "#FFDD00" : "black"}
                onPress={() => toggleFlash()}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsBottomContainer}>
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={() => takePicture()}>
              <Entypo name="camera" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </ExpoCamera>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  cameraContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "space-between",
    paddingTop: 16,
  },
  buttonsTopContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "space-between",
  },
  buttonsBottomContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
  },
  generalButton: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 40,
    width: 50,
    height: 50,
    marginRight: 5,
  },
  cameraButton: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 40,
    width: 80,
    height: 80,
  },
  text: {
    fontSize: 18,
    color: "white",
    marginLeft: 20,
  },
});

export default CameraApp;
