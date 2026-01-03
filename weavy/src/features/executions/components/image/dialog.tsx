"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useRef } from "react";
import { useReactFlow } from "@xyflow/react";
import { toast } from "sonner";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    nodeId: string;
    initialImageUrl?: string;
    initialImageName?: string;
}

export const ImageNodeDialog = ({ open, onOpenChange, nodeId, initialImageUrl = "", initialImageName = "" }: Props) => {
    const [imageUrl, setImageUrl] = useState(initialImageUrl);
    const [imageName, setImageName] = useState(initialImageName);
    const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl || null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { setNodes, getNodes } = useReactFlow();

    // Update local state when initial values change
    useEffect(() => {
        setImageUrl(initialImageUrl);
        setImageName(initialImageName);
        setPreviewUrl(initialImageUrl || null);
    }, [initialImageUrl, initialImageName, open]);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please select a valid image file');
            return;
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            toast.error('Image size must be less than 5MB');
            return;
        }

        setImageName(file.name);

        // Read file as base64 data URL
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;
            setImageUrl(result);
            setPreviewUrl(result);
        };
        reader.onerror = () => {
            toast.error('Error reading image file');
        };
        reader.readAsDataURL(file);
    };

    const handleRemove = () => {
        setImageUrl("");
        setImageName("");
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSave = () => {
        const nodes = getNodes();
        const updatedNodes = nodes.map((node) => {
            if (node.id === nodeId) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        imageUrl: imageUrl,
                        imageName: imageName,
                    },
                };
            }
            return node;
        });
        setNodes(updatedNodes);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Image Node</DialogTitle>
                    <DialogDescription>
                        Upload an image to use in this node
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="image-input">Image File</Label>
                        <div className="flex items-center gap-2">
                            <input
                                ref={fileInputRef}
                                id="image-input"
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {imageName ? "Change Image" : "Select Image"}
                            </Button>
                            {imageName && (
                                <span className="text-sm text-muted-foreground">
                                    {imageName}
                                </span>
                            )}
                            {previewUrl && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleRemove}
                                    className="ml-auto"
                                >
                                    Remove
                                </Button>
                            )}
                        </div>
                        {previewUrl && (
                            <div className="mt-4 border rounded-md overflow-hidden bg-muted/50">
                                <div className="relative w-full aspect-video flex items-center justify-center">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                            </div>
                        )}
                        {!previewUrl && (
                            <div className="mt-4 border-2 border-dashed rounded-md p-8 text-center">
                                <p className="text-sm text-muted-foreground">
                                    No image selected. Click "Select Image" to upload.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={!imageUrl}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

