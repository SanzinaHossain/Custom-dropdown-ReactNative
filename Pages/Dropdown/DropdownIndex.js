import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";

export default function DropdownIndex() {
  const country1 = [
    {
      value: "1",
      name: "Germany",
      image: {
        uri: "http://atlas-content-cdn.pixelsquid.com/stock-images/germany-flag-german-lXNrAX5-600.jpg",
      },
    },
    {
      value: "2",
      name: "Bangladesh",
      image: {
        uri: "https://png.pngtree.com/png-clipart/20200401/original/pngtree-bangladesh-flag-transparent-watercolor-painted-brush-png-image_5326720.jpg",
      },
    },
    {
      value: "3",
      name: "Italy",
      image: {
        uri: "http://assets.stickpng.com/thumbs/5845ba746aa88c4892180ac4.png",
      },
    },
    {
      value: "4",
      name: "France",
      image: {
        uri: "https://cdn11.bigcommerce.com/s-e2nupsxogj/images/stencil/500x659/products/6455/34823/eyryvdkrfpz0qvphcu5m__25206.1668773545.jpg?c=1",
      },
    },
  ];
  const [country, setCountry] = useState([]);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountry(data);
      });
  }, []);
  const [selectedItem, setSelectedItem] = useState(null);
  const onSelect = (item) => {
    setSelectedItem(item);
  };
  return (
    <Dropdown
      data={country1}
      onSelect={onSelect}
      value={selectedItem}
    ></Dropdown>
  );
}
