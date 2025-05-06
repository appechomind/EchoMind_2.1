import React from 'react';
import Head from 'next/head';
import { EchoMind } from '../components/EchoMind/EchoMind';

export default function Home() {
  return (
    <>
      <Head>
        <title>EchoMind 2.1</title>
        <meta name="description" content="A modern media management component with project organization and voice control" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen">
        <EchoMind />
      </main>
    </>
  );
} 