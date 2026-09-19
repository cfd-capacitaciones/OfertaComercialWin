export default {
  name: 'oferta',
  title: 'Oferta Comercial',
  type: 'document',
  fields: [
    {
      name: 'zona',
      title: 'Zona',
      type: 'string',
      options: {
        list: [
          { title: 'Lima', value: 'lima' },
          { title: 'Provincia', value: 'provincia' }
        ]
      }
    },
    {
      name: 'categoria',
      title: 'Categoría de Plan',
      type: 'string',
      options: {
        list: [
          { title: 'Mono Residencial', value: 'mono_residencial' },
          { title: 'XGSPON Gamer', value: 'xgspon_gamer' },
          { title: 'HB WTV', value: 'hb_wtv' },
          { title: 'HB DGO', value: 'hb_dgo' },
          { title: 'RUC 20', value: 'ruc20' }
        ]
      }
    },
    {
      name: 'tituloPlan',
      title: 'Nombre del Plan / Velocidad',
      type: 'string',
    },
    {
      name: 'precio',
      title: 'Precio (S/)',
      type: 'number',
    },
    {
      name: 'detalles',
      title: 'Detalles o Beneficios',
      type: 'text',
    }
  ],
}