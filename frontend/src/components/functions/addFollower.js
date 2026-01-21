const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const addFollower = async (followerData) => {
    try {
      const response = await fetch(`${API_URL}/send_confirmation_email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(followerData),
      });
  
      const result = await response.json();

      console.log(result)
  
      if (response.ok) {
        console.log(result.message || 'Follower information submitted successfully!');
      } else {
        console.log('Submission failed.');
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };
  
