import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const policies = [
  { 
    title: "Reservas y Confirmaciones", 
    description: "Los usuarios pueden reservar DJs a través de nuestra plataforma. Las reservas están sujetas a la disponibilidad del DJ en la fecha y hora seleccionadas. Una vez realizada la reserva, recibirás una confirmación por correo electrónico. Por favor, verifica todos los detalles de la reserva y comunícate con nosotros inmediatamente si hay algún error." 
  },
  { 
    title: "Cancelaciones y Reembolsos", 
    description: "Las cancelaciones deben realizarse al menos 48 horas antes del evento para ser elegibles para un reembolso completo. Las cancelaciones realizadas dentro de las 48 horas previas al evento no serán reembolsadas. En caso de que el DJ cancele, te ofreceremos un DJ alternativo o un reembolso completo." 
  },
  { 
    title: "Conducta del Usuario", 
    description: "Todos los usuarios deben comportarse de manera respetuosa y profesional al interactuar con los DJs y otros usuarios de la plataforma. Cualquier comportamiento abusivo, discriminatorio o inapropiado resultará en la cancelación de la cuenta del usuario y la pérdida de cualquier reserva futura sin derecho a reembolso." 
  },
  { 
    title: "Protección de Datos Personales", 
    description: "Nos comprometemos a proteger la privacidad de nuestros usuarios. Todos los datos personales proporcionados durante el proceso de registro y reserva serán utilizados exclusivamente para la prestación de nuestros servicios y no serán compartidos con terceros sin el consentimiento explícito del usuario." 
  },
];

const Policies = () => {
  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ textDecoration: 'underline' }}>
        Política de Uso del Producto
      </Typography>
      <Grid container spacing={4}>
        {policies.map((policy, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  textDecoration: 'underline', 
                  marginBottom: 1.5
                }}
              >
                {policy.title}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  lineHeight: 1.6
                }}
              >
                {policy.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Policies;
