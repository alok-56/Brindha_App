import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { colors, routes } from "../../Helper/Contant";
import CustomButton from "../../Components/CustomButton";
import { useNavigation } from "@react-navigation/native";


const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "High-quality stitching essentials!",
    description: "From sewing machines to accessories, we’ve got everything you need.",
    image: require("../../Assests/Images/slider1.png"),
  },
  {
    id: "2",
    title: "Easy ordering for your businesses.",
    description: "Browse, add to cart, and get supplies delivered to your doorstep.",
    image: require("../../Assests/Images/slider2.png"),
  },
  {
    id: "3",
    title: "Enjoy bulk discounts just for you!",
    description: "Sign up now for exclusive deals on stitching essentials.",
    image: require("../../Assests/Images/slider3.png"),
  },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const navigation = useNavigation()

  const handleScroll = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      console.log("Navigate to login or home");
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ width, marginTop: -70 }}>
      <Image source={item.image} style={{ alignSelf: "center" }} />
      <View style={{ width: "85%", alignSelf: "center" }}>
        <Text style={{ fontSize: 30, fontWeight: 400, color: "#000" }}>{item.title}</Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 400,
            color: "rgb(95, 94, 94)",
            marginTop: 5,
          }}
        >
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../../Assests/Images/sliderbackground.png")}
      >
        <FlatList
          data={slides}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          ref={flatListRef}
        />

        {/* Dot Indicator */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
            marginBottom: 30,
          }}
        >
          {slides.map((_, index) => (
            <View
              key={index}
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: currentIndex === index ? colors.PRIMARY : "#ccc",
                marginHorizontal: 5,
              }}
            />
          ))}
        </View>

        {/* Button */}
        <CustomButton
          buttonStyle={{
            width: "85%",
            alignSelf: "center",
            height: 45,
            backgroundColor: colors.PRIMARY,
            borderRadius: 12,
            marginTop: 15,
            marginBottom: 15
          }}
          TextStyle={{
            fontSize: 18,
            color: "#fff",
            fontWeight: "600",
          }}
          text={currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          onClick={currentIndex === slides.length - 1 ? () => navigation.navigate(routes.SIGNUP_SCREEN) : handleNext}
        />
      </ImageBackground>
    </View>
  );
};

export default Slider;
