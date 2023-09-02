import Link from 'next/link';
import { Button, Layout, Meta } from '../components';

const Home = () => {
	return (
	  <Layout>
		<Meta
		  title="DirectEd Testnet"
		  description="For a world in which any person can realise their full potential, regardless of their draw in the lottery of life."
		/>
		<div className="home">
		  <h1>Welcome, Student</h1>
		  <div className="home__buttons">
			<Link href="/redeem">
			  <Button variant="accent">Tutors Marketplace SC</Button>
			</Link>
			<Link href="/milestone-sc">
			  <Button variant="accent" size="small">
				Crowdfunding-Milestones SC
			  </Button>
			</Link>
			<a
			  href="https://www.notion.so/directed/Testnet-Guide-d92335c2072743979c7afe1492e7842b?pvs=4"
			  target="_blank"
			  rel="noopener noreferrer"
			>
			  <Button variant="accent">Testnet Guide</Button>
			</a>
		  </div>
		</div>
	  </Layout>
	);
  };
  
  export default Home;