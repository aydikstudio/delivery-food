import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

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
       },

  tableProducts: {
    marginTop: useTheme().spacing(5),
  }
}));

function MyOrder() {

  const {id} = useParams();
  const [order, setOrder] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrder()
  }, [])


  useEffect(() => {
    getOrders()
  }, [order])





  async function getOrder() {
    await axios
    .get("http://delivery-food/api/managedata.php", {
      params: {
        type: "getmyorder",
        token: localStorage.getItem("user_token"),
        name: id
      },
    })
    .then(function (response) {
      if(response.data != null) {
        setOrder(response.data[0]);
      }
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }



  async function getOrders() {
    await axios
    .get("http://delivery-food/api/managedata.php", {
      params: {
        type: "getmyorders",
        token: localStorage.getItem("user_token"),
        name: order.order_number
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
        <Zagalovok text={`Заказ №`+order.order_number} />
        <Paper elevation={3} className={classes.paper}>
        <Typography component="p" mt={2}><b>Сумма:</b> {order.summa} руб.</Typography>
        <Typography component="p" mt={2}><b>Способ оплаты:</b> {order.oplata == "cash" ? "Наличные" : "Безналичная оплата"}.</Typography>
        {order.change > 0 && <Typography component="p" mt={2}><b>Сдача:</b> {order.summa-order.change} руб.</Typography>}
        <Typography component="p" mt={2}><b>Адрес:</b> {order.address}.</Typography>
        <Typography component="p" mt={2}><b>Дополнительная информация:</b>{order.descriptions}.</Typography>
        </Paper>

        <TableContainer component={Paper} className={classes.tableProducts}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Наименование продукта</TableCell>
            <TableCell align="right">Кол-во</TableCell>
            <TableCell align="right">Цена за штуку</TableCell>
            <TableCell align="right">Общая стоимость</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length > 0 ? orders.map((row) => (
            <TableRow
              key={row.ordersdetail_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             
              <TableCell component="th" scope="row">
              <Link to={`/product/${row.productId}`}>{row.productName}</Link>
              </TableCell>
              <TableCell align="right">{row.count} шт.</TableCell>
              <TableCell align="right">{row.summa} руб.</TableCell>
              <TableCell align="right">{row.count * row.summa} руб.</TableCell>
          
              
            </TableRow>
          )) : "Нет данных"}
        </TableBody>
      </Table>
    </TableContainer>
      </Container>
     
    </>
  );
}

export default MyOrder;
