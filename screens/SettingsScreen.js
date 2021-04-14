import React, { useState, useContext, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Switch } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

//custom components
import FormButton from "../components/FormButton";
import { AuthContext } from "../navigation/AuthProvider";

// button componentes
import Report from "../components/Report";
import ReportNegative from "../components/ReportNegative";
import ReportPositive from "../components/ReportPositive";
import ReportSymptoms from "../components/ReportSymptoms";
import ReportCancel from "../components/ReportCancel";

// bottom sheet libraries
//    used for animations but not used at the moment
import BottomSheet from "reanimated-bottom-sheet";
import SlidingUpPanel from "rn-sliding-up-panel";
import { WebView } from "react-native-webview";
import SettingsButton from "../components/SettingsButton";
//import { Switch } from "react-native-gesture-handler";

let iStatus = ""; // must have variable globally(only works for fucntional component) if wished to use to store return values from firebase

const HomeScreen = ({ navigation }) => {
  const {
    logout,
    setUserInfectionStatus,
    isEnabled,
    toggleSwitch,
  } = useContext(AuthContext);
  const sheetRef = React.useRef(null);

  //force rerender
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const clickHandler = (s) => {
    setCount(s);
  };

  let re = false;
  // //same as component did mount
  // useEffect(() => {
  //   setFirstRender(true);
  // }, []);

  // set up render content for bottom sheet
  const renderContent = () => (
    <View
      style={{
        backgroundColor: "#DEDEDE",
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 20,
        height: 450,
        alignItems: "center",
      }}
    >
      {/* bottom sheet content */}
      <ReportNegative
        buttonTitle="Negative/No Symptoms"
        onPress={() => {
          sheetRef.current.snapTo(0);
          //clickHandler("Negative");
          return setUserInfectionStatus("N");
        }}
      />

      <ReportSymptoms
        buttonTitle="Symptoms"
        onPress={() => {
          sheetRef.current.snapTo(0);
          //clickHandler("Symptomatic");
          return setUserInfectionStatus("M");
        }}
      />

      <ReportPositive
        buttonTitle="Positive"
        onPress={() => {
          sheetRef.current.snapTo(0);
          //clickHandler("Positive");
          return setUserInfectionStatus("P");
        }}
      />

        <ReportCancel
            buttonTitle="Cancel"
            onPress={()=> sheetRef.current.snapTo(0)}
            />

      <Text style={styles.reportFooter}>
        Reporting is not necesary but does help the contact tracing accuracy
      </Text>
    </View>
  );
  return (
    <View style={styles.container} backgroundColor={"white"}>
      <View style={styles.toggleLocationView}>
        <Text style={styles.toggleLocationText}>Location Tracking</Text>
        <Switch
          style={styles.toggleLocationSwitch}
          trackColor={{ false: "#767577", true: "#a6e4d0" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <View style={styles.buttons}>
        <Report
          buttonTitle="Report Covid Status"
          // on press snap to position in snapPoins list
          onPress={() => sheetRef.current.snapTo(1)}
        />

        <FormButton
          buttonTitle="Logout"
          onPress={() => {
            return logout();
          }}
        />
      </View>

      <BottomSheet
        ref={sheetRef}
        snapPoints={[0, 560]}
        borderRadius={30}
        renderContent={renderContent}
      />
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 35,
    marginBottom: 5,
    color: "white",
    fontFamily: "Iowan Old Style",
    marginTop: 0,
  },
  buttons: {
    width: "90%",
    position: "absolute",
    bottom: 15,
  },
  webView2: {
    top: 160,
    width: wp("100%"),
    flex: 1,
    margin: -160,
    resizeMode: "contain",
  },
  toggleLocationView: {
    marginLeft: "-80%",
    bottom: "35%",
  },
  toggleLocationText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
    position: "absolute",
    marginLeft: "45%",
  },
  toggleLocationSwitch: {
    marginLeft: "80%",
  },
  settingsButton: {
    paddingBottom: 20,
    width: "50%",
  },
  reportFooter: {
    paddingTop: 10,
    fontFamily: "Helvetica Neue",
    textAlign: "center",
    color: "grey",
  },
  backdropStyle: {
    // backgroundColor: "orange",
  },
});
