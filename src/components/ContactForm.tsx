
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
    // Aqui você pode adicionar a lógica para enviar o formulário
    console.log({ name, email, phone, company });
  };

  return (
    <div className="py-20 bg-dark-background" id="contato">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto p-8 bg-dark-secondary shadow-modern border-none">
          <h2 className="text-3xl font-bold text-center mb-8 text-dark-primary">
            Agende sua Consultoria Gratuita
          </h2>
          <p className="text-center text-dark-text/70 mb-8">
            Análise gratuita do comercial, marketing e produto da sua empresa
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                placeholder="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-dark-accent text-dark-text border-none focus:ring-2 focus:ring-dark-primary"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-dark-accent text-dark-text border-none focus:ring-2 focus:ring-dark-primary"
              />
            </div>
            <div>
              <Input
                placeholder="Telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="bg-dark-accent text-dark-text border-none focus:ring-2 focus:ring-dark-primary"
              />
            </div>
            <div>
              <Input
                placeholder="Empresa"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                className="bg-dark-accent text-dark-text border-none focus:ring-2 focus:ring-dark-primary"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-dark-primary hover:bg-dark-primary/80 text-dark-background"
              size="lg"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Agendar Consultoria
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Pillars;
