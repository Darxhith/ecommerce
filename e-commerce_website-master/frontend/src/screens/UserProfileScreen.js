import React, { useEffect, useState } from 'react'; // Import useState here
import { useContext } from 'react';
import { Store } from '../store'; // Adjust path if necessary
import MessageBox from '../components/MessageBox';

export default function UserProfileScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      setError('User not found');
    }
  }, [userInfo]);

  return (
    <div>
      <h1>User Profile</h1>
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {userInfo && (
        <div>
          <div>
            <strong>Name:</strong> {userInfo.name}
          </div>
          <div>
            <strong>Email:</strong> {userInfo.email}
          </div>
          <div>
            <strong>Password:</strong> (hidden for security)
          </div>
        </div>
      )}
    </div>
  );
}
