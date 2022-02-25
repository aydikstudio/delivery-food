import { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

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
import axios from "axios";
import Zagalovok from "../../components/zagalovok";

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
  categoryBlockFooter: {
    color: "#000",
  },
  
}));

function Search() {
  const [searchCategories, setSearchCategories] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);

  const {search} = useParams();

  useEffect(() => {
    getSearch()
  }, [])

  async function getSearch() {
    await axios
    .get("http://delivery-food/api/managedata.php", {
      params: {
        type: "allsearch",
        text: search,
      },
    })
    .then(function (response) {
      setSearchCategories(response.data[1]);
      setSearchProducts(response.data[0]);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const classes = useStyles();

  return (
    <>
      <Container className={classes.cardGrid} maxWidth="md">
        <Zagalovok text="Поиск" />
        {searchCategories.length > 0 && <Typography component={"h2"}>Каталоги</Typography>}
        <Grid container spacing={4} mt={1}>
          {searchCategories.length > 0 && searchCategories.map((item) => {
            return (
              <Grid item xs={12} sm={6} md={4}>
            <Link to={`/category/${item.category_id}`} className={classes.categoryBlock}>
              <Card className={classes.card}>
                {item.img && (
                  <CardMedia
                  className={classes.cardMedia}
                  image={
                    `http://delivery-food/api/img/categories/${item.img}`
                  }
                  title="Image title"
                />
                )}
                <CardContent className={classes.CardContent}>
                  <Typography
                    gutterBottom
                    align="center"
                    className={classes.categoryBlockFooter}
                  >
                    {item.name}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
            )
          })}
          
        </Grid>
       
        {searchProducts.length > 0 &&  <Typography component={"h2"} mt={10}>Продукты</Typography>}
        <Grid container spacing={4} mt={1}>
          {searchProducts.length > 0 && searchProducts.map((item) => {
            return (
<Grid item xs={12} sm={6} md={4}>
            <Link to={`/product/${item.productId}`} className={classes.categoryBlock}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={`http://delivery-food/api/img/products/${item.img}`}
                  style={{height: "50px",}}
                  title="Image title"
                />
                <CardContent className={classes.CardContent}>
                  <Typography
                    gutterBottom
                    align="center"
                    className={classes.categoryBlockFooter}
                  >
                    {item.productName}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
            )
          })}
          
        </Grid>
      </Container>
    </>
  );
}

export default Search;
