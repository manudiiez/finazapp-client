import { DateTime } from "luxon";

export function obtenerRangosFechas() {
    const hoy = new Date();
    const ayer = new Date(hoy);
    ayer.setDate(hoy.getDate() - 1);

    const inicioSemana = new Date(hoy);
    inicioSemana.setDate(hoy.getDate() - (hoy.getDay() + 6) % 7); // Retrocede al lunes de esta semana
    const finSemana = new Date(inicioSemana);
    finSemana.setDate(inicioSemana.getDate() + 6); // Avanza al domingo de esta semana

    const inicioUltimaSemana = new Date(inicioSemana);
    inicioUltimaSemana.setDate(inicioUltimaSemana.getDate() - 7); // Retrocede una semana
    const finUltimaSemana = new Date(finSemana);
    finUltimaSemana.setDate(finUltimaSemana.getDate() - 7); // Retrocede una semana

    const inicioMesActual = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const finMesActual = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);

    const inicioMesPasado = new Date(hoy.getFullYear(), hoy.getMonth() - 1, 1);
    const finMesPasado = new Date(hoy.getFullYear(), hoy.getMonth(), 0);

    const inicioDosMesesAtras = new Date(hoy.getFullYear(), hoy.getMonth() - 2, 1);
    const finDosMesesAtras = new Date(hoy.getFullYear(), hoy.getMonth() - 1, 0);

    const inicioTresMesesAtras = new Date(hoy.getFullYear(), hoy.getMonth() - 3, 1);
    const finTresMesesAtras = new Date(hoy.getFullYear(), hoy.getMonth() - 2, 0);

    const inicioAnoActual = new Date(hoy.getFullYear(), 0, 1);
    const finAnoActual = new Date(hoy.getFullYear(), 11, 31);

    const inicioAnoAnterior = new Date(hoy.getFullYear() - 1, 0, 1);
    const finAnoAnterior = new Date(hoy.getFullYear() - 1, 11, 31);

    const inicioTiempo = new Date(0);
    const finTiempo = hoy;

    const opciones = { month: 'long' };
    const nombreMesActual = new Intl.DateTimeFormat('es-ES', opciones).format(inicioMesActual);
    const nombreMesPasado = new Intl.DateTimeFormat('es-ES', opciones).format(inicioMesPasado);
    const nombreDosMesesAtras = new Intl.DateTimeFormat('es-ES', opciones).format(inicioDosMesesAtras);
    const nombreTresMesesAtras = new Intl.DateTimeFormat('es-ES', opciones).format(inicioTresMesesAtras);
    const nombreAnoActual = hoy.getFullYear().toString();
    const nombreAnoAnterior = (hoy.getFullYear() - 1).toString();
    const nombreTiempo = 'Todo el tiempo';

    const capitalizarPrimeraLetra = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const rangosFechas = [
        { name: 'Hoy', startDate: formatearFecha(hoy), endDate: formatearFecha(hoy) },
        { name: 'Ayer', startDate: formatearFecha(ayer), endDate: formatearFecha(ayer) },
        { name: 'Esta semana', startDate: formatearFecha(inicioSemana), endDate: formatearFecha(finSemana) },
        { name: 'Ultima semana', startDate: formatearFecha(inicioUltimaSemana), endDate: formatearFecha(finUltimaSemana) },
        { name: capitalizarPrimeraLetra(nombreMesActual), startDate: formatearFecha(inicioMesActual), endDate: formatearFecha(finMesActual) },
        { name: capitalizarPrimeraLetra(nombreMesPasado), startDate: formatearFecha(inicioMesPasado), endDate: formatearFecha(finMesPasado) },
        { name: capitalizarPrimeraLetra(nombreDosMesesAtras), startDate: formatearFecha(inicioDosMesesAtras), endDate: formatearFecha(finDosMesesAtras) },
        { name: capitalizarPrimeraLetra(nombreTresMesesAtras), startDate: formatearFecha(inicioTresMesesAtras), endDate: formatearFecha(finTresMesesAtras) },
        { name: nombreAnoActual, startDate: formatearFecha(inicioAnoActual), endDate: formatearFecha(finAnoActual) },
        { name: nombreAnoAnterior, startDate: formatearFecha(inicioAnoAnterior), endDate: formatearFecha(finAnoAnterior) },
        { name: nombreTiempo, startDate: formatearFecha(inicioTiempo), endDate: formatearFecha(finTiempo) },
    ];

    return rangosFechas;
}

export function formatearFecha(fecha) {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const year = fecha.getFullYear();
    return `${year}-${mes}-${dia}`;
}


export function convertirFormatoFecha(fechaString) {
    const fecha = DateTime.fromISO(fechaString, { locale: 'es' });
    const diaSemana = fecha.toFormat('EEEE'); // 'EEEE' devuelve el nombre completo del día de la semana
    const diaMes = fecha.day;
    const nombreMes = fecha.toLocaleString({ month: 'long' });
    const diaSemanaCapitalizado = diaSemana.replace(/^\w/, (c) => c.toUpperCase());
    const nombreMesCapitalizado = nombreMes.replace(/^\w/, (c) => c.toUpperCase());
    const fechaFormateada = `${diaSemanaCapitalizado}, ${diaMes} de ${nombreMesCapitalizado} ${fecha.year}`;

    return fechaFormateada;
}
