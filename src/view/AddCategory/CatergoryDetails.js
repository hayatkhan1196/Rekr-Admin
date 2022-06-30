import React, { useState, useEffect } from "react";
import Sidebars from "../../component/SideBar/Sidebars";
import "../../style/userDetail.scss";
import { useParams, } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
// import SalesBoard from "../component/SalesBoard";
// import MultiTabs from "../component/multiTab/MultiTabs";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Switch from '@mui/material/Switch';
import TextField from "@mui/material/TextField";
import MoveDownIcon from '@mui/icons-material/MoveDown';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { doc, getDoc } from "firebase/firestore";
import { deleteService, getService, updateService } from '../../services/Services';
import { db } from "../../config/firebase/firebase";
import { useNavigate } from "react-router-dom";

const CategoryDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const _handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const _handleClose2 = () => setOpen2(false);
    const handleOpen2 = () => setOpen2(true);
    const _handleClose3 = () => setOpen3(false);
    const handleOpen3 = () => setOpen3(true);
    const [_open, setOpen] = useState(false);
    const [_open2, setOpen2] = useState(false);
    const [_open3, setOpen3] = useState(false);
    const [data, setData] = useState();
    const [categoryName, setcategoryName] = useState();
    const [description, setDescription] = useState()

    const { id } = params;
    // const user = userContent.find((user) => user.userName === userName);
    // const { userEmail, userImage } = user;

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 350,
        bgcolor: "background.paper",
        border: "2px solid #E63369",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    };
    const style2 = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 450,
        bgcolor: "background.paper",
        border: "2px solid #E63369",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    };


    useEffect(() => {

        // declare the data fetching function
        if (id) {
            const handelFetch = async () => {
                // setLoading(true)
                const docRef = doc(db, "AddCategory", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setData(docSnap.data())
                    setcategoryName(docSnap.data().Category)
                    setDescription(docSnap.data().Discription)
                } else {
                    console.log("No such document!");
                }
            };
            // call the function
            handelFetch()
                // make sure to catch any error
                .catch(console.error);
        }
    }, [id])

    const deleteUser = async () => {
        await deleteService("AddCategory", id)
        navigate(-1)
    }


    const updateUser = async () => {
        let data = {
            Category: categoryName,
            Discription: description
        }
        await updateService("AddCategory", id, data)
        _handleClose3()
    }

    return (
        <div className="userDetails_div">
            <Sidebars />
            <Button
                variant="contained"
                onClick={handleOpen3}
                style={{
                    marginTop: '10px',
                    color: "black",
                    background: "#0980B0 ",
                    borderRadius: "10px",
                    marginRight: '10px'

                }}
            >
                Manage Details
            </Button>
            <Button
                variant="contained"
                // onClick={handleOpen3}
                onClick={deleteUser}
                style={{
                    marginTop: '10px',
                    color: "black",
                    background: "#0980B0 ",
                    borderRadius: "10px",
                    marginRight: '10px'

                }}
            >
                Delete Account
            </Button>

            <div>
                <Grid container spacing={2} style={{ padding: 25 }}>


                    <div className="blog_content" >
                        <Grid item xs={12} sm={12} md={3} >
                            <img
                                style={{ width: "100%", height: "auto", borderRadius: "10px", marginTop: "25px" }}
                                src={data && data.CategoryImage ? data.CategoryImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                                alt="CategoryPost"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={9}>
                            <div style={{ padding: "10px" }}>

                                <Typography variant="h5" gutterBottom>
                                    {data && data.Category}
                                </Typography>
                                <Typography variant="body1"> {data && data.Discription}</Typography>


                            </div>
                        </Grid>
                    </div>

                </Grid>
            </div>

            <Modal
                open={_open3}
                onClose={_handleClose3}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style2}>

                    <div style={{ padding: "8px" }}>
                        <p> Category Name</p>
                        <TextField
                            id="standard-multiline-static"
                            value={categoryName}
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setcategoryName(e.target.value)}

                        />
                    </div>
                    <div style={{ padding: "8px" }}>
                        <p> Description</p>

                        <TextField
                            id="standard-multiline-static"
                            value={description}
                            variant="outlined"

                            fullWidth
                            multiline

                            onChange={(e) => setDescription(e.target.value)}

                        />
                    </div>
                    <Button
                        variant="contained"
                        onClick={updateUser}
                        startIcon={<UpgradeIcon />}
                        style={{
                            float: "right",
                            margin: "7px",
                            color: "black",
                            background: "#0980B0 ",
                        }}
                    >
                        Update
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default CategoryDetails;



