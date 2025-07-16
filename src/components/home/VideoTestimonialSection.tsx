
import React from "react";
import { PlayCircle } from "lucide-react";
import LeadCaptureForm from "@/components/lead-form/LeadCaptureForm";

const VideoTestimonialSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#0d112b] to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Veja o resultado de quem já está <span className="text-dark-primary">mudando o jogo!</span>
            </h2>
            <p className="text-xl text-gray-300">
              Depoimento real de empresário que transformou seu negócio
            </p>
          </div>
          
          <div className="aspect-video w-full mb-8 rounded-lg overflow-hidden shadow-xl">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/D4NPk7ZgmGU?si=YWF7se3PVbrb-N6D" 
              title="Depoimento de cliente - Acelerador Empresarial" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="flex items-center justify-center mt-6 mb-8">
            <PlayCircle className="h-6 w-6 text-dark-primary mr-3" />
            <p className="text-lg text-gray-300">Assista o depoimento completo e veja os resultados reais</p>
          </div>
          
          <div className="flex justify-center">
            <LeadCaptureForm 
              source="video_testimonial_section"
              buttonClassName="bg-dark-primary hover:bg-dark-primary/90 text-dark-background text-lg py-4 px-8 rounded-full shadow-2xl group flex items-center justify-center gap-3 font-bold transform hover:scale-105 transition-all duration-300"
              buttonText="QUERO ACELERAR MEU NEGÓCIO"
            />
          </div>
          <div className="flex justify-center">
            <p className="mt-3 text-sm text-gray-400">
              Preencha o formulário e participe do programa exclusivo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonialSection;
