import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

import FallingCoinsAnimation from '@site/src/components/FallingCoinsAnimation'; // Adjust path if needed

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <>
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <main>
        <div className={styles.heroSection}>
          <h1 className={styles.heroTitle}>Project KASH</h1>
          <p className={styles.heroCatchphrase}>
          Some catchphrase Some catchphrase Some catchphrase
          </p>
          <a 
            href="/intro" // Replace with actual path
            rel="noopener noreferrer"
            className={styles.heroButton}
          >
            Whitepaper
          </a>
        </div>
      </main>
        <FallingCoinsAnimation />
        
    </Layout>
    </>
  );
}