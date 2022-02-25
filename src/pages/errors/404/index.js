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
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

import Zagalovok from "../../../components/zagalovok";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: useTheme().spacing(3),
  },
  cardGrid: {
    marginTop: useTheme().spacing(15),
  },
}));

function Error_404() {


  const classes = useStyles();

  return (
    <>
      <Container className={classes.cardGrid} maxWidth="md">
        <Zagalovok text="Ошибка 404." />
        <Paper elevation={3} className={classes.paper}>
          <Typography component="h1">Не найдена страница.</Typography>
          
        </Paper>
      </Container>
    </>
  );
}

export default Error_404;
