import { Button, Layout, Meta } from '../../../components';

const Home = () => {
  return (
    <Layout>
      <Meta
        title="Student Action Page"
        description="Student minting tokens and completing their milestones"
      />
      <div className="student">
        <h1>Welcome, Student</h1>
        <div className="student__buttons">
          <Button variant="accent" size="small">
            Complete Milestone 1
          </Button>
          <Button variant="accent">Complete Milestone 2</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
