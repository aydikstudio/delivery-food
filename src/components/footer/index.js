import {
    Container,
    Grid,
    Typography,
    BottomNavigation,
    List,
    ListItem,
    ListItemText
  } from "@mui/material";
  import {Link} from "react-router-dom";
  import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

function Footer() {

    const useStyles = makeStyles((theme) => ({

        footerLink: {
            color: "#000",
            textDecoration: "none",
            "&:hover": {
                textDecoration: "underline",
                color: "#3c7a00"
              }
        },

        footer: {
         marginTop: "20%",
        }

        
      }));


      const classes = useStyles();

  return (
   
    <>
     <footer className={classes.footer}>
     <Container  maxWidth="md">
            <List>
            <Link to="/" target="_blank"  className={classes.footerLink} >
                <ListItem>
                  <ListItemText
                  
                    primary="Доставка"
                  />
                </ListItem>
                </Link>
                <ListItem>
                  <ListItemText
                    primary="info@aydikstudio.ru"
                  />
                </ListItem>
            </List>
        </Container>
        <Container  maxWidth="md">
          <Grid container >
            <Grid item xs={6} sm={6} md={6}>
              <Typography align="left" gutterBottom>
                ©2022
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <Typography align="right" gutterBottom>
              Сделано <Link to="https://aydikstudio.ru/" target="_blank" className={classes.footerLink}>aydikstudio.ru</Link>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </>
  );
}

export default Footer;
