import React, { useEffect, useState } from "react";
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";

type Props = {};

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactMe({}: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    if (!isMounted) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset(); // Clear the form
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex relative flex-col text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center pb-20">
      <h3 className="absolute top-12 md:top-16 uppercase tracking-[20px] text-gray-500 dark:text-gray-400 text-xl md:text-2xl z-10">
        Contact
      </h3>
      <div className="flex flex-col space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-6 2xl:space-y-10 mt-40 md:mt-48 mb-16">
        <h4 className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-semibold text-center ">
          I have got just what you need.{" "}
          Let&apos;s talk
        </h4>

        <div className="space-y-1 md:space-y-3 lg:space-y-3 xl:space-y-3 2xl:space-y-5">
          <div className="flex items-center space-x-5 justify-center">
            <PhoneIcon className="text-gray-600 dark:text-gray-400 h-7 w-7 animate-pulse" />
            <p className="text-lg md:text-2xl lg:text-2xl">+92 309 3243363</p>
          </div>
          <div className="flex items-center space-x-5 justify-center">
            <EnvelopeIcon className="text-gray-600 dark:text-gray-400 h-7 w-7 animate-pulse" />
            <p className="text-lg md:text-2xl lg:text-2xl">
              muhammadmustafakhakwani@gmail.com
            </p>
          </div>
          <div className="flex items-center space-x-5 justify-center">
            <MapPinIcon className="text-gray-600 dark:text-gray-400 h-7 w-7 animate-pulse" />
            <p className="text-lg md:text-2xl lg:text-2xl">
              Islamabad, Pakistan
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2 w-80 md:w-fit mx-auto"
        >
          <div className="md:flex md:space-x-2 space-y-2 md:space-y-0 ">
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="Name"
              className="contactInput w-80 md:w-auto"
              type="text"
            />
            <input
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email"
                }
              })}
              placeholder="Email"
              className="contactInput w-80 md:w-auto"
              type="email"
            />
          </div>
          <input
            {...register("subject")}
            placeholder="Subject"
            className="contactInput "
            type="text"
          />
          <textarea
            {...register("message", { required: "Message is required" })}
            placeholder="Message"
            className="contactInput"
            rows={5}
          />
          
          {/* Error messages */}
          {(errors.name || errors.email || errors.message) && (
            <div className="text-red-500 text-sm">
              {errors.name?.message && <p>{errors.name.message}</p>}
              {errors.email?.message && <p>{errors.email.message}</p>}
              {errors.message?.message && <p>{errors.message.message}</p>}
            </div>
          )}
          
          {/* Success/Error status */}
          {submitStatus === 'success' && (
            <div className="text-green-600 dark:text-green-400 text-sm font-medium">
              Message sent successfully! I&apos;ll get back to you soon.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="text-red-500 text-sm font-medium">
              Failed to send message. Please try again later.
            </div>
          )}
          
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`py-3 md:py-5 px-10 rounded-lg text-white font-bold text-lg transition-all ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600'
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
