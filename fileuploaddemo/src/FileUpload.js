import { Fab } from "@mui/material";
import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Button, Card, CardText, CardTitle } from "reactstrap";
import { nanoid } from "nanoid";



const FileUploadComponent = (props) => {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();
    const [uploading, setUploading] = useState(false);

    const updateFilePath = (event) => {
        let file = event.target.files[0]
        let fileName = nanoid() + file.name
        // console.log(file, fileName)
        setFile(file);
        setFileName(fileName);
    };

    const updateUploading = () => setUploading(!uploading);

    const uploadFile = () => {
        // let url = 'https://6pjc9bmz2f.execute-api.us-east-1.amazonaws.com/v1/stirivee-fileuploaddemo/' + fileName;
        let url = 'http://localhost:8000/uploadFile'

        fetch(url, {
            // content-type header should not be specified!
            method: 'PUT',
            body: file,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS 
            }
        })
            .then(response => {
                console.log(response.json())
            })
            .then(success => {
                // Do something with the successful response
                console.log('Successfully uploaded the file!')
            })
            .catch(error => console.log(error)
            );
    }

    return (
        <div >
            <h4>File Upload Demo</h4>
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
                <Button onClick={uploadFile}>
                    Upload File
                </Button>
            </Card>
        </div>
    )
}

export default FileUploadComponent