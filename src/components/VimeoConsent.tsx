import React from 'react'

interface VimeoConsentProps {
  src: string
  title: string
}

export const VimeoConsent: React.FC<VimeoConsentProps> = ({ src, title }) => {
  const [consent, setConsent] = React.useState(false)
  return (
    <div className="w-full max-w-2xl aspect-video rounded-lg overflow-hidden shadow-lg border border-border flex items-center justify-center bg-muted">
      {consent ? (
        <iframe
          src={src}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      ) : (
        <button
          className="cursor-pointer px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => setConsent(true)}
        >
          Allow Vimeo Video (loads external content & cookies)
        </button>
      )}
    </div>
  )
}
