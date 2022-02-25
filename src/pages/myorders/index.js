import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import { Link } from "react-router-dom";


import axios from "axios";
import {
  Container,
  FormControl,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

import Zagalovok from "../../components/zagalovok";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: useTheme().spacing(3),
  },
  cardGrid: {
    marginTop: useTheme().spacing(15),
  },
  block: {
    marginTop: useTheme().spacing(5),
       }
}));

function MyOrders() {
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    getOrders()
  }, []);


  async function getOrders() {
    await axios
    .get("http://delivery-food/api/managedata.php", {
      params: {
        type: "getorders",
        token: localStorage.getItem("user_token")
      },
    })
    .then(function (response) {
      if(response.data != null) {
        setOrders(response.data);
      }
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const classes = useStyles();

  return (
    <>
      <Container className={classes.cardGrid} maxWidth="md">
        <Zagalovok text="Заказы" />
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Номер заказа</TableCell>
            <TableCell align="right">Сумма</TableCell>
            <TableCell align="right">Оплата</TableCell>
            <TableCell align="right">Статус</TableCell>
            <TableCell align="right">Дата и время</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length > 0 ? orders.map((row) => (
            <TableRow
              key={row.order_number}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             
              <TableCell component="th" scope="row">
              <Link to={`/myorder/${row.order_id}`}>{row.order_number}</Link>
              </TableCell>
              <TableCell align="right">{row.summa} руб.</TableCell>
              <TableCell align="right">{row.oplata == "cash" ? "Наличные" : "Безналичная оплата"}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              
              <TableCell align="right">{row.date+ " "+row.time}</TableCell>
              
            </TableRow>
          )) : "Нет данных"}
        </TableBody>
      </Table>
    </TableContainer>
      </Container>
    </>
  );
}

export default MyOrders;
