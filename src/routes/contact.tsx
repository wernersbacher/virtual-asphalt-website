import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/contact')({
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p>
        Have questions or want to join our league? Reach out to us at{' '}
        <a
          href="mailto:info@virtualasphalt.com"
          className="text-blue-600 underline"
        >
          info@virtualasphalt.com
        </a>{' '}
        or join our Discord community!
      </p>
    </div>
  );
}

export default function Contact() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Contact</h1>
      <p>Contact us for more information.</p>
    </div>
  );
}
