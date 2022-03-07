import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

import {
  Container,
  Button,
  TextField,
  Typography,
  Popper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Avatar from "@mui/material/Avatar";
import { connect } from "react-redux";
import { countProductsBasket, fetchedProducts } from "../../redux/actions";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const useStyles = makeStyles((theme) => ({
  logo: {
    color: "#000",
    fontSize: "30px !important",
  },
  town: {
    fontSize: "13px !important",
    color: "#000",
  },
  voity: {
    "&:hover": {
      color: "#3c7a00 !important",
    },
  },
  searchInput: {
    "&:hover": {
      borderColor: "#3c7a00 !important",
    },
  },
  basket: {
    color: "#000",

    cursor: "pointer",
    fontSize: "40px !important",
  },
  basket_link: {
    textDecoration: "none",
    marginLeft: "10px",
  },
  img: {
    width: "50px",
  },
  popperSearchClose: {
    cursor: "pointer",
    float: "right",
    fontSize: "30px !important",
  },
}));

function Header(props) {
  const [phone, setPhone] = useState();
  const [openAuth, setOpenAuth] = useState(false);
  const [search, setSearch] = useState("");
  const [anchorEl1, setAnchorEl1] = useState(null);
  const open1 = Boolean(anchorEl1);
  const [searchCategories, setSearchCategories] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [step, setStep] = useState(1);
  const [code, setCode] = useState('');
  const [codeVerify, setCodeVerifyCode] = useState('');

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const handleClickOpen = () => {
    setOpenAuth(true);
  };

  const handleClose = () => {
    setOpenAuth(false);
  };

  useEffect((e) => {
    props.fetchedProducts(props.syncBasket);
    getCategories();
  }, []);

  const closeSearchPopper = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = async (event) => {
    setSearch(event.target.value);
    if (event.target.value.length > 0) {
      setAnchorEl(event.currentTarget);
      await axios
        .get("http://delivery-food/api/managedata.php", {
          params: {
            type: "search",
            text: event.target.value,
          },
        })
        .then(function (response) {
          setSearchCategories(response.data[1]);
          setSearchProducts(response.data[0]);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setAnchorEl(null);
    }
  };

  const checkActiveSearch = (e) => {
    setAnchorEl(null);
  };

  const handleChangePhone = (value) => {
    setPhone(value.replace(/\D/g, ""));
  };

  const handleAuth = async () => {
    if(code == codeVerify) {
      if (phone.length > 0) {
        await axios
          .get("http://delivery-food/api/managedata.php", {
            params: {
              type: "login",
              phone: phone,
            },
          })
          .then(function (response) {
            localStorage.setItem("user_token", response.data);
            window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } else {
      alert("Неверные последние четыре цифры из входящего номера");
    }
   
  };

  const clearStorage = () => {
    localStorage.removeItem("user_token");
    window.location.reload();
  };


  async function getCategories() {
    await axios
    .get("http://delivery-food/api/managedata.php", {
      params: {
        type: "allgetcategories",
      },
    })
    .then(function (response) {
      setCategories(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  async function sendCode() {
    
    const formData = new FormData();
    formData.append("user", "aydikstudio");
    formData.append("pass", "aydikxtvgbjystudiogreensms");
    formData.append("to", phone);

    await axios
      .post("https://api3.greensms.ru/voice/send", formData)
      .then(function (response) {
        setCodeVerifyCode(response.data.code)
      })
      .catch(function (error) {
        console.log(error);
      });
   
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <>
      <AppBar
        sx={{ flexGrow: 1 }}
        position="fixed"
        style={{ background: "#fff" }}
      >
        <Container maxWidth="x2">
          <Toolbar>
            <Link to="/">
              <Typography className={classes.logo}>Logo</Typography>
            </Link>
            <Typography ml={2} mr={2} className={classes.town}>
              Доставка продуктов <br />
              по Буйнакску
            </Typography>

            <TextField
              autoComplete="off"
              name="search"
              aria-describedby={id}
              className={classes.searchInput}
              placeholder="Найти"
              sx={{ flexGrow: 0.25 }}
              onChange={handleClick}
            />
            <Popper
              name="poppersearch"
              onBlur={(e) => checkActiveSearch(e)}
              id={id}
              open={open}
              anchorEl={anchorEl}
              style={{ width: "500px", zIndex: 10000 }}
            >
              <Box
                sx={{ boxShadow: "0 0 5px", p: 1, bgcolor: "background.paper" }}
                mt={2}
              >
                <CloseIcon
                  className={classes.popperSearchClose}
                  onClick={() => closeSearchPopper()}
                />
                {searchProducts.map((item) => {
                  {console.log(item)}
                  return (
                    <Link
                    to={`/product/${item.productId}`}
                    style={{ textDecoration: "none", color: "#000" }}
                    onClick={checkActiveSearch}
                  >
                    <Box sx={{ display: "flex" }} mt={3}>
                      <Box>
                        <img
                          src={
                            `http://delivery-food/api/img/products/${item.img}`
                          }
                          className={classes.img}
                        />
                        <Typography>Продукты</Typography>
                      </Box>
                      <Box mt={2} ml={10}>
                        <Typography>{item.productName}</Typography>
                        <Typography>{categories.find((item1) => item1.category_id == item.category_id).name}</Typography>
                      </Box>
                    </Box>
                  </Link>
                  )
                })}
               
                {searchCategories.map((item) => {
                  return (
                    <Link
                      to={`/category/${item.category_id}`}
                      style={{ textDecoration: "none", color: "#000" }}
                      onClick={checkActiveSearch}
                    >
                      <Box sx={{ display: "flex" }} mt={3}>
                        <Box>
                         {item.img && (<img
                            src={
                              `http://delivery-food/api/img/categories/${item.img}`
                            }
                            className={classes.img}
                          />)} 
                          <Typography>Категория</Typography>
                        </Box>
                        <Box mt={2} ml={10}>
                          <Typography>{item.name}</Typography>
                        </Box>
                      </Box>
                    </Link>
                  );
                })}

                <Link
                  to={`/search/${search}`}
                  style={{ textDecoration: "none", color: "#000" }}
                  onClick={checkActiveSearch}
                >
                  <Typography mt={5} style={{ textAlign: "center" }}>
                    Все результаты
                  </Typography>
                </Link>
              </Box>
            </Popper>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Link to="/basket" className={classes.basket_link}>
              <ShoppingBasketIcon className={classes.basket} />
              <Typography color="#000" mr={10}>
                {props.syncCount} руб
              </Typography>
            </Link>
            {!localStorage.getItem("user_token") ? (
              <Button
                variant="text"
                style={{ color: "#000" }}
                ml={2}
                className={classes.voity}
                onClick={handleClickOpen}
              >
                Войти
              </Button>
            ) : (
              <>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick1}
                >
                  <Avatar>Я</Avatar>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl1}
                  open={open1}
                  onClose={handleClose1}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <Link to="/myorders" style={{color: "#000", textDecoration: "none"}}><MenuItem>Мои заказы</MenuItem></Link>
                  <Link to="/mydata" style={{color: "#000", textDecoration: "none"}}><MenuItem>Мои данные</MenuItem></Link>
                  <MenuItem onClick={(e) => clearStorage()}>Выйти</MenuItem>
                </Menu>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Dialog
        open={openAuth}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Войти"}</DialogTitle>
        {step == 1 ? (
          <div>
          <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              placeholder="79999999999"
              value={phone}
              onChange={(e) => handleChangePhone(e.target.value)}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </DialogContentText>
          <Link to="/agree" target="_blank" style={{fontSize: '8px', color: "#adadad" , textAlign: "center"}}>
        НАЖИМАЯ КНОПКУ «ВОЙТИ»,<br/> Я ДАЮ СВОЕ СОГЛАСИЕ НА ОБРАБОТКУ
        <br/> МОИХ ПЕРСОНАЛЬНЫХ ДАННЫХ.
        </Link>

        </DialogContent>
         <DialogActions>
         <Button
           onClick={handleClose}
           variant="text"
           style={{ color: "#000" }}
         >
           Закрыть
         </Button>
         <Button
           color="success"
           variant="contained"
           onClick={(e) => sendCode()}
           disabled={phone ? false : true}
         >
           Войти
         </Button>
       </DialogActions>
       </div>
        ): (
          <div>
          <DialogContent style={{marginTop: "-25px"}}>
            <p>Введите <b>последние четыре цифры</b> из <b>входящего номера</b> </p>
          <DialogContentText id="alert-dialog-description">
            <TextField
              placeholder="Введите код из смс"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </DialogContentText>

        </DialogContent>
        <DialogActions>
        <Button
          onClick={(e) => setStep(1)}
          variant="text"
          style={{ color: "#000" }}
        >
          Назад
        </Button>
        <Button
          color="success"
          variant="contained"
          onClick={handleAuth}
          disabled={code ? false : true}
        >
          Войти
        </Button>
      </DialogActions>
      </div>
        )}
        

       
      </Dialog>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    syncBasket: state.basket.basket,
    syncCount: state.basket.count,
    syncProducts: state.basket.fetchedProducts,
  };
};

const mapDispatchToProps = {
  countProductsBasket,
  fetchedProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
