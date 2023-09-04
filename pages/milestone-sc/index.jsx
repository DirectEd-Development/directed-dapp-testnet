import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Layout, Meta } from '../../components';

const Home = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleProceed = () => {
    // Redirect to the selected page based on the selectedOption
    if (selectedOption === 'authority') {
      router.push('/milestone-sc/authority'); 
    } else if (selectedOption === 'examiner') {
      router.push('/milestone-sc/examiner');
    } else if (selectedOption === 'school') {
      router.push('/milestone-sc/school');
    } else if (selectedOption === 'student'){
      router.push('/milestone-sc/student');
    }
      
  };

  return (
    <Layout>
      <Meta
        title="DirectEd Testnet"
        description="For a world in which any person can realize their full potential, regardless of their draw in the lottery of life."
      />
      <div className="home">
        <h1>Pick a Role to Proceed</h1>
        <select onChange={handleOptionChange} value={selectedOption}>
          <option value="">Select an option</option>
          <option value="authority">Authority</option> 
          <option value="examiner">Examiner</option>
          <option value="school">School</option>
          <option value="student">Student</option>
        </select>
        <div className="home__buttons">
          <Button variant="primary" onClick={handleProceed} disabled={!selectedOption}>
            Proceed
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
