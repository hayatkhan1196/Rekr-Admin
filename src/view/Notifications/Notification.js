import React, { useState, useEffect } from "react";
import Sidebars from "../../component/SideBar/Sidebars";
import "../../style/users.scss";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { deleteService, getService, updateService } from '../../services/Services';
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase/firebase";

const Notification = () => {
    const [notification, setNotification] = useState([])
    const navigate = useNavigate();


    const optionsdate = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minutes: "numeric"
    };

    let list = []
    let allList = []
    const getAllUsers = async () => {

        const querySnapshot = await getService("Notification")

        querySnapshot.forEach((doc) => {

            list.push({
                id: doc.id,

                ...doc.data()
            })
        });

        list.map((item) => {
            item?.Notification?.map((subitems) => {
                subitems.parentId = item.id
                allList.push(subitems)
            })
        })
        setNotification(allList)

    };
    useEffect(() => {

        getAllUsers()

    }, [])


    const deleteUser = async (id, pId) => {

        const docRef = doc(db, "Notification", pId);
        const docSnap = await getDoc(docRef);
        let data = docSnap.data();

        const updatedDate = data.Notification.filter((item) => item.userId !== id)
        let objectDate = {
            Notification: updatedDate

        }
        updateService("Notification", pId, objectDate)

        if (notification) {
            try {

                let list = notification
                list = list.filter((i) => i.userId !== id);
                setNotification(list)

            } catch (error) {
                console.log("error occur");
            }
        } else {
            console.log("No such document!");
            // setLoading(false)
        }
    };

    return (
        <div className="users_div">
            <Sidebars />
            <div className="users_data">
                <div className="order_head">
                    <Typography variant="h6" component="div" gutterBottom>
                        {" "}
                        NOTIFICATIONS          
                        </Typography>
                </div>
                <Divider sx={{ background: "#E63369" }} />

                <div style={{ padding: "25px" }}>
                    <Grid container spacing={2}>

                        <Grid item xs={2.4}>
                            <Typography variant="h6" component="div" gutterBottom>
                                Name
                            </Typography>
                        </Grid>
                        <Grid item xs={2.4}>
                            <Typography variant="h6" component="div" gutterBottom>
                                Type
                            </Typography>
                        </Grid>
                        <Grid item xs={2.4}>
                            <Typography variant="h6" component="div" gutterBottom>
                                Date
                            </Typography>
                        </Grid>
                        <Grid item xs={2.4}>
                            <Typography
                                variant="h6"
                                component="div"
                                gutterBottom
                                style={{ textAlign: "center" }}
                            >
                                Time
                            </Typography>
                        </Grid>
                        <Grid item xs={2.4}>
                            <Typography
                                variant="h6"
                                component="div"
                                gutterBottom
                                style={{ textAlign: "center" }}
                            >
                                Action
                            </Typography>
                        </Grid>
                    </Grid>
                    {notification && notification?.map((item) => {

                        // for timeStamps  conversion into to String
                        let result;
                        const dateAndTime = new Date(item.time);

                        if (typeof dateAndTime === 'object' && dateAndTime !== null && 'toString' in dateAndTime) {
                            result = dateAndTime.toString();
                        }

                        return (
                            <div>

                                <Divider className="food_detail" />
                                <Grid container spacing={2} key={item.id}>

                                    <Grid item xs={2.4}>
                                        <Typography variant="body1" component="div" gutterBottom>
                                            {item && item?.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2.4}>
                                        <Typography variant="body1" component="div" gutterBottom>
                                            {item && item?.type}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <Typography variant="body1" component="div" gutterBottom>
                                            {item && item.date}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2.4}>
                                        <Typography
                                            variant="body1"
                                            component="div"
                                            gutterBottom
                                            style={{ textAlign: "center" }}
                                        >

                                            {result}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2.4}>

                                        <Typography align="center">
                                            <Button onClick={(() => { deleteUser(item.userId, item.parentId) })} variant="contained" size="small" style={{ background: "#0980B0", color: "black" }}>
                                                Delete
                                            </Button>
                                        </Typography>

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

export default Notification;
