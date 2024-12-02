import React, { useState } from "react";
import { useAuth } from "../login/AuthContext";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Slider,
  Box,
  InputAdornment,
  Container,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { productData } from "./productData";
import CartDialog from "./CartDialog";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("women");
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [openCartDialog, setOpenCartDialog] = useState(false);

  const handleAddToCart = (product) => {
    const uniqueId = `${product.category}-${product.id}`; 
    const existingItemIndex = cartItems.findIndex(
      (item) => item.uniqueId === uniqueId
    );
  
    if (existingItemIndex > -1) {
      const newCartItems = [...cartItems];
      newCartItems[existingItemIndex].quantity += 1;
      setCartItems(newCartItems);
    } else {
      setCartItems([
        ...cartItems,
        { ...product, quantity: 1, uniqueId }, 
      ]);
    }
  };
  

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity > 0) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[index].quantity = newQuantity;
      setCartItems(updatedCartItems);
    }
  };
  const handleRemoveItem = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1); 
    setCartItems(newCartItems); 
  };
  

  const toggleCartDialog = () => {
    setOpenCartDialog(!openCartDialog);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };
  const products = productData[selectedCategory] || [];

  const filteredProducts = products.filter((product) => {
    const price = parseInt(product.price.replace("$", ""), 10);
    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      price >= priceRange[0] &&
      price <= priceRange[1]
    );
  });
  

  return (
    <div>
      <AppBar position="static" sx={{ bgcolor: "#ff6f61" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            FashionHub
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" onClick={toggleCartDialog}>
              <Badge badgeContent={cartItems.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          bgcolor: "#ffe0dc",
          py: 1,
          position: "relative",
        }}
      >
        {["women", "men", "shoes", "accessories"].map((category) => (
          <Button
            key={category}
            onClick={() => handleCategoryChange(category)}
            sx={{
              mx: 1,
              color: "#ff6f61",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#ffccbc" },
            }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          py: 2,
          gap: 2,
        }}
      >
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: "80%", maxWidth: "400px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "300px",
          }}
        >
          <Typography variant="subtitle1" sx={{ color: "black" }}>
            Price
          </Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `$${value}`}
            min={0}
            max={100}
            step={5}
            sx={{
              width: "100%",
              color: "#ff6f61",
            }}
          />
        </Box>
      </Box>

      <Container sx={{ mt: 3 }}>
        {filteredProducts.length > 0 ? (
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card
                  sx={{
                    maxWidth: 345,
                    position: "relative",
                    overflow: "hidden",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      boxShadow: 5,
                      ".description, .addToCartButton": {
                        opacity: 1,
                        maxHeight: "100px",
                      },
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: "250px",
                      objectFit: "contain",
                    }}
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6" color="black">
                      {product.name}
                    </Typography>
                    <Typography variant="body1" color="black" sx={{ mt: 1 }}>
                      {product.price}
                    </Typography>
                    <Box
                      className="description"
                      sx={{
                        opacity: 0,
                        maxHeight: "0px",
                        overflow: "hidden",
                        transition: "all 0.3s",
                      }}
                    >
                      <Typography variant="body2" color="black">
                        {product.description}
                      </Typography>
                    </Box>
                    <Box
                      className="addToCartButton"
                      sx={{
                        opacity: 0,
                        maxHeight: "0px",
                        overflow: "hidden",
                        transition: "all 0.3s",
                        mt: 2,
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{ bgcolor: "#ff6f61", color: "white" }}
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", mt: 3 }}>
            No products found.
          </Typography>
        )}
      </Container>
      <CartDialog 
        open={openCartDialog} 
        onClose={toggleCartDialog} 
        cartItems={cartItems} 
        onQuantityChange={handleQuantityChange} 
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default Dashboard;
