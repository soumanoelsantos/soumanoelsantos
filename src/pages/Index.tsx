
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import QuemEManoel from "@/components/QuemEManoel";

const Index = () => {
  return (
    <div className="min-h-screen bg-dark-background">
      <div className="w-full py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-dark-text max-w-3xl mx-auto px-4">
          Em 30 minutos farei um <span className="text-dark-primary">PLANO DE AÇÃO GRATUITO</span> para sua empresa <span className="text-dark-primary">DOBRAR</span> o faturamento em 90 dias!
        </h2>
      </div>
      <Hero />
      <QuemEManoel />
      <ContactForm />
    </div>
  );
};

export default Index;
