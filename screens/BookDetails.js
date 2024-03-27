import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BookDetails = ({ route }) => {
  const { book } = route.params;
  const [detailedBookInfo, setDetailedBookInfo] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      // Assuming 'book.key' contains the OLID needed for detailed search
      // The key usually has a format like '/works/OL1234567W'
      const bookDetailsUrl = `https://openlibrary.org${book.key}.json`;
      try {
        const response = await fetch(bookDetailsUrl);
        const json = await response.json();
        setDetailedBookInfo(json);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [book.key]); // Dependency to refetch if book changes

  // Function to process and return the description
  const renderDescription = (bookInfo) => {
    if (!bookInfo || !bookInfo.description) return "Description not available.";

    if (typeof bookInfo.description === "object") {
      return bookInfo.description.value || "Description not available.";
    }

    return bookInfo.description;
  };

  if (!detailedBookInfo) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return (
    <ImageBackground
      source={require("../assets/chapterverse-image.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Image
            source={{
              uri: `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`,
            }}
            style={{ width: "100%", height: 300 }}
            resizeMode="contain"
          />
          <Text style={{ marginTop: 20, fontSize: 22, fontWeight: "bold" }}>
            {book.title}
          </Text>
          <>
            <Text style={{ fontSize: 18, color: "#666" }}>
              {book.author_name}
            </Text>
          </>
          {/* Displays other book details */}
          <Text style={{ marginTop: 20, fontSize: 16 }}>
            {renderDescription(detailedBookInfo)}
          </Text>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  backButton: {
    padding: 10,
  },
  bookContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  bookImage: {
    width: 200,
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
    textShadowColor: "rgba(100,100, 100, 0.75)", // Black shadow color
    textShadowOffset: { width: -1, height: 1 }, // Shadow offset
    textShadowRadius: 10, // Shadow blur radius
  },
  category: {
    fontSize: 18,
    fontStyle: "italic",
    marginBottom: 10,
    color: "#02fa30",
    textShadowColor: "rgba(0,0, 0, 0.9)", // Black shadow color
    textShadowOffset: { width: -1, height: 1 }, // Shadow offset
    textShadowRadius: 2, // Shadow blur radius
  },
  description: {
    fontSize: 20,
    marginBottom: 10,
    color: "#fff",
    textAlign: "justify",
    textShadowColor: "rgba(0,0, 0, 0.75)", // Black shadow color
    textShadowOffset: { width: -1, height: 1 }, // Shadow offset
    textShadowRadius: 2, // Shadow blur radius
  },
});

export default BookDetails;
