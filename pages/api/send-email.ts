import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const emailData = await resend.emails.send({
      from: 'onboarding@mustafa.software',
      to: 'muhammadmustafakhakwani@gmail.com',
      subject: subject || 'Contact from Portfolio Website',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #9ca3af; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #4b5563; margin-bottom: 5px;">From:</h3>
            <p style="margin: 0; padding: 10px; background-color: #f9fafb; border-left: 4px solid #9ca3af;">
              <strong>Name:</strong> ${name}<br>
              <strong>Email:</strong> ${email}
            </p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #4b5563; margin-bottom: 5px;">Subject:</h3>
            <p style="margin: 0; padding: 10px; background-color: #f9fafb; border-left: 4px solid #9ca3af;">
              ${subject || 'No subject provided'}
            </p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #4b5563; margin-bottom: 5px;">Message:</h3>
            <div style="margin: 0; padding: 15px; background-color: #f9fafb; border-left: 4px solid #9ca3af; white-space: pre-wrap;">
              ${message}
            </div>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p>This email was sent from your portfolio contact form.</p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ 
      message: 'Email sent successfully!', 
      id: emailData.data?.id 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      message: 'Failed to send email. Please try again later.' 
    });
  }
}
