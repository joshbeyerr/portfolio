"use client";

import { Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type ContactChannel = {
  label: string;
  value: string;
  href: string;
  copyValue?: string;
};

type ContactChannelsProps = {
  channels: ContactChannel[];
};

export function ContactChannels({ channels }: ContactChannelsProps) {
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!copiedLabel) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCopiedLabel(null);
    }, 1400);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [copiedLabel]);

  const handleCopy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedLabel(label);
    } catch {
      setCopiedLabel(null);
    }
  };

  return (
    <div className="grid gap-3">
      {channels.map((channel) => {
        const copied = copiedLabel === channel.label;

        return (
          <button
            key={channel.label}
            type="button"
            className={`contact-copy-card ${copied ? "contact-copy-card-copied" : ""}`}
            onClick={() =>
              void handleCopy(channel.label, channel.copyValue ?? channel.href)
            }
          >
            <div>
              <p className="contact-copy-label">{channel.label}</p>
              <p className="contact-copy-value">{channel.value}</p>
            </div>
            <AnimatePresence initial={false}>
              {copied ? (
                <motion.span
                  key="copied"
                  className="contact-copy-status contact-copy-status-visible"
                  aria-live="polite"
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{
                    duration: 0.22,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Check className="h-[13px] w-[13px]" strokeWidth={1.8} />
                  Copied
                </motion.span>
              ) : null}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
}
