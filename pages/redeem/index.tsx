import Link from 'next/link';
import { Button, Layout } from '../../components';
import type { NextPage } from "next";

const Redeem: NextPage = () => {
    return (
        <Layout>
            <div className='redeem-page'>
                <h1>Redeem Djed</h1>
                <p>This page is currently under construction. It will be available soon.</p>
                <Link href="/">
                    <Button>Back to Home</Button>
                </Link>
            </div>
        </Layout>
    );
};

export default Redeem;
