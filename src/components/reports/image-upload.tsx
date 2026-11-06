"use client";

/**
 * ImageUpload — optional photo attachment for the report form.
 * Shows a drag-and-drop zone, a file preview with remove button,
 * and clear error messaging for invalid files.
 */

import { useRef, useState, useCallback } from "react";
import { ImagePlus, X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ImageUploadProps {
  value: File | null | undefined;
  onChange: (file: File | null) => void;
  error?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ImageUpload({ value, onChange, error }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const validate = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type))
      return "File must be JPEG, PNG, WebP, or GIF";
    if (file.size > MAX_SIZE_BYTES)
      return `File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum is 5 MB`;
    return null;
  };

  const handleFile = useCallback(
    (file: File) => {
      setLocalError(null);
      const err = validate(file);
      if (err) {
        setLocalError(err);
        return;
      }
      // Generate preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onChange(file);
    },
    [onChange]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // Reset input so selecting the same file again still fires onChange
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setLocalError(null);
    onChange(null);
  };

  const displayError = error ?? localError;

  // ---- With preview --------------------------------------------------------
  if (value && previewUrl) {
    return (
      <div className="space-y-2">
        <div className="relative overflow-hidden rounded-lg border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt="Report photo preview"
            className="max-h-48 w-full object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon-sm"
            onClick={handleRemove}
            className="absolute right-2 top-2"
            aria-label="Remove photo"
          >
            <X className="size-3.5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {value.name} ({(value.size / 1024).toFixed(0)} KB)
        </p>
      </div>
    );
  }

  // ---- Drop zone -----------------------------------------------------------
  return (
    <div className="space-y-2">
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload photo"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          "flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-dashed p-6 transition-colors",
          dragOver
            ? "border-primary bg-primary/5"
            : displayError
            ? "border-destructive bg-destructive/5"
            : "border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/60"
        )}
      >
        <div className="flex size-10 items-center justify-center rounded-full bg-muted">
          {dragOver ? (
            <Upload className="size-5 text-primary" />
          ) : (
            <ImagePlus className="size-5 text-muted-foreground" />
          )}
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            {dragOver ? "Drop the image here" : "Add a photo (optional)"}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            JPEG, PNG, WebP or GIF · max 5 MB
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
        >
          Choose file
        </Button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        className="hidden"
        onChange={handleInputChange}
        aria-hidden="true"
      />

      {displayError && (
        <p className="text-xs text-destructive">{displayError}</p>
      )}
    </div>
  );
}
