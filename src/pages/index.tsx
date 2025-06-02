// src/pages/index.tsx
import React from 'react';
import {Redirect} from '@docusaurus/router'; // Docusaurus의 Redirect 컴포넌트 임포트

export default function Home(): JSX.Element {
  return <Redirect to="/intro" />;
}