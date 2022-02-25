import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Container,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  TextField,
  Typography,
  IconButton,
  MenuIcon,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

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

function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    await axios
      .get(
        "http://delivery-food/api/managedata.php?type=allgetcategoriesbyparent"
      )
      .then((res) => {
        if (res.data != null) {
          setCategories(res.data);
        } 
      });
  }

  const classes = useStyles();

  return (
    <>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {categories.length > 0 ? categories.map((item) => {
              return (
                <Grid key={item.category_id} item  xs={12} sm={6} md={4}>
                  <Link to={`/category/${item.category_id}`} className={classes.categoryBlock}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={`http://delivery-food/api/img/categories/${item.img}`}
                        title="Image title"
                      />
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
              );
            }): "Нет данных"}
          </Grid>
        </Container>
        
      </main>
    </>
  );
}

export default Home;
