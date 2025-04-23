
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, phone, company });
  };

  return (
    <div className="relative py-32 bg-dark-background" id="contato">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-dark-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-dark-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <Card className="max-w-2xl mx-auto p-12 bg-dark-secondary/80 backdrop-blur-sm shadow-2xl border border-dark-primary/20">
          <h2 className="text-4xl font-bold text-center mb-4 text-dark-primary">
            Agendar diagnóstico gratuito
          </h2>
          <p className="text-center text-dark-text/70 mb-12 text-lg">
            Análise gratuita do comercial, marketing e produto da sua empresa
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <Input
              placeholder="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-dark-accent/50 text-dark-text border-dark-primary/20 focus:ring-2 focus:ring-dark-primary h-12 text-lg"
            />
            <Input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-dark-accent/50 text-dark-text border-dark-primary/20 focus:ring-2 focus:ring-dark-primary h-12 text-lg"
            />
            <Input
              placeholder="Telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="bg-dark-accent/50 text-dark-text border-dark-primary/20 focus:ring-2 focus:ring-dark-primary h-12 text-lg"
            />
            <Input
              placeholder="Empresa"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="bg-dark-accent/50 text-dark-text border-dark-primary/20 focus:ring-2 focus:ring-dark-primary h-12 text-lg"
            />
            <Button 
              type="submit" 
              className="w-full bg-dark-primary hover:bg-dark-primary/80 text-dark-background text-lg py-6"
              size="lg"
            >
              <Calendar className="mr-2 h-6 w-6" />
              Agendar diagnóstico gratuito
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ContactForm;
