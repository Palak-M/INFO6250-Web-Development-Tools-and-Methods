import * as React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Icon from ".././pages/Assets/icon.png";
import authServices from "../Services/authServices";

const NavBar = () => {
  let pathname = useLocation().pathname;
  let [user, setUser] = React.useState();
  React.useEffect(async () => {
    let sid = localStorage.getItem('sid');
    if(!sid){
      setUser(undefined);
      return
    }
    try {
      const data = await authServices.getUser({ sid });
      setUser(data.sender)
    } catch (err) {
      console.log(err)
    }
  },[pathname])
  return (
    <div
      position="static"
      style={{
        backgroundColor: "rgba(185, 207, 223, 0.19)",
        boxShadow: "none",
        borderBottom: "1px solid rgba(0, 0, 0, 0.22)",
        height: '60px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px'
      }}
    >
      <Link to="/">
        <div
          style={{ color: "#C12869", fontSize:"x-large", fontFamily: 'Varela Round', fontWeight:"bolder" }}
        >
          SignApp
        </div>
      </Link>

      <div style={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
        {!user ? <>
          <Link to="/register">
            <div style={{
              border: "1px solid #6a6a6a",
              borderRadius: "15px",
              backgroundColor: "white",
              color: "#6a6a6a",
              width: "90px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "30px",
              cursor: "pointer"

            }}>Sign Up</div>
          </Link>
          <Link to="/login">
            <div style={{
              color: "white", border: "1px solid #6a6a6a",
              borderRadius: "15px",
              backgroundColor: "#6a6a6a",
              width: "90px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "30px",
              cursor: "pointer"

            }}>
              Login
            </div>
          </Link>
        </>
          :
          <Link to="/profile">
            <img alt={user?.name} src={user?.dp ? user.dp : Icon} style={{ height: '50px', width: '50px' }} />
          </Link>
        }
      </div>
    </div>
  );
};
export default NavBar;
