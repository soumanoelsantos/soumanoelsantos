
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulando uma submissão
    setTimeout(() => {
      console.log({ name, email, phone, company });
      toast({
        title: "Solicitação enviada",
        description: "Em breve entraremos em contato com você.",
      });
      setIsSubmitting(false);
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
    }, 1000);
  };

  return (
    <div className="relative py-32 bg-gradient-to-b from-dark-background to-black" id="contato">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-dark-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-dark-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-dark-primary text-sm font-medium tracking-widest uppercase">Comece Agora</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 font-serif text-dark-text">
            Agende seu diagnóstico
          </h2>
          <div className="w-16 h-1 bg-dark-primary mx-auto"></div>
          <p className="text-dark-text/70 mt-6 text-lg">
            Análise gratuita do comercial, marketing e produto da sua empresa
          </p>
        </div>
        
        <div className="card-glow max-w-2xl mx-auto">
          <Card className="p-10 bg-transparent backdrop-blur-xl border border-dark-primary/20 relative z-10">            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-dark-text/80 text-sm">Nome completo</label>
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-dark-accent/20 text-dark-text border-dark-primary/20 focus:ring-2 focus:ring-dark-primary h-12 text-lg"
                />
              </div>
              
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-dark-text/80 text-sm">E-mail</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-dark-accent/20 text-dark-text border-dark-primary/20 focus:ring-2 focus:ring-dark-primary h-12 text-lg"
                />
              </div>
              
              <div className="space-y-1.5">
                <label htmlFor="phone" className="text-dark-text/80 text-sm">Telefone</label>
                <Input
                  id="phone"
                  placeholder="Seu telefone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="bg-dark-accent/20 text-dark-text border-dark-primary/20 focus:ring-2 focus:ring-dark-primary h-12 text-lg"
                />
              </div>
              
              <div className="space-y-1.5">
                <label htmlFor="company" className="text-dark-text/80 text-sm">Empresa</label>
                <Input
                  id="company"
                  placeholder="Nome da sua empresa"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  className="bg-dark-accent/20 text-dark-text border-dark-primary/20 focus:ring-2 focus:ring-dark-primary h-12 text-lg"
                />
              </div>
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-dark-primary hover:bg-dark-primary/80 text-dark-background text-lg py-7"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    <>
                      <Calendar className="mr-2 h-6 w-6" />
                      Agendar diagnóstico gratuito
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
        
        <div className="text-center mt-12 text-dark-text/60 text-sm">
          <p>Seu investimento: GRATUITO • Valor aproximado deste diagnóstico: R$ 2.500,00</p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
