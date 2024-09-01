import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Alert, Button, Modal, ModalBody, TextInput } from "flowbite-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);

  // State variables to manage the image file, its URL, upload progress, and any errors
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);

  // console.log(imageFileUploadProgress, imageFileUploadError);
  // Reference for the file input (used to trigger the file picker)
  const filePickerRef = useRef();

  // Function to handle file selection
  const handleImagechange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setImageFile(file); // Set the selected image file
      setImageFileUrl(URL.createObjectURL(file)); // Create a temporary URL for preview
    }
  };

  // useEffect hook to trigger image upload whenever a new file is selected
  useEffect(() => {
    if (imageFile) {
      uploadImage(); // Call the function to upload the image
    }
  }, [imageFile]); // Dependency array includes imageFile, so it runs when imageFile changes

  // Function to handle image upload to Firebase
  const uploadImage = async () => {
    setImageFileUploadError(null);
    const storage = getStorage(app); // Get Firebase storage instance
    const fileName = new Date().getTime() + imageFile.name; // Create a unique file name
    const storageRef = ref(storage, fileName); // Create a storage reference in Firebase
    const uploadTask = uploadBytesResumable(storageRef, imageFile); // Start the file upload

    // Monitor the upload process
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        // Get the upload progress
        const progress =
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0)); // Update the state with the progress
      },
      (error) => {
        // Handle any errors during upload
        console.error("Failed to get download URL:", error);
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        // Once the upload is complete, get the download URL, (This retrieves the URL where the uploaded image is stored in Firebase )
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL); // Update the state with the download URL
        });
      }
    );
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        {/* File input to select images (hidden and triggered by clicking on the image) */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImagechange}
          ref={filePickerRef}
          hidden
        />
        {/* Display the selected or current profile picture */}
        <div
          className=" relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba62, 152, 199(), ${
                    imageFileUploadProgress / 100
                  }`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray]${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {/* Show error message if image upload fails */}
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        {/* Input fields for updating user information */}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput type="password" id="password" placeholder="password" />
        {/* Button to submit the form */}
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      {/* Options to delete account or sign out */}
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
