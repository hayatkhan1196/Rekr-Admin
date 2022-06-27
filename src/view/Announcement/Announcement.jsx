import React, { useState, useEffect } from "react";
import Sidebars from "../../component/SideBar/Sidebars";
import "../../style/users.scss";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { getService } from '../../services/Services';

const Announcement = () => {
    const [annoucements, setAnnoucements] = useState([])

    let list = []
    const getAllUsers = async () => {

        const querySnapshot = await getService("Annoucements")

        querySnapshot.forEach((doc) => {

            list.push({
                id: doc.id,

                ...doc.data()
            })
        });
        setAnnoucements(list)
    };

    useEffect(() => {

        getAllUsers()

    }, [])

    return (
        <div className="users_div">
            <Sidebars />
            <div className="users_data">
                <div className="order_head">
                    <Typography variant="h6" component="div" gutterBottom>
                        {" "}
                        ANNOUNCEMENT        </Typography>
                </div>
                <Divider sx={{ background: "#E63369" }} />

                <div style={{ padding: "25px" }}>
                    <Grid container spacing={2}>

                        <Grid item xs={2}>
                            <Typography variant="h6" component="div" gutterBottom>
                                User Image
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="h6" component="div" gutterBottom>
                                User Name
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="h6" component="div" gutterBottom>
                                Title
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="h6" component="div" gutterBottom>
                                Category
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography
                                variant="h6"
                                component="div"
                                gutterBottom
                                style={{ textAlign: "center" }}
                            >
                                Date
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography
                                variant="h6"
                                component="div"
                                gutterBottom
                                style={{ textAlign: "center" }}
                            >
                                View
                            </Typography>
                        </Grid>
                    </Grid>
                    {annoucements.map((item) => {
                        return (
                            <div>
                                <Divider className="food_detail" />
                                <Grid container spacing={2} key={item.id}>

                                    <Grid item xs={2}>
                                        <span style={{ display: "flex", alignItems: "center" }}>
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={item && item.picture}
                                                variant="rounded"
                                                sx={{ width: 50, height: 50 }}
                                            />
                                        </span>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="body1" component="div" gutterBottom>
                                            {item && item.userName}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="body1" component="div" gutterBottom>
                                            {item && item.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography
                                            variant="body1"
                                            component="div"
                                            gutterBottom
                                            style={{ textAlign: "center" }}
                                        >
                                            {item && item.category}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography
                                            variant="body1"
                                            component="div"
                                            gutterBottom
                                            style={{ textAlign: "center" }}
                                        >
                                            {item && item.date}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Link
                                            to={`/users/${item.userId}`}
                                            style={{ textDecoration: "none", color: "black" }}
                                        >
                                            <Typography align="center">
                                                <Button variant="outlined" size="small" style={{ background:"#0980B0",color:"black" }}>
                                                    View Detail
                                                </Button>
                                            </Typography>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Announcement;
