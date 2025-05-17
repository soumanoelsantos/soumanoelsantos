
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (whatsappNumber: string) => void;
}

const WhatsAppModal = ({ isOpen, onClose, onSubmit }: WhatsAppModalProps) => {
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!whatsappNumber || whatsappNumber.length < 10) {
      return;
    }

    setIsLoading(true);
    
    // Simulate sending results
    setTimeout(() => {
      setIsLoading(false);
      onSubmit(whatsappNumber);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#121212] text-white border-[#1d365c]">
        <DialogHeader>
          <DialogTitle className="text-white">Enviar resultados do diagnóstico</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="whatsapp" className="text-right text-white">
                WhatsApp
              </Label>
              <Input
                id="whatsapp"
                type="tel"
                placeholder="(99) 99999-9999"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="col-span-3 bg-[#1d1d1d] border-[#333] text-white"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="border-[#1d365c] text-white hover:bg-[#1d365c]/20"
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              className="bg-[#1d365c] hover:bg-[#1d365c]/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppModal;
