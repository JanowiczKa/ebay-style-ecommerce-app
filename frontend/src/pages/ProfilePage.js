import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SellerRating from '../components/SellerRating';

export default function ProfilePage() {
    let { profileId } = useParams();
    const [profile, setProfile] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    const fileUpload = event => {
        console.log(selectedFile);
        const fd = new FormData();
        fd.append('image', selectedFile);
        fd.append("userId", profileId);

        axios.post("/api/changeProfilePicture", fd, {
            onUploadProgress: function(progressEvent) {
              var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
              console.log(`Upload progress: ${percentCompleted}%`)
              if (percentCompleted===100)window.location.reload();
            }
          }).then(res => {
              console.log(res);
          });
    }

    useEffect( () => {

        const fetchData = async () => {

            const data = await axios.post('/api/getUserById',
            {
                profileID: profileId
            });

            setProfile(data.data);
            //alert(data);
        }

        fetchData();

    }, [profileId]); /* runs only on the first render */
    
    if (!profile){ 
        return <div>Profile does not exists</div>
    }

    return (
        /*
            Back to search result link
        */
        <div className="row displayProduct">
            <div className='product-page'>

                <div className='product-image'>            
                    <img className="big" src={`/images/${profile.ImageAddress}`} alt="primary"></img>
                </div>
                
                <div>
                    <label htmlFor="upload">Upload New Profile Picture:</label>
                    <input 
                    type="file" 
                    name="upload" 
                    accept='image/*' 
                    onChange={(i) => setSelectedFile(i.target.files[0])}>
                    </input>

                    <button 
                    onClick={fileUpload}>
                        Upload Image
                    </button>
                </div>  
            </div>

            <div className='additional-info'>

                <h1 className='no-left-margin'>{profile.name}</h1>

                <h2 className='no-left-margin'>{profile.email}</h2>

                <div className="seller">
                    <SellerRating userId={profile._id}></SellerRating>
                    <h3 className='no-left-margin'>{profile.Rating}</h3>
                </div>
                
            </div>
        </div>
    )
}