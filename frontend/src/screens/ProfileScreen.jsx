import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer.jsx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader.jsx";
import { useUpdateUserMutation } from "../slices/usersApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState('');
  const [selectedImage, setSelectedImage] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(e.target.files[0]);
    if (file) {
      file.name;
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setImage(userInfo.image);
  }, [userInfo.name, userInfo.email, userInfo.image]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (name.length < 5 || name.length > 10) {
      toast.error("Name should contain 5-10 letters");
    } else if (email.length < 13 || email.length > 23) {
      toast.error("Type email correctly");
    } else if (password.length < 5 && password !== "") {
      toast.error("Password Should contain atleast 5 characters");
    } else if (password !== confirmPassword) {
      toast.error("passwords do not match");
    } else {
      try {
        const formData = new FormData();
        formData.append("_id", userInfo._id);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", image);
        const res = await updateProfile(formData).unwrap();

        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  function validateEmail(event) {
    const inputField = event.target;
    const regex = /^[A-Za-z0-9@.]+$/;
    const value = inputField.value;

    if (!regex.test(value)) {
      inputField.value = value.slice(0, -1);
    }
  }
  function validateName(event) {
    const inputField = event.target;
    const regex = /^[A-Za-z]+$/;
    const value = inputField.value;

    if (!regex.test(value)) {
      inputField.value = value.slice(0, -1);
    }
  }
  function validatePassword(event) {
    const inputField = event.target;
    const regex = /^[^\s]*$/;
    const value = inputField.value;

    if (!regex.test(value)) {
      inputField.value = value.replace(/\s/g, "");
    }
  }
  return (
    <FormContainer>
      <h1>Update Profile</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="image">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Profile"
                style={{ width: "200px", height: "200px", borderRadius: "50%" }}
              />
            ) : (
              <img
                src={ `/assets/${image}`|| "/assets/profile.png"}
                alt="Profile"
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                }}
              />
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input type="file" onChange={handleImageUpload} />
          </div>
        </Form.Group>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            onInput={(e) => validateName(e)}
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            onInput={(e) => validateEmail(e)}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            onInput={(e) => validatePassword(e)}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="profilePhoto">
          <Form.Label>Profile Photo</Form.Label>
          
        </Form.Group>

        {isLoading && <Loader />}

        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;
