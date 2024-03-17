import { Spinner } from "native-base";
import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import FastImage from "react-native-fast-image";
import ImagePicker from "react-native-image-picker";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/FontAwesome";
import { HelperService } from "../../Services/Utils/HelperService";
import { ApplicationStyles, Colors } from "../../Theme";
import { launchCamera } from "react-native-image-picker";
import RNFS from "react-native-fs";
import DocumentPicker from "react-native-document-picker";

export default class MultipleImagePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: [],
      fileName: [],
      fileContents: "",
      showIcons: false,
    };
  }

  componentDidMount() {
    this.setState({
      sources: this.props.images || [],
    });
  }

  togle_icons = () => {
	this.setState({showIcons: !this.state.showIcons})
  }

  onImagePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
  
      if (res && res.length > 0) {
        const fileData = res[0];
        const fileUri = fileData.uri;
  
        try {
          const fileStats = await RNFS.stat(fileUri);
          const fileExists = fileStats.isFile();
  
          if (fileExists) {
            const base64Data = await RNFS.readFile(fileUri, 'base64');

            const source = { uri: fileUri};
            // const updatedSources = [`${base64Data}`];
            const updatedSources = [...this.state.sources, `${base64Data}`];
  
            this.setState({
              sources: updatedSources,
            });
            this.props.onImageSuccess({ image: updatedSources });
          } else {
            HelperService.showToast({ message: `File ${fileData.name} does not exist.` });
          }
        } catch (error) {
          console.error('Error checking file existence:', error);
          HelperService.showToast({ message: 'An error occurred while checking file existence.' });
        }
      } else {
        HelperService.showToast({ message: 'No file selected.' });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        HelperService.showToast({ message: 'File selection cancelled.' });
      } else {
        console.error('Unhandled promise rejection:', err);
        HelperService.showToast({ message: 'An error occurred. Please try again later.' });
      }
    }
  };
  
  
  

  async chooseFile() {
    const options = {
      title: "Select Image",
      quality: 0.9,
      maxWidth: 1080,
      maxHeight: 1080,
      mediaType: "photo",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    const permission = await HelperService.requestMultipleStoragePermission();
    const cameraPermission = await HelperService.requestCameraPermission();

    if (cameraPermission || permission) {
      launchCamera(options, async (response) => {
        if (response.didCancel) {
          // Do nothing if the user cancels the image selection
        } else if (response.error) {
          // Handle error if any
        } else if (response.customButton) {
          Alert(response.customButton);
        } else {
          try {
            const base64Data = await RNFS.readFile(
              response.assets[0].uri,
              "base64"
            );
            const source = { uri: response.assets[0].uri };

            const updatedSources = [...this.state.sources, `${base64Data}`];

            this.setState({
              sources: updatedSources,
            });

            this.props.onImageSuccess({ image: updatedSources });
          } catch (error) {
            console.error("Error reading file:", error);
          }
        }
      });
    } else {
      Alert.alert(
        "Storage permission Denied.",
        'If you have denied permanently then Go to "App Permissions" and Turn on "Storage" Permission for Jaideep.'
      );
    }
  }

  onClearImage() {
    this.setState({
      sources: [],
    });

    this.props.onClearImage();
  }

  render() {
    const { images, loading, title } = this.props;
	const { fileName, showIcons } = this.state;

    let loadingNode = [];

    if (loading) {
      loadingNode = (
        <View style={styles.spinner}>
          <Spinner color={Colors.primary} />
          <Text style={{ color: Colors.primary }}>Processing Image...</Text>
        </View>
      );
    }

    const imageSources = this.state.sources.length
      ? this.state.sources
      : images.filter((val) => val !== "");

      // console.log("imageSources132333", this.state.sources);
    //   console.log("132333", images.length);

    const imageNode = imageSources.map((data, index) => {
      const uri_new = `data:image/jpeg;base64,${data}`;
      console.log("MMMMMMM====++", data);
      return (
        <TouchableOpacity
          key={index}
          onPress={() => {
            <View style={{ flex: 1 }}>
              <FastImage
                style={styles.previewImage}
                source={{ uri: uri_new[0] }}
                resizeMode={FastImage.resizeMode.stretch}
              />
            </View>;
          }}
        >
          <FastImage
            key={index}
            source={{ uri: uri_new }}
            style={styles.previewImage}
            resizeMode={FastImage.resizeMode.stretch}
          />
        </TouchableOpacity>
      );
    });

    return (
      <View style={styles.uploadContainer}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <Text style={styles.title}>{`${title}`}</Text>
            {this.state.sources.length ? (
              <Icon
                name={"times-circle-o"}
                style={styles.removeIcon}
                onPress={() => this.onClearImage()}
              />
            ) : null}
          </View>
          <View style={styles.imagePreviewContainer}>{imageNode}</View>
          {loadingNode}
        </View>
        <View>
          <TouchableOpacity
            disabled={loading}
            onPress={this.togle_icons}
            style={styles.uploadButton}
          >
            <Icon name={"plus-circle"} style={styles.addIcon} />
          </TouchableOpacity>
          <View style={{}}>
            {showIcons && (
              <View>
                <TouchableOpacity
                  disabled={loading}
                  onPress={
                    !this.props.enable ? () => this.chooseFile() : () => {}
                  }
                  style={styles.uploadButton}
                >
                  <Icon name={"camera"} style={styles.addIcon} />
                </TouchableOpacity>
                <View>
                  <TouchableOpacity
                    disabled={loading}
                    onPress={() => this.onImagePicker()}
                    style={styles.uploadButton}
                  >
                    <Icon name={"image"} style={styles.addIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "85%",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.firozi,
    elevation: 3,
    paddingVertical: hp("1%"),
  },
  addIcon: {
    color: Colors.firozi,
    fontSize: wp("9%"),
  },
  removeIcon: {
    color: Colors.primary,
    fontSize: wp("6.5%"),
    paddingTop: 0,
  },
  uploadButton: {},
  uploadContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  imagePreviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    position: "relative",
    minHeight: hp("8%"),
  },
  title: {
    fontSize: wp("3.5%"),
    fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.firozi,
    fontWeight: "bold",
    paddingHorizontal: wp("2%"),
    flexWrap: "wrap",
    width: "90%",
  },
  image: {
    width: hp("8%"),
    height: hp("8%"),
    resizeMode: "stretch",
    borderRadius: 10,
    marginHorizontal: wp("1.5%"),
    marginVertical: wp("1.5%"),
  },
  spinner: {
    marginVertical: 0,
    position: "absolute",
    backgroundColor: "rgba(232, 229, 229, 0.5)",
    height: "117%",
    width: "100%",
    zIndex: 2,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
  },
  previewImage: {
    width: wp("18%"),
    height: hp("8%"),
    resizeMode: "stretch",
    borderRadius: 10,
    marginHorizontal: wp("1.5%"),
    marginVertical: wp("1.5%"),
    // backgroundColor: 'red'
  },
});
