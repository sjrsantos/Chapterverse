import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a book or author..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
      >
        <Picker.Item label="All categories" value="" color="black" />
        {/* Add more categories as necessary */}
        <Picker.Item label="Fiction" value="fiction" color="black" />
        <Picker.Item label="Sci-Fi" value="science" color="black" />
        {/* add other categories here */}
      </Picker>
      <Button title="Search" onPress={() => onSearch(searchTerm, category)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#f9f9f9",
    marginTop: 20,
  },
  picker: {
    marginBottom: 15,
    backgroundColor: "#f9f9f9", // The background color of the picker button
    borderColor: "red",
    borderWidth: 1, // If you want to see the picker's boundaries clearly
    // This color is for the button text on Android; doesn't work on iOS
    color: "black",
  },
});

export default SearchBar;
