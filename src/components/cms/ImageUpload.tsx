"use client";
import { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
interface ImageUploadProps {
  label: string;
  currentImage: string;
  imageName: string;
  onImageUpdate: (newPath: string) => void;
  helperText?: string;
}
export function ImageUpload({ 
  label, 
  currentImage, 
  imageName, 
  onImageUpdate,
  helperText 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a JPEG, PNG, or WebP image');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }
    setError(null);
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('imageName', imageName);
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload image');
      }
      onImageUpdate(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };
  const handleRemovePreview = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const currentImageToShow = preview || currentImage;
  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      {}
      {currentImageToShow && (
        <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-border bg-muted">
          <Image
            src={currentImageToShow}
            alt={label}
            fill
            className="object-cover"
            unoptimized={!!preview}
          />
          {preview && (
            <button
              onClick={handleRemovePreview}
              className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
      {}
      {!currentImageToShow && (
        <div className="w-full h-48 rounded-lg border-2 border-dashed border-border bg-muted flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No image uploaded</p>
          </div>
        </div>
      )}
      {}
      <div className="flex gap-2">
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
          id={`file-${imageName}`}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full"
        >
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? 'Uploading...' : preview ? 'Change Image' : 'Upload New Image'}
        </Button>
      </div>
      {}
      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
      {}
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
      {}
      <p className="text-xs text-muted-foreground">
        Current: <code className="bg-muted px-1 py-0.5 rounded">{currentImage || 'Not set'}</code>
      </p>
    </div>
  );
}
