import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
export default function Dropdown({
  data = [],
  value = {},
  onSelect = () => {},
}) {
  const [showOption, setShowOption] = useState(false);
  const [searchingtext, setSearchingtext] = useState(false);
  const [filterdata, setFilterdata] = useState([]);
  const onSelectedItem = (c) => {
    setShowOption(false);
    onSelect(c);
  };
  const searchtext = (text) => {
    if (text) {
      setSearchingtext(true);
      const newData = data.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterdata(newData);
    } else {
      setSearchingtext(false);
      setFilterdata(data);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setShowOption(!showOption);
          setFilterdata(data);
        }}
        style={styles.dropdownContainer}
        activeOpacity={0.8}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {value && (
            <Image
              source={value?.image}
              style={{ height: 20, width: 20 }}
            ></Image>
          )}
          <Text style={{ marginLeft: 10 }}>
            {!!value ? value?.name : `Select country`}
          </Text>
        </View>
        <AntDesign
          style={{ transform: [{ rotate: showOption ? "180deg" : "0deg" }] }}
          name="down"
          size={24}
          color="red"
        />
      </TouchableOpacity>
      {showOption && (
        <View>
          <View style={styles.itemContainer}>
            <ScrollView>
              {!searchingtext &&
                data.map((d, i) => {
                  return (
                    <TouchableOpacity
                      key={String(i)}
                      onPress={() => onSelectedItem(d)}
                      style={styles.item}
                    >
                      <Image
                        source={d.image}
                        style={{ height: 30, width: 30 }}
                      ></Image>
                      <Text style={{ marginLeft: 10 }}>{d.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              {searchingtext &&
                filterdata.map((d, i) => {
                  return (
                    <TouchableOpacity
                      key={String(i)}
                      onPress={() => onSelectedItem(d)}
                      style={styles.item}
                    >
                      <Image
                        source={d.image}
                        style={{ height: 30, width: 30 }}
                      ></Image>
                      <Text style={{ marginLeft: 10 }}>{d.name}</Text>
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          </View>
          {/* search field */}
          <View style={styles.searchField}>
            <TextInput
              placeholder="Search Country..."
              style={styles.search}
              onChangeText={(text) => searchtext(text)}
            ></TextInput>
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    padding: 30,
    position: "absolute",
    marginTop: 100,
  },
  dropdownContainer: {
    backgroundColor: "lightgray",
    padding: 10,
    width: 300,
    justifyContent: "space-between",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "row",
  },
  itemContainer: {
    position: "relative",
    marginTop: 10,
    height: 150,
    padding: 10,
    borderWidth: 2,
    borderColor: "gray",
  },
  item: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchField: {
    width: 300,
    height: 50,
    borderWidth: 1,
  },
  search: {
    margin: 5,
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
  },
});
