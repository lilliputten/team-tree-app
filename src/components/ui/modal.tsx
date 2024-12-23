'use client';

import { Dispatch, SetStateAction } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
// import { useRouter } from "next/router";
import { Drawer } from 'vaul';

import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ModalProps {
  children: React.ReactNode;
  className?: string;
  showModal?: boolean;
  setShowModal?: Dispatch<SetStateAction<boolean>>;
  onClose?: () => void;
  desktopOnly?: boolean;
  preventDefaultClose?: boolean;
}

export function Modal({
  children,
  className,
  showModal,
  setShowModal,
  onClose,
  desktopOnly,
  preventDefaultClose,
}: ModalProps) {
  // const router = useRouter();

  const closeModal = ({ dragged }: { dragged?: boolean } = {}) => {
    if (preventDefaultClose && !dragged) {
      return;
    }
    // fire onClose event if provided
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onClose && onClose();

    // if setShowModal is defined, use it to close modal
    if (setShowModal) {
      setShowModal(false);
    }
    // else, this is intercepting route @modal
    // else {
    // router.back();
    // }
  };
  const { isMobile } = useMediaQuery();

  if (isMobile && !desktopOnly) {
    return (
      <Drawer.Root
        open={setShowModal ? showModal : true}
        onOpenChange={(open) => {
          if (!open) {
            closeModal({ dragged: true });
          }
        }}
      >
        <Drawer.Overlay
          className={cn(
            // 'bg-background/80', // Original backdrop color
            'bg-black/30', // Dark background (should be synced in both dialog and modal)
            'fixed inset-0 z-40 backdrop-blur-sm',
          )}
        />
        <Drawer.Portal>
          <Drawer.Content
            className={cn(
              '__modal_Drawer_Content',
              'fixed',
              'inset-x-0',
              'inset-y-0',
              // 'bottom-0 top-0 mt-24',
              'z-50 overflow-hidden',
              // 'rounded-t-[10px]',
              'border bg-background',
              className,
            )}
          >
            {/* // XXX: ???
            <div className="sticky top-0 z-20 flex w-full items-center justify-center bg-inherit">
              <div className="bg-muted-foreground/20 my-3 h-1.5 w-16 rounded-full" />
            </div>
            */}
            {children}
            <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="size-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </Drawer.Content>
          <Drawer.Overlay />
        </Drawer.Portal>
      </Drawer.Root>
    );
  }
  return (
    <Dialog
      open={setShowModal ? showModal : true}
      onOpenChange={(open) => {
        if (!open) {
          closeModal();
        }
      }}
    >
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        className={cn(
          '__DialogContent overflow-hidden p-0 md:max-w-md md:rounded-2xl md:border',
          className,
        )}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
