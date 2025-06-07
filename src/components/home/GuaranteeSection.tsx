
import React from "react";
import { Shield, CheckCircle, FileText } from "lucide-react";

const GuaranteeSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 p-12 rounded-3xl border border-green-500/30 backdrop-blur-sm">
            <div className="flex justify-center mb-8">
              <div className="bg-green-600 rounded-full p-6">
                <Shield className="h-12 w-12 text-white" />
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="text-green-400">GARANTIA</span> do seu dinheiro de volta
            </h2>

            <div className="space-y-6 text-lg text-gray-300 mb-8">
              <p>
                Se ao final do terceiro dia da imersão você não tiver levado muito mais do que esperava, procure nosso time.
              </p>
              <p>
                Além de devolvermos <strong className="text-white">cada centavo</strong> do seu investimento, ainda receberá <strong className="text-green-400">R$ 1.000,00</strong> pelo tempo dedicado.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <span className="text-white font-semibold">Garantia registrada em cartório</span>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-green-400" />
                <span className="text-white font-semibold">Mais de 15.000 empresas atendidas</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-green-400" />
                <span className="text-white font-semibold">Garantia nunca foi usada</span>
              </div>
            </div>

            <div className="bg-green-900/30 p-6 rounded-2xl border border-green-500/50">
              <h3 className="text-2xl font-bold text-green-400 mb-4">RECONHECIDO EM CARTÓRIO</h3>
              <p className="text-green-200">
                Sua segurança é nossa prioridade. Investimento 100% protegido por garantia cartorial.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
