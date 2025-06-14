"use client";

import Modal from "@/components/ui/modal";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import { usePreviewModal } from "@/hooks/use-preview-modal";

const PreviewModal = () => {
  const previewModal = usePreviewModal();
  const product = usePreviewModal((state) => state.data);

  if (!product) {
    return null;
  }

  return (
    <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
      <div className="grid items-start w-full grid-cols-1 md:grid-cols-2 lg:gap-x-8">
        <Gallery images={product.images} />
        <Info data={product} />
      </div>
    </Modal>
  );
};

export default PreviewModal;
