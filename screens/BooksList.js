import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import SearchBar from "../components/SearchBar";

const BooksList = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);

  const fetchBooks = async (searchTerm = "", category = "") => {
    let url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
      searchTerm
    )}`;
    if (category) {
      url += `&subject=${encodeURIComponent(category)}`;
    }

    setIsLoading(true);
    try {
      const response = await fetch(url);
      const json = await response.json();
      setBooks(json.docs); // Assume 'docs' contains the book data
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const renderBookItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("BookDetails", { book: item })}
        style={styles.bookItem}
      >
        <Image
          source={{
            uri: `http://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`,
          }}
          style={styles.bookImage}
        />
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookCategory}>
          {item.subject?.[0] || "General"}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate("UserLogin");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/chapterverse-image.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SearchBar
        style={styles.searchBar}
        onSearch={(searchTerm, category) => fetchBooks(searchTerm, category)}
      />
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <FlatList
            data={books}
            renderItem={renderBookItem}
            keyExtractor={(item, index) => item.key || index.toString()}
            contentContainerStyle={styles.flatListContainer}
          />
        )}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  flatListContainer: {
    paddingBottom: 20, // Adjust as needed for padding at the bottom
  },
  bookItem: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10, // Space between items
  },
  bookImage: {
    width: 150,
    height: 220,
  },
  bookTitle: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
    marginTop: 10,
  },
  bookCategory: {
    fontSize: 16,
    color: "#02fa30",
    marginTop: 5,
  },
  logoutButton: {
    position: "absolute",
    top: "80%",
    right: 30,
    backgroundColor: "#000000a0", // Semi-transparent background
    padding: 10,
    borderRadius: 5, // Rounded corners
  },
  logoutButtonText: {
    fontSize: 18,
    color: "#fff",
  },
  searchBar: {
    marginTop: 50,
    backgroundColor: "#fff",
    color: "#000",
  },
});

export default BooksList;
