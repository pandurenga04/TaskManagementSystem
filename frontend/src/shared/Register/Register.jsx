import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value;
    const email = form.email.value;
    const pass = form.pass.value;
    const bio = form.bio.value;
    const photo = form.photo.files[0];

    // Check file size (example: 5MB limit)
    if (photo && photo.size > 5 * 1024 * 1024) {
      toast("File size should be less than 5MB");
      return;
    }

    // Prepare form data to send to the backend
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("pass", pass);
    formData.append("bio", bio);
    formData.append("photo", photo);

    try {
      // Send data to backend
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const userInfo = { username, email, pass, bio };
        localStorage.setItem("user", JSON.stringify(userInfo)); // Save user data to localStorage

        toast("Registration Successful..");
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        const error = await response.json();
        toast.error(`Error: ${error.message}`);
      }
    } catch (error) {
      toast.error("Error while submitting the form");
    }
  };

  return (
    <div>
      <div className="hero pt-2">
        <div className="hero-content">
          <div className="card shadow-2xl bg-base-200">
            <div>
              <h3 className="text-center p-5 text-3xl font-semibold">Create your account</h3>
              <hr />
              <form onSubmit={handleFormSubmit}>
                <div className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Username</span>
                    </label>
                    <input type="text" placeholder="username" name="username" className="input input-bordered w-full lg:w-96" required />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="email" name="email" className="input input-bordered w-full lg:w-96" required />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="Password" name="pass" className="input input-bordered w-full lg:w-96" required />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Bio</span>
                    </label>
                    <input type="text" placeholder="Write your Bio" name="bio" className="input input-bordered w-full lg:w-96" required />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Photo</span>
                    </label>
                    <input type="file" accept="image/*" name="photo" className="file-input file-input-bordered w-full lg:w-96" required />
                  </div>
                  <div className="form-control mt-6">
                    <button className="btn btn-primary" type="submit">Register</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
