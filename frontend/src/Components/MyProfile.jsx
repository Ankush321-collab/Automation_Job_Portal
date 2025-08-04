import React from 'react';
import { useSelector } from 'react-redux';

const MyProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [showResumeModal, setShowResumeModal] = React.useState(false);

  const isPdf = user?.resume?.url?.toLowerCase().endsWith('.pdf');

  return (
    <div className="account_components">
      <h3>My Profile</h3>

      <div>
        <label htmlFor="fullname">Full Name</label>
        <input id="fullname" type="text" value={user?.fullname || ''} disabled />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={user?.email || ''} disabled />
      </div>

      {user?.role === 'job seeker' && (
        <>
          <div>
            <label>My Preferences</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input id="first_preference" type="text" value={user?.preference?.first_preference || ''} disabled />
              <input id="second_preference" type="text" value={user?.preference?.second_preference || ''} disabled />
              <input id="third_preference" type="text" value={user?.preference?.third_preference || ''} disabled />
            </div>
          </div>

          <div>
            <label htmlFor="coverletter">Cover Letter</label>
            <input id="coverletter" type="text" value={user?.coverletter || ''} disabled />
          </div>

          <div>
            <label htmlFor="resume">Resume</label>
            {user?.resume?.url ? (
              <button
                type="button"
                title="View Resume"
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  background: '#007bff',
                  color: '#fff',
                  borderRadius: '5px',
                  textDecoration: 'none',
                  marginTop: '8px',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={() => setShowResumeModal(true)}
              >
                View Resume
              </button>
            ) : (
              <span style={{ color: '#888' }}>No resume uploaded</span>
            )}

            {showResumeModal && (
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  background: 'rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 9999,
                }}
                onClick={() => setShowResumeModal(false)}
              >
                <div
                  style={{
                    background: '#fff',
                    padding: '24px',
                    borderRadius: '10px',
                    maxWidth: '90vw',
                    maxHeight: '80vh',
                    overflow: 'auto',
                    position: 'relative',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      background: '#007bff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '4px 10px',
                      cursor: 'pointer',
                    }}
                    onClick={() => setShowResumeModal(false)}
                  >
                    Close
                  </button>
                  {isPdf ? (
                    <iframe
                      src={user.resume.url}
                      title="Resume PDF"
                      style={{ width: '100%', height: '70vh', border: 'none' }}
                    >
                      This browser does not support iframes.
                    </iframe>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                      <a href={user.resume.url} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', fontWeight: 600 }}>
                        Download Resume
                      </a>
                      <p style={{ color: '#888', marginTop: 10 }}>
                        Preview is only available for PDF files. DOC/DOCX can be downloaded.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      <div>
        <label htmlFor="address">Address</label>
        <input id="address" type="text" value={user?.address || ''} disabled />
      </div>

      <div>
        <label htmlFor="phone">Phone</label>
        <input id="phone" type="text" value={user?.phone || ''} disabled />
      </div>
    </div>
  );
};

export default MyProfile;
