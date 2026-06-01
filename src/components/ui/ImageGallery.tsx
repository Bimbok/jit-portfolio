"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImageGallery({ isOpen, onClose }: ImageGalleryProps) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(true);
      fetch("/api/images")
        .then((res) => res.json())
        .then((data) => {
          if (isMounted && Array.isArray(data)) {
            setImages(data);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch images:", err);
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gruv-bg/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative flex h-full max-h-[80vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-gruv-bg-soft bg-gruv-bg shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gruv-bg-soft p-4 px-6">
              <div className="flex items-center gap-3">
                <ImageIcon className="h-5 w-5 text-gruv-orange" />
                <h3 className="font-mono text-lg font-bold text-gruv-fg">
                  Visual Assets Buffer
                </h3>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1 text-gruv-gray transition-colors hover:bg-gruv-bg-soft hover:text-gruv-fg"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gruv-bg-soft scrollbar-track-transparent">
              {loading ? (
                <div className="flex h-64 flex-col items-center justify-center gap-4 text-gruv-gray">
                  <Loader2 className="h-8 w-8 animate-spin text-gruv-orange" />
                  <p className="font-mono text-sm uppercase tracking-widest">
                    Initializing Buffer...
                  </p>
                </div>
              ) : images.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {images.map((src, idx) => (
                    <motion.div
                      key={src}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group relative aspect-square overflow-hidden rounded-lg border border-gruv-bg-soft bg-gruv-bg-soft/20"
                    >
                      <Image
                        src={src}
                        alt={src.split('/').pop()?.split('.')[0].replace(/[-_]/g, ' ') || "Gallery Asset"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gruv-orange/10 opacity-0 transition-opacity group-hover:opacity-100" />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex h-64 flex-col items-center justify-center gap-4 text-gruv-gray">
                  <p className="font-mono text-sm uppercase tracking-widest">
                    Buffer Empty: No assets found in /public/bimbok
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gruv-bg-soft bg-gruv-bg-soft/10 p-4 px-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gruv-gray">
                Status: Ready // Memory Address: 0x7FFD... // Total Assets: {images.length}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
