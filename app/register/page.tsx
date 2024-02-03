'use client';
import React from 'react';
import { Card, Input, Checkbox, Button, Typography } from '@material-tailwind/react';
import Link from 'next/link';
import {motion } from 'framer-motion'
import Form from '../components/Form';
const page = () => {
  return (
        <>
            <Form type='register'/>
        </>
  );
};

export default page;
