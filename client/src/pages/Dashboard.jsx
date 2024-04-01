import React from 'react';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
export default function Dashboard() {
  return (
    <div>
      random analysis
      <div>
        <Link to="/private/create-blog">
          <Button gradientDuoTone="purpleToBlue">Create Post</Button>
        </Link>
      </div>
    </div>
  );
}
