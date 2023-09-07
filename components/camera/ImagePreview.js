import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { navigate } from "../navigators/RootNavigation";

const ImagePreview = ({ pictureUri, resetCamera }) => {
  const handleApprove = async () => {
    try {
      const asset = await MediaLibrary.createAssetAsync(pictureUri);
      const album = await MediaLibrary.getAlbumAsync("Expo");

      if (album == null) {
        await MediaLibrary.createAlbumAsync("Expo", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync(asset, album.id, false);
      }
      navigate("Profile");
      resetCamera();
    } catch (error) {
      console.error("Error saving picture:", error);
    }
  };

  const handleResetCamera = () => {
    resetCamera();
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: pictureUri }} style={{ flex: 1 }} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.generalButton}
          onPress={handleResetCamera}>
          <Feather name="trash" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.generalButton} onPress={handleApprove}>
          <Entypo name="check" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 16,
  },
  generalButton: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    width: 50,
    height: 50,
    marginRight: 5,
  },
});

export default ImagePreview;
