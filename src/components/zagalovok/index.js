import { Typography, Container } from "@mui/material";

import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

function Zagalovok({text}) {
  const useStyles = makeStyles((theme) => ({
    zagalovok: {
      marginTop: "20px",
      marginBottom: "50px",
      color: "#c6c6c6",
    },
  }));

  const classes = useStyles();

  return (
    <>
      <Container className={classes.zagalovok}>
        <Typography>{text}</Typography>
      </Container>
    </>
  );
}

export default Zagalovok;
