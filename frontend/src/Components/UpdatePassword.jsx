import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { updatePassword } from '../store/slice/UpdateProfile_slice';
import '../styles/UpdatePassword.css';

const UpdatePassword = () => {
  const [old, setold] = useState("");
  const [newpass, setnewpass] = useState("");
  const [confirm, setconfirm] = useState("");
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateprofile || { loading: false, error: null, isUpdated: false }
  );

  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("oldpassword", old);
    formData.append("newpassword", newpass);
    formData.append("confirmpassword", confirm);
    dispatch(updatePassword(formData));
  };

  return (
    <div className="update-password-container">
      <h1>Update Password</h1>
      <form className="update-password-form" onSubmit={handleUpdate}>
        <div>
          <label>Old Password:</label>
          <input
            type="password"
            value={old}
            onChange={(e) => setold(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newpass}
            onChange={(e) => setnewpass(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setconfirm(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </button>
        {error && <div className="error">{error}</div>}
        {isUpdated && <div className="success">Password updated successfully!</div>}
      </form>
    </div>
  );
};

export default UpdatePassword;
