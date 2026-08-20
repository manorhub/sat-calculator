import { calculators } from '../src/calculators';

console.log('🧪 Iniciando Pruebas Unitarias de Fórmulas Fiscales...\n');

let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`✅ PASÓ: ${message}`);
    passedTests++;
  } else {
    console.error(`❌ FALLÓ: ${message}`);
    failedTests++;
  }
}

// 1. Test IVA Calculator
const ivaCalc = calculators.find(c => c.id === 'calculo-iva');
if (ivaCalc) {
  const res1 = ivaCalc.calculate({ monto: 1000, tipo_accion: 'agregar', tasa: 16 });
  const subtotal = res1.results.find(r => r.label === 'Subtotal Base')?.value;
  const iva = res1.results.find(r => r.label === 'IVA Calculado')?.value;
  const total = res1.results.find(r => r.label === 'Total Neto')?.value;

  assert(subtotal === 1000, 'IVA: Subtotal base correcto');
  assert(iva === 160, 'IVA: IVA 16% calculado correcto');
  assert(total === 1160, 'IVA: Total sumado correcto');
} else {
  console.error('No se encontró la calculadora de IVA.');
  failedTests++;
}

// 2. Test RESICO Calculator
const resicoCalc = calculators.find(c => c.id === 'calculo-resico-pf');
if (resicoCalc) {
  const res1 = resicoCalc.calculate({ ingresos: 20000, factura_persona_moral: false, ingresos_persona_moral: 0 });
  const rate = res1.results.find(r => r.label === 'Tasa Aplicada')?.value;
  const isrBruto = res1.results.find(r => r.label === 'ISR Bruto Determinado')?.value;

  assert(rate === 1, 'RESICO: Tasa para $20,000 es 1%');
  assert(isrBruto === 200, 'RESICO: ISR Bruto para $20,000 es $200');
} else {
  console.error('No se encontró la calculadora de RESICO.');
  failedTests++;
}

// 3. Test RESICO vs Actividad Comparador
const resicoVsActCalc = calculators.find(c => c.id === 'calculo-resico-vs-actividad');
if (resicoVsActCalc) {
  const res = resicoVsActCalc.calculate({ ingresos_mensuales: 35000, gastos_deducibles: 15000 });
  const isrResico = res.results.find(r => r.label === 'ISR a Pagar en RESICO')?.value;
  const recommend = res.results.find(r => r.label === 'Régimen Recomendado (Menos Impuesto)')?.value;

  assert(Math.round(isrResico || 0) === 385, 'Comparador: ISR RESICO correcto para $35k ($385)');
  assert(recommend === 1, 'Comparador: Recomienda RESICO correctamente para ingresos con gastos de 15k');
} else {
  console.error('No se encontró el comparador de RESICO.');
  failedTests++;
}

// 4. Test Aguinaldo Calculator
const aguinaldoCalc = calculators.find(c => c.id === 'calculo-aguinaldo');
if (aguinaldoCalc) {
  const res1 = aguinaldoCalc.calculate({ sueldo_mensual: 30000, dias_aguinaldo: 15, dias_trabajados: 365 });
  const bruto = res1.results.find(r => r.label === 'Aguinaldo Bruto Proporcional')?.value;
  assert(Math.round(bruto || 0) === 15000, 'Aguinaldo: Monto bruto completo correcto');
} else {
  console.error('No se encontró la calculadora de Aguinaldo.');
  failedTests++;
}

// 5. Test PTU Calculator
const ptuCalc = calculators.find(c => c.id === 'calculo-ptu');
if (ptuCalc) {
  const res = ptuCalc.calculate({
    monto_utilidad_total: 500000,
    total_dias_empresa: 3650,
    total_salarios_empresa: 1200000,
    dias_trabajados_usuario: 365,
    salario_anual_usuario: 180000,
    sueldo_mensual_usuario: 15000
  });
  const ptuNeta = res.results.find(r => r.label === 'PTU Neta Estimada a Pagar')?.value;
  assert(ptuNeta === 45000, 'PTU: Cálculo con tope de 3 meses de ley correcto ($45,000)');
} else {
  console.error('No se encontró la calculadora de PTU.');
  failedTests++;
}

// 6. Test 50/30/20 Budget Calculator
const budgetCalc = calculators.find(c => c.id === 'calculo-regla-50-30-20');
if (budgetCalc) {
  const res = budgetCalc.calculate({
    ingreso_neto_mensual: 20000,
    gastos_necesidades: 8000,
    gastos_deseos: 6000
  });
  const idealAhorro = res.results.find(r => r.label === 'Presupuesto Ahorro Ideal (20%)')?.value;
  const realAhorro = res.results.find(r => r.label === 'Tu Capacidad de Ahorro Real Restante')?.value;

  assert(idealAhorro === 4000, 'Presupuesto: Ahorro ideal del 20% correcto ($4,000)');
  assert(realAhorro === 6000, 'Presupuesto: Ahorro real obtenido correcto ($6,000)');
} else {
  console.error('No se encontró la calculadora de presupuesto 50/30/20.');
  failedTests++;
}

// 7. Test ISR Persona Moral
const isrPmCalc = calculators.find(c => c.id === 'calculo-isr-pm');
if (isrPmCalc) {
  const res = isrPmCalc.calculate({ ingresos_periodo: 200000, coeficiente: 0.15, pagos_previos: 5000, retenciones_banco: 0 });
  const isrNeto = res.results.find(r => r.label === 'ISR Neto Provisional a Pagar')?.value;
  assert(isrNeto === 4000, 'ISR PM: Pago neto mensual provisional correcto ($4,000)');
} else {
  console.error('No se encontró la calculadora de ISR Persona Moral.');
  failedTests++;
}

// 8. Test UMA Calculator
const umaCalc = calculators.find(c => c.id === 'calculo-uma');
if (umaCalc) {
  const res = umaCalc.calculate({ unidades_uma: 10, ano_uma: 2024, frecuencia_uma: 'diario' });
  const pesos = res.results.find(r => r.label === 'Pesos Mexicanos Equivalentes')?.value;
  assert(Math.round((pesos || 0) * 100) / 100 === 1085.70, 'UMA: Conversión de 10 UMAS diarias 2024 correcta ($1085.70)');
} else {
  console.error('No se encontró la calculadora de UMA.');
  failedTests++;
}

// 9. Test Punto de Equilibrio
const peCalc = calculators.find(c => c.id === 'calculo-punto-equilibrio');
if (peCalc) {
  const res = peCalc.calculate({ costos_fijos: 10000, precio_unidad: 100, costo_variable_unidad: 50 });
  const units = res.results.find(r => r.label === 'Unidades Físicas a Vender en el Mes')?.value;
  assert(units === 200, 'Punto de Equilibrio: 200 unidades calculadas correctas');
} else {
  console.error('No se encontró la calculadora de Punto de Equilibrio.');
  failedTests++;
}

// 10. Test Préstamo Personal
const prestamoCalc = calculators.find(c => c.id === 'calculo-prestamo-personal');
if (prestamoCalc) {
  const res = prestamoCalc.calculate({ monto_prestamo: 20000, tasa_anual: 28, plazo_meses: 12, frecuencia_pago: 'mensual' });
  const pago = res.results.find(r => r.label === 'Pago Periódico')?.value;
  const totalPagado = res.results.find(r => r.label === 'Total Pagado Final')?.value;
  assert(Math.round(pago || 0) === 1930, 'Préstamo: Pago mensual correcto (~$1930)');
  assert(Math.round(totalPagado || 0) === 23161, 'Préstamo: Total pagado correcto (~$23161)');
} else {
  console.error('No se encontró la calculadora de Préstamos Personales.');
  failedTests++;
}

// 11. Test Tipo de Cambio
const tipoCambioCalc = calculators.find(c => c.id === 'calculo-tipo-de-cambio');
if (tipoCambioCalc) {
  const res = tipoCambioCalc.calculate({ monto: 100, direccion: 'usd_to_mxn', tipo_cambio: 18.50 });
  const total = res.results.find(r => r.label === 'Resultado Neto en MXN')?.value;
  assert(total === 1850, 'Tipo de Cambio: 100 USD convertidos a MXN a 18.50 son $1850');
} else {
  console.error('No se encontró la calculadora de Tipo de Cambio.');
  failedTests++;
}

// 12. Test Depreciación Activos
const depreciacionCalc = calculators.find(c => c.id === 'calculo-depreciacion-activos');
if (depreciacionCalc) {
  const res = depreciacionCalc.calculate({ moi: 25000, tipo_activo: 'computadoras', meses_uso: 12 });
  const depAnual = res.results.find(r => r.label === 'Depreciación Anual Completa')?.value;
  const depProporcional = res.results.find(r => r.label === 'Depreciación Proporcional del Ejercicio')?.value;
  assert(depAnual === 7500, 'Depreciación: Anual del 30% para $25,000 es $7,500');
  assert(depProporcional === 7500, 'Depreciación: Proporcional por 12 meses es $7,500');
} else {
  console.error('No se encontró la calculadora de Depreciación de Activos.');
  failedTests++;
}

// 13. Test AFORE
const aforeCalc = calculators.find(c => c.id === 'calculo-afore');
if (aforeCalc) {
  const res = aforeCalc.calculate({ saldo_actual: 50000, edad_actual: 30, edad_retiro: 65, salario_mensual: 15000, aportacion_voluntaria: 500, rendimiento_anual: 5.5 });
  const saldo = res.results.find(r => r.label === 'Saldo Estimado en AFORE al Jubilarte')?.value;
  const pension = res.results.find(r => r.label === 'Pensión Mensual Estimada')?.value;
  assert(Math.round(saldo || 0) === 2215865, 'AFORE: Saldo al jubilarte correcto (~$2.21M)');
  assert(Math.round(pension || 0) === 9233, 'AFORE: Pensión mensual estimada correcta (~$9,233)');
} else {
  console.error('No se encontró la calculadora de AFORE.');
  failedTests++;
}

// 14. Test Horas Extra
const horasExtraCalc = calculators.find(c => c.id === 'calculo-horas-extra');
if (horasExtraCalc) {
  const res = horasExtraCalc.calculate({ sueldo_mensual: 15000, horas_extra: 10, domingos_trabajados: 1 });
  const total = res.results.find(r => r.label === 'Total Extra Bruto a Pagar')?.value;
  const dobles = res.results.find(r => r.label === 'Pago Horas Extras Dobles')?.value;
  const triples = res.results.find(r => r.label === 'Pago Horas Extras Triples')?.value;
  const prima = res.results.find(r => r.label === 'Pago Prima Dominical')?.value;
  assert(total === 1437.5, 'Horas Extra: Pago extra bruto correcto ($1,437.50)');
  assert(dobles === 1125, 'Horas Extra: Pago extras dobles correcto ($1,125)');
  assert(triples === 187.5, 'Horas Extra: Pago extras triples correcto ($187.50)');
  assert(prima === 125, 'Horas Extra: Pago prima dominical correcto ($125)');
} else {
  console.error('No se encontró la calculadora de Horas Extra.');
  failedTests++;
}

// 15. Test Conversión Impuestos (Gross-up)
const conversionImpCalc = calculators.find(c => c.id === 'calculo-conversion-impuestos');
if (conversionImpCalc) {
  const res = conversionImpCalc.calculate({ neto_deseado: 10000, tipo_actividad: 'honorarios', cliente_moral: true });
  const bruto = res.results.find(r => r.label === 'Subtotal Base (Bruto)')?.value;
  const neto = res.results.find(r => r.label === 'Total Neto Recibido')?.value;
  assert(Math.round(bruto || 0) === 10490, 'Gross-up: Subtotal bruto correcto (~$10,490)');
  assert(Math.round(neto || 0) === 10000, 'Gross-up: Neto recibido correcto ($10,000)');
} else {
  console.error('No se encontró la calculadora de Conversión de Impuestos.');
  failedTests++;
}

// 16. Test Recargos y Actualizaciones
const recargosCalc = calculators.find(c => c.id === 'calculo-recargos-sat');
if (recargosCalc) {
  const res = recargosCalc.calculate({ monto_impuesto: 5000, meses_retraso: 3, estimar_actualizacion: true });
  const total = res.results.find(r => r.label === 'Monto Total Extemporáneo a Pagar')?.value;
  const actualizacion = res.results.find(r => r.label === 'Importe de Actualización (Inflación)')?.value;
  const recargos = res.results.find(r => r.label === 'Recargos Moratorios del Período')?.value;
  assert(Math.round(total || 0) === 5275, 'Recargos: Monto total extemporáneo a pagar correcto (~$5,275)');
  assert(actualizacion === 52.5, 'Recargos: Actualización por inflación correcta ($52.50)');
  assert(Math.round(recargos || 0) === 223, 'Recargos: Recargos moratorios correctos (~$223)');
} else {
  console.error('No se encontró la calculadora de Recargos y Actualizaciones.');
  failedTests++;
}

// 17. Test Tipo de Cambio SUNAT
const sunatCalc = calculators.find(c => c.id === 'calculo-tipo-de-cambio-sunat');
if (sunatCalc) {
  const resUsd = sunatCalc.calculate({ monto: 100, direccion: 'usd_to_pen', operacion: 'venta', tipo_cambio: 3.75 });
  const penTotal = resUsd.results.find(r => r.isMain)?.value;
  assert(penTotal === 375, 'SUNAT: 100 USD convertidos a PEN con tasa 3.75 son 375 Soles');

  const resPen = sunatCalc.calculate({ monto: 375, direccion: 'pen_to_usd', operacion: 'compra', tipo_cambio: 3.75 });
  const usdTotal = resPen.results.find(r => r.isMain)?.value;
  assert(usdTotal === 100, 'SUNAT: 375 PEN convertidos a USD con tasa 3.75 son 100 Dólares');
} else {
  console.error('No se encontró la calculadora de Tipo de Cambio SUNAT.');
  failedTests++;
}

// 18. Test Solventar Obligaciones
const solventarCalc = calculators.find(c => c.id === 'calculo-tipo-cambio-solventar-obligaciones');
if (solventarCalc) {
  const res = solventarCalc.calculate({ monto: 1000, moneda_origen: 'USD', tipo_operacion: 'pago', tipo_cambio: 3.75 });
  const total = res.results.find(r => r.isMain)?.value;
  assert(total === 3750, 'Solventar Obligaciones: $1000 USD a 3.75 equivalen a S/ 3750 PEN');
} else {
  console.error('No se encontró la calculadora de Solventar Obligaciones.');
  failedTests++;
}

// 19. Test Dólares a Soles & Soles a Dólares
const dolaresSolesCalc = calculators.find(c => c.id === 'calculo-dolares-a-soles');
const solesDolaresCalc = calculators.find(c => c.id === 'calculo-soles-a-dolares');
if (dolaresSolesCalc && solesDolaresCalc) {
  const res1 = dolaresSolesCalc.calculate({ monto: 200, modo_tasa: 'personalizado', tasa_custom: 3.80 });
  const total1 = res1.results.find(r => r.isMain)?.value;
  assert(total1 === 760, 'Dólares a Soles: 200 USD a tasa 3.80 son S/ 760');

  const res2 = solesDolaresCalc.calculate({ monto: 760, modo_tasa: 'personalizado', tasa_custom: 3.80 });
  const total2 = res2.results.find(r => r.isMain)?.value;
  assert(total2 === 200, 'Soles a Dólares: S/ 760 a tasa 3.80 son $200 USD');
} else {
  console.error('No se encontraron las calculadoras de Dólares/Soles.');
  failedTests++;
}

// 20. Test Consulta RUC Checksum Validation
const rucCalc = calculators.find(c => c.id === 'consulta-ruc-sunat');
if (rucCalc) {
  const resValid = rucCalc.calculate({ ruc_input: '20100047218' });
  const isValid = resValid.results.find(r => r.label === 'Estructura RUC')?.value;
  assert(isValid === 1, 'Consulta RUC: Validó correctamente el checksum oficial de SUNAT para RUC 20100047218');
} else {
  console.error('No se encontró la calculadora de Consulta RUC.');
  failedTests++;
}

// 21. Test Tablas e Indicadores SUNAT (UIT)
const uitCalc = calculators.find(c => c.id === 'tablas-e-indicadores-sunat');
if (uitCalc) {
  const resUit = uitCalc.calculate({ cantidad_uit: 7, ano_uit: '2026' });
  const totalSoles = resUit.results.find(r => r.isMain)?.value;
  assert(totalSoles === 37450, 'Tablas e Indicadores: 7 UIT 2026 equivalen a S/ 37,450 (1 UIT = S/ 5,350)');
} else {
  console.error('No se encontró la calculadora de Tablas e Indicadores SUNAT.');
  failedTests++;
}

// 22. Test Dólar Hoy en Perú
const dolarHoyCalc = calculators.find(c => c.id === 'dolar-hoy-peru');
if (dolarHoyCalc) {
  const res = dolarHoyCalc.calculate({ monto_dolar: 500, tasa_mercado: 3.75 });
  const totalSoles = res.results.find(r => r.isMain)?.value;
  assert(totalSoles === 1875, 'Dólar Hoy: $500 USD a tasa 3.75 equivalen a S/ 1,875 PEN');
} else {
  console.error('No se encontró la calculadora de Dólar Hoy.');
  failedTests++;
}

// 23. Test Precio del Dólar en Perú
const precioDolarCalc = calculators.find(c => c.id === 'precio-del-dolar-en-peru');
if (precioDolarCalc) {
  const res = precioDolarCalc.calculate({ monto_precio: 100 });
  const total = res.results.find(r => r.isMain)?.value;
  assert(total === 375, 'Precio del Dólar: $100 USD a tasa 3.75 son S/ 375 PEN');
} else {
  console.error('No se encontró la calculadora de Precio del Dólar.');
  failedTests++;
}

// 24. Test Semanas Cotizadas IMSS
const semanasImssCalc = calculators.find(c => c.id === 'semanas-cotizadas-imss');
if (semanasImssCalc) {
  const res = semanasImssCalc.calculate({ anos_trabajados: 10, salario_diario: 500, edad_retiro: 65, ley_imss: 'ley73' });
  const semanas = res.results.find(r => r.label === 'Semanas Cotizadas Estimadas')?.value;
  assert(semanas === 520, 'Semanas Cotizadas IMSS: 10 años de trabajo equivalen a 520 semanas');
} else {
  console.error('No se encontró la calculadora de Semanas Cotizadas IMSS.');
  failedTests++;
}

// 25. Test Pago Tarjeta de Crédito
const tarjetaCalc = calculators.find(c => c.id === 'pago-tarjeta-credito');
if (tarjetaCalc) {
  const res = tarjetaCalc.calculate({ saldo_tarjeta: 10000, tasa_interes_anual: 36, modo_pago: 'pago_fijo', monto_pago_fijo: 1000 });
  const meses = res.results.find(r => r.label === 'Meses Requeridos para Liquidar')?.value;
  assert(typeof meses === 'number' && meses > 0, 'Pago Tarjeta de Crédito: Calculó exitosamente el periodo de liquidación');
} else {
  console.error('No se encontró la calculadora de Tarjeta de Crédito.');
  failedTests++;
}

// 26. Test IGV Perú
const igvPeruCalc = calculators.find(c => c.id === 'igv-peru');
if (igvPeruCalc) {
  const res = igvPeruCalc.calculate({ monto: 1000, modo: 'agregar' });
  const total = res.results.find(r => r.isMain)?.value;
  assert(total === 1180, 'IGV Perú: Base de S/ 1000 + 18% IGV equivale a S/ 1180');
} else {
  console.error('No se encontró la calculadora de IGV Perú.');
  failedTests++;
}

// 27. Test Renta 5ta Categoría Perú
const quintaCalc = calculators.find(c => c.id === 'quinta-categoria-peru');
if (quintaCalc) {
  const res = quintaCalc.calculate({ sueldo_mensual: 4500, meses_trabajados: 12, gratificaciones: 9000 });
  const retencion = res.results.find(r => r.isMain)?.value;
  assert(typeof retencion === 'number' && retencion > 0, 'Renta 5ta Categoría: Retención calculada correctamente con deducción 7 UIT');
} else {
  console.error('No se encontró la calculadora de Renta de 5ta Categoría.');
  failedTests++;
}

// 28. Test Gratificación Perú
const gratsCalc = calculators.find(c => c.id === 'gratificacion-peru');
if (gratsCalc) {
  const res = gratsCalc.calculate({ sueldo_bruto: 3000, meses_completo: 6, afiliacion_salud: 'essalud' });
  const total = res.results.find(r => r.isMain)?.value;
  assert(total === 3270, 'Gratificación Perú: S/ 3000 + 9% EsSalud (S/ 270) = S/ 3270 PEN');
} else {
  console.error('No se encontró la calculadora de Gratificación Perú.');
  failedTests++;
}

// 29. Test CTS Perú
const ctsCalc = calculators.find(c => c.id === 'cts-peru');
if (ctsCalc) {
  const res = ctsCalc.calculate({ sueldo_bruto: 3600, gratificacion_recibida: 3600, meses_semestre: 6 });
  const total = res.results.find(r => r.isMain)?.value;
  assert(total === 2100, 'CTS Perú: Sueldo S/ 3600 + 1/6 gratificación (S/ 600) por 6 meses = S/ 2100 PEN');
} else {
  console.error('No se encontró la calculadora de CTS Perú.');
  failedTests++;
}

// 30. Test Comisiones Tarjeta Dólares
const comisionesCalc = calculators.find(c => c.id === 'comisiones-tarjeta-dolares');
if (comisionesCalc) {
  const res = comisionesCalc.calculate({ monto_usd: 100, tasa_cambio_base: 3.75, comision_porcentaje: 3.5 });
  const total = res.results.find(r => r.isMain)?.value;
  assert(Math.round((total || 0) * 100) / 100 === 388.13, 'Comisiones Tarjeta: $100 USD a tasa 3.75 con 3.5% comisión = S/ 388.13 PEN');
} else {
  console.error('No se encontró la calculadora de Comisiones de Tarjeta Dólares.');
  failedTests++;
}

console.log(`\n========================================`);
console.log(`RESULTADOS DE LAS PRUEBAS UNITARIAS:`);
console.log(`PASARON: ${passedTests} de ${passedTests + failedTests}`);
if (failedTests > 0) {
  console.error(`💥 SE DETECTARON ${failedTests} ERRORES.`);
  process.exit(1);
} else {
  console.log(`🎉 ¡TODAS LAS PRUEBAS PASARON CORRECTAMENTE!`);
  process.exit(0);
}
