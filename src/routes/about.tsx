import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">About Virtual Asphalt</h1>
      <p>
        Virtual Asphalt is a sim racing league dedicated to providing a fun and
        competitive environment for racers of all skill levels. Join us for
        exciting events, a friendly community, and a passion for motorsport!
      </p>
    </div>
  );
}

export default function About() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">About</h1>
      <p>About Virtual Asphalt.</p>
    </div>
  );
}
