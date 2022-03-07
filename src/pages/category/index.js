import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { updatedBasket, countProductsBasket, fetchedProducts } from "../../redux/actions";

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
  Fab,
  Pagination,
  PaginationItem
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import Zagalovok from "../../components/zagalovok";
// import Pagination from "../../components/pagination";

const useStyles = makeStyles((theme) => ({
  cardMedia: {
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 1,
  },
  cardGrid: {
    marginTop: useTheme().spacing(15),
  },
  categoryBlock: {
    color: "#000",
    textDecoration: "none",
  },
  productName: {
    color: "#000",
  },
  productPrice: {
    color: "#000",
    fontWeight: "bold !important",
  },
  actionsButtons: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  addToBasket: {
    backgroundColor: "#3c7a00 !important",
  },
  zagalovok: {
    marginTop: "20px",
    marginBottom: "50px",
    color: "#c6c6c6",
  },
}));

function Category(props) {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [salePerPage] = useState(20);
  const [currentCategory, setCurrentCategory] = useState({});

  useEffect(() => {
    getArrayofProducts();
    getSubcategories();
    getcategorybyid();
  }, []);



  async function getcategorybyid() {
    await axios
    .get(
      "http://delivery-food/api/managedata.php?type=getcategoriesbyid&id=" +
        id
    )
    .then((res) => {
      if (res.data != null) {
        setCurrentCategory(res.data[0]);
      }
    });
}



  async function getSubcategories() {
    await axios
    .get(
      "http://delivery-food/api/managedata.php?type=allgetsubcategories&id=" +
        id
    )
    .then((res) => {
      if (res.data != null) {
        setSubcategories(res.data);
      }
    });
}
  
  

  async function getArrayofProducts() {
    await axios
      .get(
        "http://delivery-food/api/managedata.php?type=allgetproductsbyidcategories&id=" +
          id
      )
      .then((res) => {
        if (res.data != null) {
          setProducts(res.data);
        }
      });
  }

  const clickToBasket = (productId) => {
    let oldBasket = props.syncBasket;
    if (!oldBasket.some((item2) => item2.productId == productId)) {
      oldBasket.push({
        productId,
        count: 1,
      });

     
          props.updatedBasket(oldBasket);
          props.fetchedProducts(oldBasket);
    }
  };

  const changeCountProduct = (productId, typeMove) => {
    let newBasket = [];

    if (!props.syncBasket.some((item) => item.productId == item.productId)) {
      props.syncBasket.push({
        productId,
        count: 1,
      });
    } else {
      newBasket = props.syncBasket
        .map((item) => {
          if (item.productId == productId) {
            if (typeMove == "minus" && item.count > 0) {
              item.count--;
              if (item.count > 0) {
                return item;
              }

              if (item.count <= 0) {
                return null;
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



  const lastShipmentIndex = currentPage * salePerPage;
  const firstShipmentIndex = lastShipmentIndex - salePerPage;
  const currentShipment = products.slice(
    firstShipmentIndex,
    lastShipmentIndex
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const classes = useStyles();



  return (
    <>
      <Container className={classes.cardGrid} maxWidth="md">
        <Zagalovok text={currentCategory.name} />
        {subcategories.length > 0 && <Box mb={5}>
          {subcategories.length > 0 &&
           subcategories.map((item) => {
              return (
                <a href={`/category/${item.category_id}`} style={{textDecoration: "none"}}><Fab
                  variant="extended"
                  style={{ minwidth: "100px", minheight: "100px" }}
                >
                  {item.name}
                </Fab></a>
              );
            })}
        </Box>} 
        <Grid container spacing={4}>
          {currentShipment.length > 0
            ?currentShipment.map((item) => {
                return (
                  <Grid key={item.productId} item xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <Link
                        to={`/product/${item.productId}`}
                        className={classes.categoryBlock}
                      >
                        <CardMedia
                          className={classes.cardMedia}
                          image={`http://delivery-food/api/img/products/${item.img}`}
                          sx={{ height: "50px" }}
                        />
                        <CardContent className={classes.CardContent}>
                          <Typography
                            gutterBottom
                            align="center"
                            className={classes.productName}
                          >
                            {item.productName}
                          </Typography>
                          <Typography
                            gutterBottom
                            align="center"
                            className={classes.productPrice}
                          >
                            {item.price} руб.
                          </Typography>
                        </CardContent>
                      </Link>
                      <CardActions className={classes.actionsButtons}>
                        {!props.syncBasket.some(
                          (item1) => item1.productId == item.productId
                        ) ? (
                          <Button
                            variant="contained"
                            className={classes.addToBasket}
                            onClick={() => clickToBasket(item.productId)}
                          >
                            В корзину
                          </Button>
                        ) : (
                          <Box mt={2}>
                            <RemoveIcon
                              style={{ marginRight: "20px", cursor: "pointer" }}
                              onClick={() =>
                                changeCountProduct(item.productId, "minus")
                              }
                            />
                            <span
                              style={{ position: "relative", bottom: "5px" }}
                            >
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
                          </Box>
                        )}
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })
            : "Нет данных"}
             
        </Grid>
        <Grid container mt={15}>
        <Pagination count={products.length} renderItem={(item) => (
    <PaginationItem
      {...item}
      onClick={(e) => paginate(item.page)}
    />
  )}/>
        </Grid>

      </Container>
    </>
  );
}

const mapDispatchToProps = {
  updatedBasket,
  countProductsBasket,
  fetchedProducts
};

const mapStateToProps = (state) => {
  return {
    syncBasket: state.basket.basket,
    syncCount: state.basket.count,
    syncProducts: state.basket.fetchedProducts
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
