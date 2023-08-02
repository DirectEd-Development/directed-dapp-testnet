import { Button, Layout } from '../../components';
import type { NextPage } from "next";
import Link from 'next/link'; // Import the Link component

const Redeem: NextPage = () => {
    return (
        <Layout>
            <div className='crowdfunding-page'>
                <h1>Crowdfunding-Milestones Page</h1>
                <p>This page is currently under construction. It will be available soon.</p>
                <Link href="/">
                    <Button>Back to Home</Button>
                </Link>
            </div>
        </Layout>
    );
};

export default Redeem;
