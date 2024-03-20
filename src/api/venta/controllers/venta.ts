/**
 * venta controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::venta.venta', ({ strapi }) => ({
  async getTTotal(ctx) {
    console.log(ctx.request.body);
    try {
    let { date } = ctx.request.body;

    console.log(date);

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(date) || date === undefined || date === null) {
      // Si la fecha no está en el formato correcto, usar la fecha de hoy en ese formato
      const today = new Date();
      const year = today.getFullYear();
      let month: string | number = today.getMonth() + 1;
      month = month < 10 ? `0${month}` : month;
      let day: string | number = today.getDate();
      day = day < 10 ? `0${day}` : day;
      date = `${year}-${month}-${day}`;
    }

    console.log(date);


    const ventasDelDia = await strapi.db.query('api::venta.venta').findMany({
        where: {
          fecha: { $eqi: date}
        }
    });

    console.log(ventasDelDia);

    const total = ventasDelDia.reduce((acc, curr) => acc + curr.total, 0);

    console.log(total);

    ctx.response.status = 200;
    ctx.response.body = {
      total
    }
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = {
            error: error
        }
    }
    
  },
}));
