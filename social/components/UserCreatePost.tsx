import React, { FC, useRef, useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";
import { Toast } from "primereact/toast";
import { axiosInstance } from "../services/axios";


const UserCreatePost = () => {
    const [postTitle, setPostTitle] = useState<string>('');
    const [postContent, setPostContent] = useState<string>('');

    const [totalSize, setTotalSize] = useState(0);
    const toast = useRef(null);
    const fileUploadRef = useRef(null);

    const createPost = async () => {
        try {
            const res = await axiosInstance.post('/post/create-post', {
                title: postTitle,
                content: postContent
            })
            // @ts-ignore
            toast.current.show({severity: 'info', summary: 'Success', detail: 'Post created'});
        } catch (e) {
            // @ts-ignore
            toast.current.show({severity: 'error', summary: 'Error', detail: 'post creation failed'});
        }
        
    }

    
    return (
        <div className="flex w-full flex-column">
            <div className="p-fluid w-full">
                <h2>Title</h2>
                <InputText className="mb-1" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
                <small className="text-600">Required.</small>
            </div>
            <div className="w-full p-fluid mb-3">
                <h2>Content</h2>
                <InputTextarea className="mb-1" value={postContent} onChange={(e) => setPostContent(e.target.value)} rows={5} cols={30} />
                <small className="text-600">Required.</small>
            </div>
            <div className="mb-4">
                <h2>Upload images</h2>
                <FileUpload name="demo[]" url="https://primefaces.org/primereact/showcase/upload.php" multiple accept="image/*" maxFileSize={1000000}
                    emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
            </div>
            <div>
                <Button label="Upload Post" onClick={() => createPost()} disabled={postTitle === '' || postContent === ''} />
            </div>
            <Toast ref={toast}></Toast>
        </div>
    )
}


export default UserCreatePost;