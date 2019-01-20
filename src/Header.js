import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";
import firebase, { auth, provider } from './Firestore.js';
import './Firestore.js';  



import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';


import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';


const drawerWidth = 200;


const styles = theme => ({

  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 12,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    boxShadow: '0px 20px 50px -10px black',
    zIndex: 9999,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    boxShadow: '0px 20px 50px -10px black',
    zIndex: 2,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});



class Header extends React.Component {

  state = {
    open: false,
    openLoginDialog: false,
    openRegisterDialog: false,
    openLog: false,

  };

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      openLoginDialog: false,
      openRegisterDialog: false,
      openLog: false,
      nameReg: "",
      emailReg: "",
      passwordReg: "",
      emailLog: "",
      passwordLog: "",
    };


  }

  
  handleClickOpenRegister = () => {
    this.setState({ openRegisterDialog: true });
  };

  handleCloseRegister = () => {
    this.setState({ openRegisterDialog: false });
  };

  handleClickOpenLogin = () => {
    this.setState({ openLoginDialog: true });
  };

  handleCloseLogin = () => {
    this.setState({ openLoginDialog: false });
  };

  handleToggleLog = () => {
    this.setState(state => ({ openLog: !state.openLog }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ openLog: false });
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  
  handleChangeNameReg  = event => {
    this.setState({ nameReg: event.target.value });
  };

  handleChangeEmailReg  = event => {
    this.setState({ emailReg: event.target.value });
  };

  handleChangePasswordReg  = event => {
    this.setState({ passwordReg: event.target.value });
  };


  handleChangeEmailLog  = event => {
    this.setState({ emailLog: event.target.value });
  };

  
  handleChangePasswordLog  = event => {
    this.setState({ passwordLog: event.target.value });
  };

  handleEventSubmit = () => {
    this.setState({ openLoginDialog: false });
    //onChange={this.handleChangePasswordLog}

    //Event : value={this.state.emailLog}
    //Location : value={this.state.passwordLog}
    //Image : value={this.state.nameReg}
    // Description : value={this.state.emailReg}

    let currentComponent = this;


    const firestore = firebase.firestore();
    const settings = {timestampsInSnapshots: false};
    firestore.settings(settings);
    const db = firebase.firestore();



    if(this.state.emailLog.trim() == "", this.state.passwordLog.trim() == "", this.state.nameReg.trim() == "" , this.state.emailReg.trim() == ""){
      
    }else{
        db.collection("events").add({
            attending: 0,
            description: currentComponent.state.emailReg, 
            image: currentComponent.state.nameReg,
            location: currentComponent.state.passwordLog,
            name: currentComponent.state.emailLog,
        })
        .then(function(doc) {
          console.log("Document written with ID: ", doc.id);

      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
    }



  };

  render() {

    const { classes, theme } = this.props;
    const { openLog } = this.state;

    let currentComponent = this;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <div
          color="primary"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          }, "header")}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
              <i className="material-icons sideButton">sort</i>
            </IconButton>
            <Link className="headerTitle" to="/">Goat Tracks</Link>

            {this.props.user ?
              
              <div className="headerSideRight">
              <Button
               className="headerProfileImage"
               buttonRef={node => {
                 this.anchorEl = node;
               }}
               aria-owns={openLog ? 'menu-list-grow' : undefined}
               aria-haspopup="true"
               onClick={this.handleToggleLog}
             >
                   <img src={this.props.user.photoURL} />
             </Button>
                 
                   

            <Popper open={openLog} anchorEl={this.anchorEl} transition disablePortal>
               {({ TransitionProps, placement }) => (
                 <Grow
                   {...TransitionProps}
                   id="menu-list-grow"
                   style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                 >
                   <Paper>
                     <ClickAwayListener onClickAway={this.handleClose}>
                       <MenuList>
                         <Link to={"/profile/" + this.props.user.displayName} ><MenuItem onClick={this.handleClose}>{this.props.user.displayName}</MenuItem></Link>
                         <MenuItem onClick={this.handleClickOpenLogin}>Create Event</MenuItem>
                         <MenuItem onClick={this.props.logout}>Logout</MenuItem>
                       </MenuList>
                     </ClickAwayListener>
                   </Paper>
                 </Grow>
               )}
             </Popper>

         </div>
              :

              <div className="headerSideRight">
                  <button className="btncustom" onClick={this.props.login}>Log In</button>              
              </div>
            }

          </Toolbar>
        </div>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <i className="material-icons sideButton">sort</i> :  <i className="material-icons sideButton">sort</i>}
            </IconButton>
          </div>
          
          <br />

          <List>
            <Link to="/" className="sideLinks">
            <ListItem button key="Home">
                <ListItemIcon>
                    <i className="material-icons sideButton">home</i>
                </ListItemIcon>
                <ListItemText primary="Home" />
             </ListItem>
            </Link>

             <br />

            <Link to="/calendar" className="sideLinks">
            <ListItem button key="Compose">
                <ListItemIcon>
                    <i className="material-icons sideButton">event</i>
                </ListItemIcon>
                <ListItemText primary="Events" />
                
             </ListItem>

            </Link>
            <br />


            {this.props.user ?

              <Link to={"/profile/" + this.props.user.displayName}>

                <ListItem   button key="Settings">
                    <ListItemIcon>
                        <i className="material-icons sideButton">settings</i>
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItem>
                </Link>
            :
             ""
            
            }

            {this.props.user ?

            <Link to={"/profile/" + this.props.user.displayName}>
                <br />

              <ListItem to={"/profile/" + this.props.user.displayName}  button key="Compositions">

                  <ListItemIcon>
                      <i className="material-icons sideButton">person</i>
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
              </ListItem>
              </Link>
            :
              <div></div>
            
            }



          </List>
     
        </Drawer>


        <Dialog
          open={this.state.openLoginDialog}
          onClose={this.handleCloseLogin}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create An Event</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Start a Community!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              onChange={this.handleChangeEmailLog}
              label="Name of Event"
              value={this.state.emailLog}
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              id="name"
              onChange={this.handleChangePasswordLog}
              value={this.state.passwordLog}
              label="Event Location"
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              id="name"
              label="Event Image URL"
              onChange={this.handleChangeNameReg}
              value={this.state.nameReg}
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              id="name"
              value={this.state.emailReg}
              onChange={this.handleChangeEmailReg}
              label="Description"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseLogin} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleEventSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>


        <Dialog
          open={this.state.openRegisterDialog}
          onClose={this.handleCloseRegister}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Register</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Join the Goat Track Network!.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              onChange={this.handleChangeNameReg}
              value={this.state.nameReg}
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={this.state.emailReg}
              onChange={this.handleChangeEmailReg}
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Password"
              onChange={this.handleChangePasswordReg}
              value={this.state.passwordReg}
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseRegister} color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.signup} name={this.state.nameReg} email={this.state.emailReg} password={this.state.passwordReg} color="primary">
              Register
            </Button>
          </DialogActions>
        </Dialog>


      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Header);
