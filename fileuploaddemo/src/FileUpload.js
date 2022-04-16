import { Fab } from "@mui/material";
import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Button, Card, CardText, CardTitle } from "reactstrap";
import { nanoid } from "nanoid";
import axios from "axios";


const FileUploadComponent = (props) => {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const updateFilePath = (event) => {
        let file = event.target.files[0]
        let fileName = nanoid() + file.name
        setFile(file);
        setFileName(fileName);
    };


    const uploadFilePost = () => {
        // let url = 'http://localhost:8000/uploadFilePost';
        let url = 'https://cors-everywhere.herokuapp.com/http://ec2-3-80-148-178.compute-1.amazonaws.com:8000/uploadFilePost'

        let form = new FormData();
        form.append('file', file, fileName)
        console.log(form);

        axios.post(url, form).then(res => {
            setUploadSuccess(true);
            console.log('Upload Success!')
        })
    }

    return (
        <div >
            <h4>File Upload Demo</h4>
            {
                uploadSuccess ?
                    <Card
                        body
                        className="text-center"
                    >
                        <CardTitle tag="h5">
                            Upload is Successful!
                        </CardTitle>
                    </Card> :
                    <Card body inverse className="text-center">
                        <CardTitle tag="h5">
                            Upload Module
                        </CardTitle>
                        <CardText>
                            Please select a file to upload
                        </CardText>
                        <label htmlFor="upload-file">
                            <input
                                style={{ display: 'none' }}
                                id="upload-file"
                                name="upload-file"
                                type="file"
                                onChange={updateFilePath}
                            />

                            <Fab
                                color="secondary"
                                size="small"
                                component="span"
                                aria-label="add"
                                variant="extended"
                            >
                                <AddIcon /> Select File
                            </Fab>

                            {/* <Fab color="primary" size="small" component="span" aria-label="add">
                    <AddIcon />
                </Fab> */}
                        </label>
                        <br />
                        <Button onClick={uploadFilePost}>
                            Upload File
                        </Button>
                    </Card>
            }
        </div>
    )
}

export default FileUploadComponent