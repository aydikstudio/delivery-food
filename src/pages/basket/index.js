import { useState, useEffect } from "react";

import { Routes, Route, Link } from "react-router-dom";

import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { connect } from "react-redux";
import { updatedBasket, fetchedProducts } from "../../redux/actions";
import Zagalovok from "../../components/zagalovok";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    marginTop: useTheme().spacing(15),
  },
  basketCard: {
    cursor: "pointer",
    minHeight: "90px",
    marginBottom: useTheme().spacing(3),
    transition: "box-shadow 0.3s ease-out 0.3s",
    marginLeft: useTheme().spacing(2),
    padding: useTheme().spacing(1),
  },
  basketImg: {
    width: "100px",
  },
  basketClose: {
    fontSize: "30px !important",
    cursor: "pointer",
    "&:hover": {
      color: "#b60000",
    },
  },
}));

function Basket(props) {


  useEffect(() => {
    props.fetchedProducts(props.syncBasket)
  }, [])







  const changeCountProduct = (productId, typeMove) => {
    let oldBasket = props.syncBasket;
    let newBasket = [];

    if (!oldBasket.some((item) => item.productId == item.productId)) {
      oldBasket.push({
        productId,
        count: 1,
      });
    } else {
      newBasket = oldBasket
        .map((item) => {
          if (item.productId == productId) {
            if (typeMove == "minus" && item.count > 0) {
              if (item.count > 1) {
                item.count--;
                return item;
              }

              if (item.count <= 1) {
                if (window.confirm("Удалить товар?")) {
                  item.count--;
                  return null;
                } else {
                  return item;
                }
              }
            }

            if (typeMove == "plus") {
              item.count++;
              return item;
            }
          } else {
            return item;
          }
        })
        .filter((item) => item != null);
    }

    props.updatedBasket(newBasket);
    props.fetchedProducts(newBasket);
  };



  function deleteItem(productId) {
    let oldBasket = props.syncBasket;

    let newBasket = oldBasket
      .map((item) => {
        if (item.productId == productId) {
          if (window.confirm("Удалить товар?")) {
            item.count--;
            return null;
          } else {
            return item;
          }
        } else {
          return item;
        }
      })
      .filter((item) => item != null);


      props.updatedBasket(newBasket);
      props.fetchedProducts(newBasket);
  }




  function onClickMakeOver() {
    if(localStorage.getItem("user_token")) {
      window.location.assign("/makeover");
    } else {
      alert("Необходимо войти");
    }
  }




  const classes = useStyles();
  return (
    <>
      <Container className={classes.cardGrid} maxWidth="md">
        <Zagalovok text="Корзина" />
        <Grid container spacing={2}>
          { props.syncBasket.length > 0 && props.syncProducts.length > 0
            ? props.syncBasket.map((item) => {
                let product =props.syncProducts.filter(
                  (item1) => item1.productId == item.productId
                )[0];
                return (
                  <Grid
                    key={item}
                    item={true}
                    xs={12}
                    className={classes.basketCard}
                  >
                    <Grid item={true} container spacing={2} align="center">
                      <Grid item={true} md={3} xs={12}>
                      <Link to={`/product/${product.productId}`}><img src={`http://delivery-food/api/img/products/${product.img}`} className={classes.basketImg} /></Link>
                        <Typography className={classes.basketName}>
                          {product.productName}
                        </Typography>
                      </Grid>
                      <Grid item={true} md={1}></Grid>
                      <Grid
                        item={true}
                        md={4}
                        xs={12}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <RemoveIcon
                          style={{ marginRight: "20px", cursor: "pointer" }}
                          onClick={() =>
                            changeCountProduct(item.productId, "minus")
                          }
                        />
                        <span style={{ position: "relative", bottom: "5px" }}>
                          {props.syncBasket.map((item1) => {
                            if (item1.productId == item.productId) {
                              return item1.count;
                            }
                          })}
                        </span>
                        <AddIcon
                          style={{ marginLeft: "20px", cursor: "pointer" }}
                          onClick={() =>
                            changeCountProduct(item.productId, "plus")
                          }
                        />
                      </Grid>
                      <Grid
                        item={true}
                        md={3}
                        xs={12}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontWeight: "500",
                          justifyContent: "center",
                        }}
                      >
                        {item.count * product.price} руб.
                      </Grid>
                      <Grid
                        item={true}
                        md={1}
                        xs={12}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CloseIcon
                          className={classes.basketClose}
                          onClick={() => deleteItem(item.productId)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })
            : "Нет записей"}
        </Grid>

        <Grid item={true} container mt={10} textAlign="center">
          <Grid item={true} md={12} xs={12}>
            <Button
              variant="contained"
              color="success"
              style={{ width: "100%", backgroundColor: "#d6b608" }}
              disabled={props.syncBasket.length > 0 ? false : true}
              onClick={() => onClickMakeOver()}
            >
              Продолжить. Общая стоимость: {props.syncCount} руб.
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const mapDispatchToProps = {
  updatedBasket,
  fetchedProducts,
};

const mapStateToProps = (state) => {
  return {
    syncBasket: state.basket.basket,
    syncCount: state.basket.count,
    syncProducts: state.basket.fetchedProducts
  };
};




export default  connect(mapStateToProps, mapDispatchToProps)(Basket);
