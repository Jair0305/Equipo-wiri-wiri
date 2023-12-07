import React from 'react'
import { Page, Text, Document, StyleSheet, Image, View, Font } from '@react-pdf/renderer'
import MunchEZLogo from '../assets/logos/MunchEZ-white-christmas.png'
import PoppinsFont from '../assets/fonts/Poppins-Regular.ttf'
import PoppinsFontBold from '../assets/fonts/Poppins-Bold.ttf'

// Registro de la fuente
Font.register({
  family: 'Poppins',
  fonts: [
    { src: PoppinsFont, fontWeight: 'regular' },
    { src: PoppinsFontBold, fontWeight: 'bold' },
  ],
  format: 'truetype',
})

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Poppins',
    padding: 30,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Poppins',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Poppins',
    marginBottom: 5,
    color: '#333', // Color gris oscuro
  },
  dashboard: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  metric: {
    width: '45%',
    marginBottom: 20,
    padding: 10,
    border: 1,
    borderRadius: 10, // Bordes más redondeados
    backgroundColor: '#f0f0f0', // Color de fondo gris claro
    boxShadow: '0px 0px 10px 0px #aaa', // Sombra ligera
  },
  title: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: 700,
    marginBottom: 5,
    color: '#333', // Color gris oscuro
  },
  text: {
    fontSize: 12,
    textAlign: 'justify',
    fontFamily: 'Poppins',
    color: '#555', // Color gris medio
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 15,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#555', // Color gris medio
  },
})

const PDF = ({ reportData }) => {
  const {
    todayOrders,
    totalSales,
    ordersCompleted,
    ordersCanceled,
    averageSalePerOrder,
    topThreeSellingProducts,
    peakHours,
    todayDateString,
  } = reportData

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>Fecha: {todayDateString}</Text>
          <Image style={styles.image} src={MunchEZLogo} />
          <Text style={styles.header}>Resumen de Ventas del Día</Text>
        </View>

        <View style={styles.dashboard}>
          <View style={styles.metric}>
            <Text style={styles.title}>Total de Ventas</Text>
            <Text style={styles.text}>{todayOrders.length}</Text>
          </View>

          <View style={styles.metric}>
            <Text style={styles.title}>Órdenes completadas</Text>
            <Text style={styles.text}>{ordersCompleted}</Text>
          </View>

          <View style={styles.metric}>
            <Text style={styles.title}>Órdenes canceladas</Text>
            <Text style={styles.text}>{ordersCanceled}</Text>
          </View>

          <View style={styles.metric}>
            <Text style={styles.title}>Promedio de venta por orden</Text>
            <Text style={styles.text}>${averageSalePerOrder}</Text>
          </View>

          <View style={styles.metric}>
            <Text style={styles.title}>Top 3 de productos más vendidos</Text>
            {topThreeSellingProducts.map(([productName, quantity], index) => (
              <Text key={index} style={styles.text}>
                {productName}: {quantity} unidades
              </Text>
            ))}
          </View>

          <View style={styles.metric}>
            <Text style={styles.title}>Horas pico</Text>
            {peakHours.map(([hour, count], index) => (
              <Text key={index} style={styles.text}>
                Hora: {hour}:00, Cantidad de órdenes: {count}
              </Text>
            ))}
          </View>

          <View style={styles.metric}>
            <Text style={styles.title}>Ganancias totales</Text>
            <Text style={styles.text}>${totalSales}</Text>
          </View>
        </View>

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>
    </Document>
  )
}

export default PDF
