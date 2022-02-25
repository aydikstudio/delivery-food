import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import {
  Container,
  Grid,
  Button,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";
import axios from "axios";

import Zagalovok from "../../components/zagalovok";

const useStyles = makeStyles((theme) => ({
  block: {
    textDecoration: "none",
  },
}));

function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await axios
      .get("http://delivery-food/api/managedata.php", {
        params: {
            type: "getdata",
            token: localStorage.getItem("user_token"),
        },
      })
      .then(function (res) {
            console.log(res.data);
            if(res.data[0].email != null) {
                setEmail(res.data[0].email);
            }

            if(res.data[0].name != null) {
                setName(res.data[0].name);
            }
      }).catch(function (error) {
        console.log(error);
      });;
  }

  async function updateData() {
    const formData = new FormData();
    formData.append("type", "updateddatasettings");
    formData.append("token", localStorage.getItem("user_token"));
    formData.append("email", email);
    formData.append("name", name);
    await axios
      .post("http://delivery-food/api/managedata.php", formData)
      .then(function (response) {
        if(response.data == "yes") {
            alert("Данные обновлены");
        }
      }).catch(function (error) {
        console.log(error);
      });
  }

  const classes = useStyles();

  return (
    <>
      <Container className={classes.cardGrid} maxWidth="md">
        <Zagalovok text="Мои данные" />

        <Grid container spacing={4}>
        <Grid md={12}>
        <FormControl
          fullWidth
          style={{ marginTop: "30px", marginBottom: "30px" }}
        >
          <TextField
            placeholder="Введите имя"
            value={name}
            className={classes.input}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        </Grid>
        <Grid md={12}>
        <FormControl
          fullWidth
          style={{ marginTop: "30px", marginBottom: "30px" }}
        >
          <TextField
            placeholder="Введите email"
            value={email}
            className={classes.input}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        </Grid>
        <Grid md={12}>
        <Button
          variant="contained"
          color="success"
          style={{
            width: "100%",
            backgroundColor: "#d6b608",
            marginTop: "50px",
          }}
          onClick={(e) => updateData()}
        >
          Сохранить
        </Button>
        </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Settings;
