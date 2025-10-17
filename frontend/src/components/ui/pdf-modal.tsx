import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { Button } from './button';
import { X } from 'lucide-react';

interface PDFModalProps {
  src: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export function PDFModal({ src, title, isOpen, onClose }: PDFModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-[90vw] !max-h-[90vh] h-[90vh] p-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="flex-1 h-full">
          <iframe
            src={`${src}#toolbar=0&navpanes=0&scrollbar=1&view=FitH&zoom=100`}
            className="w-full h-full border-0"
            title={`${title} - PDF Viewer`}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
