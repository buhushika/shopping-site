import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";

const parsePrice = (price) => {
  return parseFloat(price.replace("$", ""));
};

const CartDialog = ({ open, onClose, cartItems, onQuantityChange, onRemoveItem }) => {
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parsePrice(item.price);
      return total + price * item.quantity;
    }, 0);
  };

  const handleQuantityChange = (index, change) => {
    const newQuantity = cartItems[index].quantity + change;
    if (newQuantity >= 1) {
      onQuantityChange(index, newQuantity);
    }
  };

  const handleRemoveItem = (index) => {
    onRemoveItem(index); 
  };

  return (
    <Dialog open={open} onClose={onClose} sx={{ borderRadius: "10px" }}>
      <DialogTitle sx={{ bgcolor: "#f0f0f0", color: "#333", fontWeight: "bold" }}>
        Your Cart
      </DialogTitle>
      <DialogContent sx={{ bgcolor: "#f9f9f9", padding: 2, Height: "400px", overflowY: "auto" }}>
        {cartItems.length === 0 ? (
          <Typography variant="body1" color="textSecondary" align="center">
            No items in the cart.
          </Typography>
        ) : (
          cartItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                padding: 2,
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                boxShadow: 2,
              }}
            >
              <Typography sx={{ flexGrow: 1, fontWeight: "bold" }}>{item.name}</Typography>

              <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                <Button
                  onClick={() => handleQuantityChange(index, -1)}
                  sx={{ minWidth: "30px", padding: "4px", color: "#333", fontSize: "18px" }}
                >
                  <RemoveIcon />
                </Button>
                <Typography sx={{ mx: 2, fontWeight: "bold" }}>{item.quantity}</Typography>
                <Button
                  onClick={() => handleQuantityChange(index, 1)}
                  sx={{ minWidth: "30px", padding: "4px", color: "#333", fontSize: "18px" }}
                >
                  <AddIcon />
                </Button>
              </Box>

              <Typography sx={{ ml: 2, fontWeight: "bold", color: "#ff6f61" }}>
                ${parsePrice(item.price) * item.quantity}
              </Typography>

              <Button
                onClick={() => handleRemoveItem(index)}
                sx={{
                  ml: 2,
                  color: "#ff6f61",
                  fontSize: "20px",
                  "&:hover": { color: "#e55b50" },
                }}
              >
                <DeleteIcon />
              </Button>
            </Box>
          ))
        )}
        <Box sx={{ mt: 3, textAlign: "right", paddingRight: 2 }}>
          <Typography variant="h6" sx={{ color: "#333" }}>
            Total: <span style={{ color: "#ff6f61" }}>${getTotalPrice()}</span>
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ bgcolor: "#f0f0f0", padding: "10px 24px" }}>
        <Button onClick={onClose} sx={{ color: "#333", fontWeight: "bold" }}>
          Close
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#ff6f61",
            color: "white",
            "&:hover": { bgcolor: "#e55b50" },
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => alert("Proceed to checkout")}
        >
          <ShoppingCartIcon sx={{ mr: 1 }} />
          Checkout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CartDialog;
