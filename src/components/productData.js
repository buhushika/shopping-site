import dress from "../Images/dress.png";
import blouse from "../Images/blouse.png";
import skirt from "../Images/skirt.png";
import jacket from "../Images/jacket.png";
import shirt from "../Images/shirt.png";
import jeans from "../Images/jeans.png";
import sweater from "../Images/sweater.png";
import sneakers from "../Images/sneakers.png";
import slippers from "../Images/slippers.png";
import boots from "../Images/boots.png";
import sunglasses from "../Images/sunglasses.png";
import hat from "../Images/hat.png";
import watch from "../Images/watch.png";


export const productData = {
  women: [
    {
      id: 1,
      name: "Dress",
      category: "women",
      price: "$40",
      description: "A beautiful dress for any occasion",
      image: dress,
    },
    {
      id: 2,
      name: "Top",
      category: "women",
      price: "$25",
      description: "A stylish top perfect for casual wear",
      image: blouse,
    },
    {
      id: 3,
      name: "Skirt",
      category: "women",
      price: "$30",
      description: "A chic skirt for everyday use",
      image: skirt,
    },
    {
      id: 4,
      name: "Jacket",
      category: "women",
      price: "$50",
      description: "A warm jacket for the cold season",
      image: jacket,
    },
  ],
  men: [
    {
      id: 1,
      name: "Shirt",
      category: "men",
      price: "$40",
      description: "A comfortable shirt for casual outings",
      image: shirt,
    },
    {
      id: 2,
      name: "Denim Jeans",
      category: "men",
      price: "$60",
      description: "Stylish denim jeans for a modern look",
      image: jeans,
    },
    {
      id: 3,
      name: "Sweater",
      category: "men",

      price: "$45",
      description: "A cozy sweater perfect for winter",
      image: sweater,
    },
  ],
  shoes: [
    {
      id: 1,
      name: "Sneakers",
      category: "shoes",
      price: "$40",
      description: "Comfortable sneakers for everyday wear",
      image: sneakers,
    },
    {
      id: 2,
      name: "Slippers",
      category: "shoes",
      price: "$25",
      description: "Cozy slippers for indoor use",
      image: slippers,
    },
    {
      id: 3,
      name: "Boots",
      category: "shoes",
      price: "$60",
      description: "Durable boots for outdoor activities",
      image: boots,
    },
  ],
  accessories: [
    {
      id: 1,
      name: "Sunglasses",
      category: "accessories",
      price: "$30",
      description: "Stylish sunglasses for sunny days",
      image: sunglasses,
    },
    {
      id: 2,
      name: "Hat",
      category: "accessories",
      price: "$20",
      description: "A fashionable hat for outdoor events",
      image: hat,
    },
    {
      id: 3,
      name: "Watch",
      category: "accessories",
      price: "$80",
      description: "A classic watch to complete your outfit",
      image: watch,
    },
  ],
};