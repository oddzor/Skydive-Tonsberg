import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
}

/**
 * Send contact form email using EmailJS
 * @param formData - The contact form data
 * @returns Promise that resolves when email is sent successfully
 */
export const sendContactEmail = async (formData: ContactFormData): Promise<void> => {
  // Validate environment variables
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    throw new Error('EmailJS configuration is missing. Please check your environment variables.');
  }

  try {
    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      inquiry_type: formData.type,
      message: formData.message,
      to_email: 'info@hoppfallskjerm.no', // Your receiving email
    };

    // Send email
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    if (response.status !== 200) {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('EmailJS Error:', error);
    throw new Error('Failed to send email. Please try again or contact us directly.');
  }
};

