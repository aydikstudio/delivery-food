import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import { Link } from "react-router-dom";

import {
  Container,
  FormControl,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import Fab from "@mui/material/Fab";
import { connect } from "react-redux";
import {
  updatedBasket,
  countProductsBasket,
  fetchedProducts,
} from "../../redux/actions";

import Zagalovok from "../../components/zagalovok";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    marginTop: useTheme().spacing(15),
  },
  input: {
    padding: useTheme().spacing(2),
  },
}));

function MakeOver(props) {
  const [ready, setReady] = useState(false);
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("cash");
  const [change, setChange] = useState("");
  const [description, setDescription] = useState("");
  const [descriptions, setDescriptions] = useState([]);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    getAddress();
    getDescriptions();
  }, []);

  if (!props.syncBasket || !localStorage.getItem("user_token")) {
    window.location.assign("/");
  }

  const handleChange = (event, newAlignment) => {
    setPayment(newAlignment);
  };

  const classes = useStyles();

  let changeBlock;

  if (payment == "cash") {
    changeBlock = (
      <div>
        <FormControl style={{ marginTop: "30px" }}>
          <TextField
            onChange={(e) => setChange(e.target.value)}
            aria-describedby="my-helper-text"
            placeholder="С какой суммы сдача?"
            className={classes.input}
          />
        </FormControl>{" "}
        {change > props.syncCount && (
          <Typography>Сдача: {change - props.syncCount} руб.</Typography>
        )}{" "}
      </div>
    );
  }

  useEffect(() => {
    if (address.length > 0) {
      setReady(true);
    } else {
      setReady(false);
    }
  }, [address]);

  function setAddressChoose(value) {
    setAddress(value);
  }


  function setDescriptionChoose(value) {
    setDescription(value);
  }


  async function finishOrder() {
    const formData = new FormData();
    formData.append("type", "finishorder");
    formData.append("payment", payment);
    formData.append("change", change);
    formData.append("summa",  props.syncCount);
    formData.append("type", "finishorder");
    formData.append("address", address);
    formData.append("description", description);
    formData.append("basket", JSON.stringify(props.syncBasket));
    formData.append("token", localStorage.getItem("user_token"));
    await axios
      .post("http://delivery-food/api/managedata.php", formData)
      .then(function (response) {
        if(response.data == "yes") {
          localStorage.removeItem("basket");
          window.location.assign("/myorders");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  

  async function getAddress() {
    await axios
      .get("http://delivery-food/api/managedata.php", {
        params: {
          type: "getaddress",
          token: localStorage.getItem("user_token"),
        },
      })
      .then(function (response) {
       
        if(response.data != null) {
         
          setAddresses(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  async function getDescriptions() {
    await axios
      .get("http://delivery-food/api/managedata.php", {
        params: {
          type: "getdescriptions",
          token: localStorage.getItem("user_token"),
        },
      })
      .then(function (response) {
        if(response.data != null) {
          setDescriptions(response.data);
        }
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }




  return (
    <>
      <Container className={classes.cardGrid} maxWidth="md">
        <Zagalovok text="Оформление заказа" />

        <FormControl
          fullWidth
          style={{ marginTop: "10px", marginBottom: "30px" }}
        >
          <TextField
            placeholder="Введите адрес*"
            value={address}
            className={classes.input}
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormControl>
       {addresses.length > 0 && <Box mb={3}>
          {addresses.length > 0 &&
            addresses.map((item) => {
              return (
                <Fab
                  onClick={(e) => setAddressChoose(item.address)}
                  variant="extended"
                  style={{ minwidth: "100px", minheight: "100px", marginRight: "20px" }}
                >
                  {item.address}
                </Fab>
              );
            })}
        </Box>} 
        <ToggleButtonGroup
          color="primary"
          value={payment}
          exclusive
          onChange={handleChange}
          style={{ marginTop: "20px" }}
        >
          <ToggleButton value="cash">Наличными</ToggleButton>
          <ToggleButton value="carta">Оплата картой</ToggleButton>
        </ToggleButtonGroup>
        {changeBlock}

        <FormControl
          fullWidth
          style={{ marginTop: "30px", marginBottom: "30px" }}
        >
          <TextField
            size="medium"
            placeholder="Дополнительная информация"
            className={classes.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        {descriptions.length > 0 && <Box mb={3}>
          {descriptions.length > 0 &&
            descriptions.map((item) => {
              return (
                <Fab
                  onClick={(e) => setDescriptionChoose(item.descriptions)}
                  variant="extended"
                  style={{ minwidth: "100px", minheight: "100px",  marginRight: "20px" }}
                >
                  {item.descriptions}
                </Fab>
              );
            })}
        </Box>} 
        
      
        <Button
          variant="contained"
          color="success"
          style={{
            width: "100%",
            backgroundColor: "#d6b608",
            marginTop: "50px",
          }}
          disabled={!ready ? true : false}
          onClick={() => finishOrder()}
        >
          Оформить заказ
        </Button>
      </Container>
    </>
  );
}

const mapDispatchToProps = {
  updatedBasket,
  countProductsBasket,
  fetchedProducts,
};

const mapStateToProps = (state) => {
  return {
    syncBasket: state.basket.basket,
    syncCount: state.basket.count,
    syncProducts: state.basket.fetchedProducts,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MakeOver);
