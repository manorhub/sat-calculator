'use client';

import React, { useState } from 'react';
import { validateRucChecksum } from '@/calculators/conversiones/consulta-ruc-sunat';

export default function ConsultaRucClient() {
  const [rucInput, setRucInput] = useState<string>('20100047218');
  const result = validateRucChecksum(rucInput);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
      <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-4 flex items-center gap-2">
        🧮 Verificador de Estructura Matemática de RUC (Módulo 11)
      </h2>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
        Ingresa los 11 dígitos de un RUC peruano para validar su algoritmo de control según el estándar oficial de SUNAT.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-6 space-y-4">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
            Número de RUC (11 dígitos)
          </label>
          <input
            type="text"
            maxLength={11}
            value={rucInput}
            onChange={(e) => setRucInput(e.target.value.replace(/\D/g, ''))}
            placeholder="Ej: 20100047218"
            className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-lg font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="text-xs text-slate-500 space-y-1">
            <div>• <strong>10:</strong> Persona Natural con DNI / Negocio</div>
            <div>• <strong>15 / 17:</strong> Persona Natural con Carnet Extranjería</div>
            <div>• <strong>20:</strong> Persona Jurídica / Sociedad / Empresa</div>
          </div>
        </div>

        <div className="md:col-span-6">
          <div className={`p-6 rounded-2xl border transition-all ${
            result.isValid
              ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
              : 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{result.isValid ? '✅' : '❌'}</span>
              <h3 className="font-extrabold text-base">
                {result.isValid ? 'Estructura y Dígito de Control VÁLIDOS' : 'Estructura o Dígito de Control INVÁLIDOS'}
              </h3>
            </div>

            <p className="text-xs leading-relaxed font-medium mt-2">
              {result.message}
            </p>

            {result.type && (
              <div className="mt-4 pt-3 border-t border-emerald-200/60 dark:border-emerald-800/60 text-xs font-bold">
                Categoría: {result.type}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
