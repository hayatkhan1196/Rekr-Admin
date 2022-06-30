
import React, { useState, useEffect } from "react";
// import Sidebars from "../component/Sidebars";
// import "../style/privacyPolicy.scss";
// import _TermsAndConditions from "../assets/images/terms_and_conditions.png";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
// import AddTermsAndConditions from "../component/AddTermsAndConditions";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
// import { userContent } from './../component/UserData'
// import { storage } from '../../Config/firebase';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getFirestore } from '@firebase/firestore'
import { collection, onSnapshot } from "firebase/firestore";
import { doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage';
import { getService, postService, postServiceById } from "../../services/Services";

import { storage } from "../../config/firebase/firebase";
import Sidebars from "../../component/SideBar/Sidebars";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    height: "auto",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid white",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};
// const categories = [
//     'Photo', 'Video',
//     'Studio', 'Models',
//     'Dancers']


const AddCategory = () => {
    const [_open, setOpen] = useState(false);
    const _handleClose = () => setOpen(false);
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [categoryTitle, setCategoryTitle] = useState('')
    const [categoryDescription, setCategoryDescription] = useState('')
    // const [categoryData, setCategoryData] = React.useState('')
    const [categoryObject, setCategoryObject] = React.useState('')

    let list = []
    const getAllCategories = async () => {
        const querySnapshot = await getService("AddCategory")
        querySnapshot.forEach((doc) => {

            list.push({
                id: doc.id,

                ...doc.data()
            })
        });
        setCategoryObject(list)
    };
    useEffect(() => {
        getAllCategories()

    }, [])

    const handleCategorytitle = (event) => {
        setCategoryTitle(event.target.value);

    };
    // const handleCategoryPrice = (event) => {
    //     setBlogblogPrice(event.target.value);

    // };

    const handleCategoryDescription = (event) => {
        setCategoryDescription(event.target.value);

    };

    // const handleChangeBlog = (event) => {
    //     setCategoryData(event.target.value);

    // };

    const onSubmit = async () => {
        _handleClose();
        const record = {
            CategoryImage: imageUrl,
            Category: categoryTitle,
            Discription: categoryDescription,
        };
        await postService("AddCategory", record)
        window.location.reload();

    }
    const uploadImage = (e, type) => {
        const imageFile = e.target.files[0];
        const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const uploadProgress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setIsLoading(true);
            },
            (error) => {
                console.log(error);
                setIsLoading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageUrl(downloadURL);
                    setIsLoading(true);
                    setIsLoading(false);
                });
            });

    }

    const handleOpen = () => setOpen(true);
    return (
        <>
            <div className="privacy_div">
                <Sidebars />

                <div className="privacy_policy">
                    <Button
                        variant="contained"
                        onClick={handleOpen}
                        style={{
                            margin: "10px 0px 10px 40px",
                            color: "black",
                            background: "#0980B0",
                            borderRadius: "10px",
                        }}
                    >
                        Add New Category
                    </Button>
                    <div>
                        <Grid container spacing={2} style={{ padding: 25 }}>
                            {categoryObject && categoryObject?.map((category) => (

                                <div className="blog_content" >
                                    <Grid item xs={12} sm={12} md={3} >
                                        <img
                                            style={{ width: "100%", height: "auto", borderRadius: "10px", marginTop: "25px" }}
                                            src={category && category.CategoryImage ? category.CategoryImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                                            alt="CategoryPost"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={9}>
                                        <div style={{ padding: "10px" }}>
                                            <Typography variant="h5" gutterBottom>
                                                {category && category.Category}
                                            </Typography>
                                            <Typography variant="body1">{category.Discription}</Typography>

                                            <Link
                                                to={`/CategoryDetails/${category.id}`}
                                                style={{ textDecoration: "none", color: "black" }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    style={{
                                                        color: "black",
                                                        marginTop: "10px",
                                                        borderRadius: "12px",
                                                        background: "#0980B0",
                                                    }}
                                                >
                                                    View Details
                                                </Button>
                                            </Link>
                                        </div>
                                    </Grid>
                                </div>
                            ))}
                        </Grid>
                    </div>

                    <Modal
                        open={_open}
                        onClose={_handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <div>
                                <Typography variant="h6" component="div" gutterBottom>
                                    Add New
                                </Typography>
                                <Divider style={{ margin: "10px ", }} />
                                <div style={{ padding: "8px", paddingLeft: "10px" }}>

                                    <TextField
                                        id="standard-multiline-static"
                                        placeholder=" Category Title"
                                        variant="outlined"
                                        fullWidth
                                        value={categoryTitle}
                                        onChange={handleCategorytitle}
                                    />
                                </div>


                                <div style={{ padding: "8px" }}>

                                    <TextField
                                        id="standard-multiline-static"
                                        placeholder="Category Description"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        value={categoryDescription}
                                        onChange={handleCategoryDescription}
                                    />
                                </div>


                                <div style={{ padding: "8px", marginRight: "15px" }}>
                                    {imageUrl && imageUrl ? <div style={{ width: "25rem" }}>
                                        <img
                                            style={{ width: "100%", borderRadius: "10px", height: "12rem", margin: "0px 30px 30px 13px" }}
                                            src={imageUrl}

                                        />
                                    </div> : <></>}
                                    <input
                                        accept="image/"
                                        style={{ display: 'none' }}
                                        id="raised-button-file"

                                        type="file"
                                        onChange={(e) => uploadImage(e, "image")}
                                    />

                                    <label htmlFor="raised-button-file">
                                        <Button variant="contained" component="span" style={{
                                            margin: "0px 0px 15px 10px",
                                            color: "white",
                                            background: "#0980B0",
                                            borderRadius: "5px",
                                            width: "100%"

                                        }}>
                                            upload  Image
                                        </Button>
                                    </label>
                                </div>






                                {/* <div style={{ padding: "8px" }}>

                                <TextField
                                    id="standard-multiline-stati"
                                    placeholder="Category Price"
                                    variant="outlined"
                                    fullWidth
                                    value={blogPrice}
                                    onChange={handleCategorytitle}
                                />
                            </div> */}
                                <Button
                                    variant="contained"
                                    startIcon={<SaveIcon />}
                                    onClick={onSubmit}
                                    style={{
                                        float: "right",
                                        margin: "7px",
                                        color: "white",
                                        background: "#0980B0",
                                    }}
                                >
                                    {isLoading ? "...uploading " : " Save "}
                                    {""}

                                </Button>


                            </div>


                        </Box>
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default AddCategory;
