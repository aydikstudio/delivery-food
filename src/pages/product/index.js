import {useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import {
  Container,
  Grid,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { connect } from "react-redux";
import { updatedBasket, countProductsBasket, fetchedProducts} from "../../redux/actions";
import Zagalovok from "../../components/zagalovok";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    marginTop: useTheme().spacing(15),
  },

  img: {
    width: "200px",
  },
  paper: {
    padding: useTheme().spacing(3),
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
}));

function Product(props) {
    const params = useParams();
     const prodId = params.id || -1;
 
    
    
      const [product, setProduct] = useState({});

   
      useEffect(() => {
        getArrayofProducts()
      }, [])
  
 
      async function getArrayofProducts() {
        await axios
        .get(
          "http://delivery-food/api/managedata.php?type=getproductbyid&id="+prodId
        )
        .then((res) => {
          if (res.data != null) {
            setProduct(res.data[0]);
          } 
        });
      }
      
      
      
      
      
      
      const clickToBasket = (productId) => {
        let oldBasket = props.syncBasket;
        if(!oldBasket.some(
          (item2) => item2.productId == productId
        )) {
          oldBasket.push({
            productId,
            count: 1,
          });
      
          props.updatedBasket(oldBasket);
          props.fetchedProducts(oldBasket);
        } 
      };
      
      const changeCountProduct = (productId, typeMove) => {
        let oldBasket = props.syncBasket;
        let newBasket = [];
      
        if(!oldBasket.some(
          (item) => item.productId == item.productId
        )) {
          oldBasket.push({
            productId,
            count: 1,
          });
        } else {
        
            newBasket = oldBasket.map((item) => {
              if(item.productId == productId) {
                
                if(typeMove == "minus" && item.count > 0) {
                  item.count--;
                  if(item.count > 0) {
                    return item;
                  }
    
                  if(item.count <= 0) {
                     return null;
                  }
                  
                }
      
                if(typeMove == "plus" ) {
                  item.count++;
                  return item;
                }
    
      
              } else {
                return item;
              }
    
              
    
    
            }).filter((item) => item != null)
        } 
      
      
        props.updatedBasket(newBasket);
        props.fetchedProducts(newBasket);
      }
      


    


  const classes = useStyles();

  return (
    <>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Zagalovok text={product.productName} />
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              {product.img && <img className={classes.img}  src={`http://delivery-food/api/img/products/${product.img}`} /> }
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <Paper elevation={3} className={classes.paper}>
                <Typography component="p">
                  <b>Описание:</b> 0,93 л.
                </Typography>
                <div className={classes.actionsButtons}>
                {!props.syncBasket.some(
                      (item1) => item1.productId == product.productId
                    ) ? (
                      <Button
                        variant="contained"
                        className={classes.addToBasket}
                        onClick={() => clickToBasket(product.productId)}
                      >
                        В корзину
                      </Button>
                    ) : (
                      <Box mt={2}>
                        <RemoveIcon
                          style={{ marginRight: "20px", cursor: "pointer" }}
                          onClick={() =>
                            changeCountProduct(product.productId, "minus")
                          }
                        />
                        <span style={{ position: "relative", bottom: "5px" }}>
                          {props.syncBasket.map((item1) => {
                            if (item1.productId == product.productId) {
                              return item1.count;
                            }
                          })}
                        </span>
                        <AddIcon
                          style={{ marginLeft: "20px", cursor: "pointer" }}
                          onClick={() =>
                            changeCountProduct(product.productId, "plus")
                          }
                        />
                      </Box>
                    )}
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
}


const mapDispatchToProps = {
  updatedBasket,
  fetchedProducts
};

const mapStateToProps = (state) => {
  return {
    syncBasket: state.basket.basket,
    syncCount: state.basket.count,
    syncProducts: state.basket.fetchedProducts

  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Product);
